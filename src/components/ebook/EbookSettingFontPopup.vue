<template>
<!--动画transition-->
<transition name="popup-slide-up">
  <div class="ebook-popup-list" v-show="fontFamilyVisible">
    <div class="ebook-popup-title">
      <div class="ebook-popup-title-icon" @click="hide">
        <span class="icon-down2"></span>
      </div>
      <span class="ebook-popup-title-text">选择字体</span>
    </div>
    <div class="ebook-popup-list-wrapper">
      <div class="ebook-popup-item"
           v-for="(item,index) in fontFamilyList"
           :key="index"
           @click="setFontFamily(item.font)">

        <div class="ebook-popup-item-text" :class="{'selected':isSelected(item)}">
          {{item.font}}</div>

        <div class="ebook-popup-item-check" v-if="isSelected(item)">
          <span class="icon-check" ></span></div>

      </div>
    </div>
  </div>
</transition>
</template>

<script>
import {ebookMixin} from "../../utils/mixin";
import {FONT_FAMILY} from "../../utils/book";
import {saveFontFamily} from "../../utils/localStorage";

export default {
  name: "EbookSettingFontPopup",
  mixins: [ebookMixin],
  data(){
    return {
      //自定义字体的列表在utils/book.js
      fontFamilyList: FONT_FAMILY,
    }
  },
  methods: {
    hide() {
      this.setFontFamilyVisible(false)
    },
    setFontFamily(font) {
      this.setDefaultFontFamily(font)
      saveFontFamily(this.fileName,font)
      //切换字体，没有效果
      if (font ==='Default')
        this.currentBook.redition.themes.font('Times New Roman')
      else
        this.currentBook.redition.themes.font(font)
    },
    isSelected(item) {
      return this.defaultFontFamily === item.font
    }
  },


}
</script>

<style  lang="scss" scoped>
@import "src/assets/styles/global";
.ebook-popup-list {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 300;
  width: 100%;
  background-color: white;
  box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, .1);

  .ebook-popup-title {
    position: relative;
    padding: px2rem(15);
    box-sizing: border-box;
    border-bottom: px2rem(1) solid #b8b9bb;
    text-align: center;
    @include center;

    .ebook-popup-title-icon {
      position: absolute;
      left: px2rem(15);
      top: 0;
      height: 100%;
      font-size: px2rem(16);
      font-weight: 700;
      @include center;
    }

    .ebook-popup-title-text {
      font-size: px2rem(14);
      font-weight: 700;
    }
  }

  .ebook-popup-list-wrapper {
    .ebook-popup-item {
      display: flex;

      .ebook-popup-item-text {
        flex: 1;
        padding: px2rem(15);
        font-size: px2rem(14);
        text-align: left;
        //&表示同级
        &.selected {
          color: #346cb9;
          font-weight: 700;
        }
      }

      .ebook-popup-item-check {
        flex: 1;
        padding: px2rem(15);
        font-size: px2rem(14);
        text-align: right;
        font-weight: 700;
        color: #346cb9;

      }
    }
  }
}

</style>