<template>
<div class="ebook-reader">
  <div id="read"><!--展示电子书 -->
<!--  <div class="ebook-reader-mask"-->
<!--       @click="onMaskClick"-->
<!--       @touchmove="move"-->
<!--       @touchend="moveEnd">-->
<!--  </div>&lt;!&ndash;书签蒙版 &ndash;&gt;-->
  </div>
</div>
</template>

<script>
import {ebookMixin} from "../../utils/mixin";
import {
  saveFontFamily,
  getFontFamily,
  getFontSize,
  saveFontSize, getTheme, saveTheme, getLocation
} from "../../utils/localStorage";
import Epub from "epubjs";
import {flatten} from "../../utils/book";

global.ePub = Epub
export default {
  name: "EbookReader",
  mixins: [ebookMixin],
  methods: {
    //显示导航栏
    toggleTitleAndMenu() {
      // this.$store.dispatch('setmenuVisible',!this.menuVisible)
      //映射过后即可用下面
      this.setmenuVisible(!this.menuVisible)
      //再点击屏幕后隐藏导航的字号设置
      if (this.menuVisible)  {
        this.setSetingVisible(-1)
      }
      //点击屏幕后使自定义字体设置的隐藏
      this.setFontFamilyVisible(false)
    },
    //字体缓存
    initFontFamily() {
      let font = getFontFamily(this.fileName)
        if (!font)
          saveFontFamily(this.fileName,this.defaultFontFamily)
        else {
          this.rendition.themes.font(font)
          this.setDefaultFontFamily(font)
        }
    },
    //字号缓存
    initFontSize() {
      let fontSize = getFontSize(this.fileName)
        if (!fontSize)
          saveFontSize(this.fileName,this.defaultFontSize)
        else {
          this.rendition.themes.fontSize(fontSize)
          this.setDefaultFontSize(fontSize)
        }
    },
    initTheme() {
      let defaultTheme =getTheme(this.fileName)
      if (!defaultTheme){
        defaultTheme = this.themeList[0].name
        saveTheme(this.fileName,defaultTheme)
      }
      //注册所有主题
      this.setDefaultTheme(defaultTheme)//设置到vuex中
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name,theme.style)
      })
      //应用默认样式
      this.rendition.themes.select(this.defaultTheme)
    },
    //解析电子书
    parseBook() {
      //封面
      this.book.loaded.cover.then(cover => {
        this.book.archive.createUrl(cover).then(url => {
          this.setCover(url)
          // console.log(url);
        })
      })
      //书籍信息
      this.book.loaded.metadata.then(metadata => {
        this.setMetadata(metadata)
      })
      //目录章节
      this.book.loaded.navigation.then(nav => {
        //扁平化并寻找上一级目录
        const navItem=flatten(nav.toc)
        function find(item, level = 0) {
          return !item.parent ? level : find(navItem.filter(parentItem => parentItem.id === item.parent)[0],++level)
        }
        navItem.forEach(item => {
          item.level = find(item)
        })
        //存入vuex
        this.setNavigation(navItem)
      })
    },
    // //隐藏导航栏
    hideTitleAndMenu() {
      this.$store.dispatch('setmenuVisible',false)
      this.setSetingVisible(-1)
      //点击屏幕后使自定义字体设置的隐藏
      this.setFontFamilyVisible(false)
    },

    initEpub() {
       //nginx的url+fileName.epub
      const url = 'http://localhost:81/epub/' + this.fileName + '.epub'
      this.book = new Epub(url)
      //book写入vuex中
      this.setCurrentBook(this.book)
      // console.log(url);
      // console.log(this.book);
    //渲染book
      this.rendition = this.book.renderTo('read',{
        width:window.innerWidth,
        height: window.innerHeight,
        method: 'deafult',
       //滑动翻页和翻页动画 这里的关键在于 flow: "paginated" 、
        // manager: "continuous" 和 snap: true。
        snap: true,
        flow: "paginated",
       //不加这个事件触发不了
        manager: "continuous",
      })
      // this.rendition.display().then(() => {
      //   //字号缓存初始
      //   this.initFontSize()
      //   //字体缓存初始
      //   this.initFontFamily()
      //   //注册主题缓存初始
      //   this.initTheme()
      //   //动态添加css
      //   this.initGlobalStyle()
      //   //缓存阅读进度
      //   this.refreshLocation()
      // })
      const location = getLocation(this.fileName)
      this.display(location,() => {
          //字号缓存初始
        this.initFontSize()
        //字体缓存初始
        this.initFontFamily()
        //注册主题缓存初始
        this.initTheme()
        //动态添加css
        this.initGlobalStyle()
      })
      //监听滑动翻页事件
      this.rendition.on("touchstart",event=>{
          this.touchStartX = event.changedTouches[0].clientX;
          this.touchStartTime = event.timeStamp;
      });
      this.rendition.on("touchend",event=>{
          const offsetX = event.changedTouches[0].clientX-this.touchStartX;
          const time = event.timeStamp - this.touchStartTime;
          if(time<500 && offsetX>40){
              this.prevPage();
          }else if (time<500 && offsetX<-40) {
              this.nextPage();
          }else{
              this.toggleTitleAndMenu()
          }
      })
      //字体效果，没有效果，但代码没错,配置了环境变量.env.develpoment
      this.rendition.hooks.content.register(content => {
        content.addStylesheet('${process.env.VUE_APP_RES_URL}/fonts/daysOne.css')
        content.addStylesheet('${process.env.VUE_APP_RES_URL}/fonts/cabin.css')
        content.addStylesheet('${process.env.VUE_APP_RES_URL}/fonts/montserrat.css')
        content.addStylesheet('${process.env.VUE_APP_RES_URL}/fonts/tangerine.css')
      })
      //分页
      this.book.ready.then(() => {
        return this.book.locations.generate(750 * (window.innerWidth / 375)
        * (getFontSize(this.fileName) / 16))
      }).then(() => {
        this.setBookAvailable(true)//进度条就可以接收到，可以实现进度条
        this.refreshLocation()
      })
      //解析电子书
      this.parseBook()
    },
    prevPage() {
        if (this.rendition){
           this.rendition.prev().then(() => {
             this.refreshLocation()
           });
           // this.$store.dispatch("setMenuVisible",false)
            this.setmenuVisible(false);
       }
    },
    nextPage(){
      if (this.rendition){
          this.rendition.next().then(() => {
             this.refreshLocation()
           });
          // this.$store.dispatch("setMenuVisible",false)
          this.setmenuVisible(false);
      }
    },
    //书签点击
    onMaskClick(e) {
      const offsetX = e.offsetX
      const width = window.innerWidth
      if (offsetX > 0 && offsetX < width * 0.3) {
        this.prevPage()//前翻页
      }else if (offsetX > 0 && offsetX > width * 0.7) {
        this.nextPage()//后翻页
      }else {
        this.toggleTitleAndMenu()
      }
    },
    move(e) {
       let  offsetY = 0
      if (this.firstOffsetY) {
       offsetY =e.changedTouches[0].clientY - this.firstOffsetY
        this.setOffsetY(offsetY)//vuex
      } else {
        this.firstOffsetY = e.changedTouches[0].clientY
      }
      e.preventDefault()
      e.stopPropagation()
    },
    moveEnd() {
      this.setOffsetY(0)
      this.firstOffsetY = null
    },
  },
  mounted() {
   //接收动态路由
   //  const fileName = this.$route.params.fileName.split('|').join('/')
    const fileName = 'LifeSciences|2016_Book_TechnologicalAndInstitutionalI'.split('|').join('/')
    // this.$store.dispatch('setfileName',fileName).then(() => {
    //   this.initEpub()
    // })用了mapactions后，如下
    this.setfileName(fileName).then(() => {
      this.initEpub()
    })
  }

}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.ebook-reader {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .ebook-reader-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 150;
    //background: transparent;
    width: 100%;
    height: 100%;
    //background-color: pink;
  }
}
</style>