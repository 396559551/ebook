<template>
<div class="ebook" ref="ebook">
  <ebook-title></ebook-title>
<!--接收动态路由-->
  <ebook-reader></ebook-reader>
  <ebook-menu></ebook-menu>
<!--  <ebook-book-mark></ebook-book-mark>-->
</div>
</template>

<script>
import EbookReader from "../../components/ebook/EbookReader";
import EbookTitle from "../../components/ebook/EbookTitle";
import EbookMenu from "../../components/ebook/EbookMenu";
// import EbookBookMark from "../../components/ebook/EbookBookMark";
import {ebookMixin} from "../../utils/mixin";

export default {
  name: "index",
  mixins:[ebookMixin],
  components : {
    EbookReader,
    EbookTitle,
    EbookMenu,
    // EbookBookMark,
  },
  watch: {
    offsetY(v) {
      if (!this.menuVisible && this.bookAvailable) {
          if (v === 0) {
            this.restore()
          } else if (v > 0) {
            this.move(v)
          }
      }
    }

  },
  methods: {
    move(offsetY) {
      this.$refs.ebook.style.top = offsetY +'px'

    },
    restore() {
    console.log('重置为0了');
    this.$refs.ebook.style.top = 0
    this.$refs.ebook.style.transition = 'all .2s linear'
    setTimeout(() => {
      this.$refs.ebook.style.transition = ''
    },200)
  }
  },

}
</script>

<style scoped>
.ebook {
  position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;

}
</style>