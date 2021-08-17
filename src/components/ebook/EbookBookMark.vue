<template>
<div class="ebook-book-mark" ref="bookmark">
<div class="ebook-book-mark-text-wrapper">
  <div class="ebook-book-mark-down-wrapper" ref="iconDown">
    <span class="icon-down" ></span>
  </div>
  <div class="ebook-book-mark-text">{{text}}</div>
</div>
<div class="ebook-book-mark-icon-wrapper">
<Bookmark :color="color" :width="15" :height="35"></Bookmark>
</div><!--书签图标-->
</div>
</template>

<script>
import Bookmark from "../common/Bookmark";
import {realPx} from "../../utils/utils";
import {ebookMixin} from "../../utils/mixin";
export default {
  name: "EbookBookMark",
  mixins:[ebookMixin],
  components:{
    Bookmark
  },
  watch: {
    offsetY(v) {
      if (v >= this.height && v < this.threshold) {
        //状态2.未达到零界状态
        this.beforeThreshold(v)
      } else if (v >= this.threshold) {
        //状态3，超过临界值
        this.afterThreshold(v)
      } else if (v > 0 && v < this.height) {
        //状态1
        this.beforeHeight()
    }
      else if (v === 0) {
        this.restore()//归位
      }

    }
  },
  data() {
    return {
      text: '下拉添加书签',
      color: '#fff'
    }
  },
  computed: {
    height() {
      return realPx(35)
    },
    //临界点
    threshold() {
      return realPx(55)
    }
  },
  methods: {
    beforeThreshold(v) {
      //状态2.未达到零界状态
        this.$refs.bookmark.style.top = `${-v}px`
        this.beforeHeight()
        const iconDown =this.$refs.iconDown
        if (iconDown.style.transform === 'rotate(180deg)') {
          iconDown.style.transform = 'rotate(0deg)'
        }
    },
    afterThreshold(v) {
       this.$refs.bookmark.style.top = `${-v}px`
        if (this.isBookmark) {
          this.text = '松手删除书签'
          this.color = '#fff'
        }else {
          this.text = '松手添加书签'
          this.color = '#3467b9'
          console.log('afterThreshold');
        }

        const iconDown =this.$refs.iconDown
        if (iconDown.style.transform === '' || iconDown.style.transform === 'rotate(0deg)') {
          iconDown.style.transform = 'rotate(180deg)'
        }
    },
    beforeHeight() {
    if (this.isBookmark) {
          this.text = '下拉删除书签'
          this.color = '#3467b9'
        }else {
          this.text = '下拉添加书签'
          this.color = '#fff'
      console.log('beforeHeight');
    }
      },
    restore() {
      //状态4 归位
      setTimeout(() => {
        this.$refs.bookmark.style.top = `${-this.height}px`
        this.$refs.iconDown.style.transform = 'rotate(0deg)'
      },200)
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.ebook-book-mark {
  background-color: pink;
  position: absolute;
  top: px2rem(-35);
  left: 0;
  z-index: 200;
  width: 100%;
  height: px2rem(35);
  .ebook-book-mark-text-wrapper {
    position: absolute;
    right: px2rem(45);
    bottom: 0;
    display: flex;
    .ebook-book-mark-down-wrapper {
      font-size: px2rem(14);
      color: white;
      transition: all .2s linear;
      @include center
    }
    .ebook-book-mark-text {
      font-size: px2rem(14);
      color: white;
    }
  }
  .ebook-book-mark-icon-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: px2rem(15);
  }
}

</style>