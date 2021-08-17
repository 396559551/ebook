<template>
  <transition name="fade-slide-right">
    <div class="slide-content-wrapper" v-show="menuVisible && settingVisible === 3">
      <div class="content">
        <div class="content-page-wrapper">
          <div class="content-page">
            <component :is="currentTab ===1 ? content: bookmark"></component>
          </div>
          <div class="content-page-tab">
            <div class="content-page-tab-item"
                 :class="{'selected': currentTab ===1}"
                 @click="selectTab(1)">目录</div>
            <div class="content-page-tab-item"
                 :class="{'selected': currentTab ===2}"
                  @click="selectTab(2)">书签</div>
          </div>
        </div>
      </div>
      <div class="content-bg" @click="hide()"></div>
    </div>
  </transition>
</template>

<script>
import {ebookMixin} from "../../utils/mixin";
import EbookSlideContents from "./EbookSlideContents";
export default {
  name: "EbookSlide",
  mixins:[ebookMixin],
  data() {
    return {
      currentTab :1,
      content: EbookSlideContents,
      bookmark: null,
    }
  },
  methods: {
    //隐藏整个目录界面
    hide() {
      // this.$store.dispatch('setmenuVisible',false)
      this.setmenuVisible(false)
      this.setSetingVisible(-1)
      //点击屏幕后使自定义字体设置的隐藏
      this.setFontFamilyVisible(false)
    },
    selectTab(tab) {
      this.currentTab = tab
    }
  }

}
</script>

<style  lang="scss" scoped>
@import "src/assets/styles/global";

.slide-content-wrapper {

  position: absolute;
  top: 0;
  left: 0;
  z-index: 300;
  display: flex;
  width: 100%;
  height: 100%;
  .content {
    background-color: pink;
    flex: 0 0 85%;
    width: 85%;
    height: 100%;
    .content-page-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      .content-page {
        flex: 1;
        width: 100%;
        overflow: hidden;
      }
      .content-page-tab {
        display: flex;
        flex: 0 0 px2rem(48);
        border-top: 1px solid rgba(0,0,0,.1);
        width: 100%;
        height: 100%;
        .content-page-tab-item {
          flex: 1;
          font-size: px2rem(12);
          @include center;

        }
      }
    }
  }
  .content-bg {
    background-color: yellow;
    flex: 0 0 15%;
    width: 15%;
    height: 100%;
  }
}

</style>