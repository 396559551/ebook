<template>
<div class="ebook-slide-contents">
  <div class="slide-contents-search-wrapper">
    <div class="slide-contents-search-input-wrapper">
      <div class="slide-contents-search-icon">
        <span class="icon-search"></span>
      </div>
      <input class="slide-contents-search-input"
             type="text"
             @click="showSearchPage"
             @keyup.enter.exact="search()"
             v-model="searchText"
              ><!--搜索输入框-->
    </div>
   <div class="slide-contents-search-cancle" v-if="searchVisible" @click="hideSearchPage()">取消</div>
  </div><!--搜索栏-->

  <div class="slide-contents-book-wrapper" v-show="!searchVisible">
    <div class="slide-contents-book-img-wrapper">
      <img :src="cover" alt="" class="slide-contents-book-img">
    </div>
    <div class="slide-contents-book-info-wrapper">
      <div class="slide-contents-book-title">
        <span class="slide-contents-book-title-text">{{metadata.title}}</span>
      </div>
      <div class="slide-contents-book-author">
        <span class="slide-contents-book-author-text">{{metadata.creator}}</span>
      </div>
    </div>

    <div class="slide-contents-book-progress-wrapper">
      <div class="slide-contents-book-progress">
        <span class="progress">{{ progress+'%' }}</span>
        <div class="progress-text">已读</div>
      </div>
    </div>
  </div><!--封面进度栏-->

  <scroll class="slide-contents-list"
          :top="156" :bottom="48" v-show="!searchVisible" ref="scroll">
    <div class="slide-contents-item" v-for="(item,index) in navigation" :key="index">
<!--      <span class="slide-contents-item-label" :style="contentItemStyle(item)">{{item.label}}</span>-->
      <span class="slide-contents-item-label" :class="{'selected':section === index}"
      @click="displayNavigation(item.href)">{{item.label}}</span>
      <span class="slide-contents-item-page"></span>
    </div>
  </scroll><!--目录列表-->

  <scroll class="slide-search-list" :top="66"
          :bottom="48" v-show="searchVisible">
    <div class="slide-search-item" v-for="(item,index) in searchList"
         :key="index" v-html="item.excerpt"
         @click="displaySearch(item.cfi)"
    ></div>
  </scroll><!--搜索结果列表-->
</div>
</template>

<script>
import {ebookMixin} from "../../utils/mixin";
import Scroll from "../common/Scroll";
// import {px2rem} from "../../utils/utils";

export default {
  name: "EbookSlideContents",
  components:{
    Scroll,
  },
  mixins:[ebookMixin],
  data() {
    return {
      searchVisible: false,
      searchList: null,
      searchText: ''
    }
  },
  methods: {
    //搜索功能，官网自带
    doSearch(q) {
      return Promise.all(this.currentBook.spine.spineItems.map(
          section => section.load(this.currentBook.load.bind(this.currentBook))
          .then(section.find.bind(section,q))
          .finally(section.unload.bind(section)))//释放
      ).then(result => Promise.resolve([].concat.apply([],result)))
    },
    //搜索
    search() {
      if (this.searchText && this.searchText.length > 0) {
        this.doSearch(this.searchText).then(list => {
          this.searchList = list
          this.searchList.map(item => {
            item.excerpt = item.excerpt.replace(
                this.searchText,`<span  style="color: #346cb9">${this.searchText}</span>`)
                return item
          })

        })
      }
    },
    displaySearch(target) {
      this.display(target)

    },
    displayNavigation(target) {
      this.display(target)
    },
    // contentItemStyle(item) {
    //   return
    //     marginLeft: '${px2rem(item.level * 15)}rem'
    //
    // },
    showSearchPage() {
      this.searchVisible = true
    },
    hideSearchPage() {
      this.searchVisible = false
      this.searchText = ''
      this.searchList = null
    }
  }
}


</script>

<style lang="scss" scoped>
@import "src/assets/styles/global";

.ebook-slide-contents {
  width: 100%;
  font-size: 0;
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(36);
    margin: px2rem(20) 0 px2rem(10) 0 ;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-search-input-wrapper {
      flex: 1;
      @include center;
      .slide-contents-search-icon {
        flex: 0 0 px2rem(28);
        font-size: px2rem(12);
        @include center
      }
      .slide-contents-search-input {
        flex: 1;
        width: 100%;
        height: px2rem(32);
        font-size: px2rem(14);
        //background-color: transparent;
        //border: none;
        //&:focus {
        //  outline: none;
        //};
      }
    }
    .slide-contents-search-cancle {
      flex: 0 0 px2rem(50);
      font-size: px2rem(14);
      @include right
    }
  }

  .slide-contents-book-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(90);
    padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
    box-sizing: border-box;
    .slide-contents-book-img-wrapper {
      flex: 0 0 px2rem(45);

      .slide-contents-book-img {
        width: px2rem(45);
        height: px2rem(60);
      }
    }

    .slide-contents-book-info-wrapper {
      flex: 1;
      padding: 0 px2rem(10);
      box-sizing: border-box;
      .slide-contents-book-title {
        //375*0.85-30-20-45-70=153.75
        //要精确计算宽度，指定宽度方便缩略显示
        width: px2rem(153.75);
        font-size: px2rem(14);
        line-height: px2rem(16);
        @include ellipsis2(3)
      }
      .slide-contents-book-author {
        width: px2rem(153.75);
        font-size: px2rem(12);
        margin-top: px2rem(5);
        @include ellipsis
      }
    }

    .slide-contents-book-progress-wrapper {
      flex: 0 0 px2rem(70);
      .slide-contents-book-progress {
        .progress{
          font-size: px2rem(14);
        }
        .progress-text{
          font-size: px2rem(12);
        }
      }
    }
  }

  .slide-contents-list {
    padding: 0 px2rem(15);
    box-sizing: border-box;

    .slide-contents-item {
      display: flex;
      padding:px2rem(20) 0 ;
      box-sizing: border-box;

      .slide-contents-item-label {
        flex: 1;
        font-size: px2rem(14);
        line-height: px2rem(18);
        @include ellipsis
      }
      .slide-contents-item-page {}
    }
  }
  .slide-search-list {
    width: 100%;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-search-item {
      font-size: px2rem(14);
      line-height: px2rem(16);
      padding: px2rem(20) 0;
      box-sizing: border-box;
    }
  }
}
</style>