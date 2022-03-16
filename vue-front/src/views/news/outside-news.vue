<template>
  <div class="outsideNews">
    <van-sticky :offset-top="0">
      <van-nav-bar title="新闻" left-arrow @click-left="onClickLeft">
      </van-nav-bar>
    </van-sticky>

    <div class="newsBlock" v-loading="loading">
        <!-- 因浏览器同源策略问题，iframe引入的外部网站域名与本地不一致，产生跨域，无法通过js交互更改样式 -->
      <iframe
        :src="url"
        id="mobsf"
        frameborder="0"
        width="100%"
        height="100%"
        scrolling="auto"
      ></iframe>
    </div>
    <!-- <div class="div-block">111</div> -->
  </div>
</template>

<script>
import variableEnum from "@/utils/variableEnum.js";

export default {
  watch: {
    screenHeight() {
      this.changeVariable();
    },
  },
  data() {
    return {
      id: "",
      screenHeight: document.body.clientHeight,
      screenWidth: document.body.clientWidth,
      loading: false,
      variableEnum,
      newsType: "",
      url: "",
    };
  },
  mounted() {
    console.log("route:", this.$route.params);
    this.id = this.$route.params.id;
    this.url = this.$route.params.url;
    this.newsType = this.$route.params.newsType;
    this.changeVariable();
    const that = this;
    window.addEventListener("resize", function () {
      return (() => {
        that.screenHeight = document.body.clientHeight;
        that.screenWidth = document.body.clientWidth;
      })();
    });
    this.refresh();
  },
  methods: {
    refresh() {
      this.loading = true;
      setTimeout(() => {
        console.log("this.url:", this.url);
        this.loading = false;
      }, 2000);
    },
    onClickLeft() {
      switch (this.newsType) {
        case variableEnum.newsKeyType.news_index:
          this.$router.push({
            name: "news-index",
            params: { id: this.id },
          });
          break;
      }
    },
    changeVariable() {
      console.log("screenHeight:", this.screenHeight);
      console.log("screenWidth:", this.screenWidth);
      const height =
        this.screenWidth <= 320
          ? this.screenHeight - 40
          : this.screenWidth > 320 && this.screenWidth < 414
          ? this.screenHeight - 46
          : this.screenWidth >= 414 && this.screenWidth < 768
          ? this.screenHeight - 51
          : this.screenWidth >= 768
          ? this.screenHeight - 92
          : this.screenHeight - 46;
      this.$el.style.setProperty("--cont-height", height + "px");
    },
  },
};
</script>

<style lang="less" scoped>
body {
  scrollbar-face-color: #07b5ec;
  font-size: 12px;
  color: #000000;
  scrollbar-3dlight-color: #000000;
}
.company-index-nav {
  width: 50px;
  height: auto;
  //   background-color: burlywood;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
}
.newsBlock {
  width: 100%;
  height: var(--cont-height) !important;
  //   height: auto;
  // background-color: cadetblue;
  position: fixed;
  z-index: 100;
  box-sizing: border-box;
  overflow-y: hidden;
}
iframe {
  border: 0px;
  overflow-y: hidden;
}
iframe #document html {
  overflow-y: hidden;
  ::-webkit-scrollbar {
    width: 3px;
  }
  /*滚动槽*/
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.15);
  }
}
</style>