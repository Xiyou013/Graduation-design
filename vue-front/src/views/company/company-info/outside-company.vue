<template>
  <div class="outsideNews">
    <van-sticky :offset-top="0">
      <van-nav-bar :title="title" left-arrow @click-left="onClickLeft">
      </van-nav-bar>
    </van-sticky>

    <div class="newsBlock" v-loading="loading">
      <!-- 因浏览器同源策略问题，iframe引入的外部网站域名与本地不一致，产生跨域，无法通过js交互更改样式 -->
      <iframe
        :src="url"
        id="mobsf"
        frameborder="0"
        scrolling="auto"
        sandbox="allow-same-origin allow-scripts"
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
      companyType: "",
      companyData: "",
      url: "",
      title: "",
    };
  },
  mounted() {
    console.log("route:", this.$route.params);
    this.id = this.$route.params.id;
    this.companyData = this.$route.params.data;
    this.companyType = this.$route.params.companyType;
    this.url = this.companyData ? this.companyData.kjwl_e_website : "";
    this.title = this.companyData ? this.companyData.kjwl_e_name : "";

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

      //   setTimeout(() => {
      console.log("this.url:", this.url);

      this.loading = false;
      //   }, 2000);
    },
    onClickLeft() {
      switch (this.companyType) {
        case variableEnum.companyKeyType.company_index:
          this.$router.push({
            name: "company-index",
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

      const mobsf = document.getElementById("mobsf");
      mobsf.style.width = Number(this.screenWidth) + "px"; //数字是页面布局宽度差值
      mobsf.style.height = Number(height) + "px"; //数字是页面布局高度差
    },
  },
};
</script>

<style lang="less" scoped>
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
  // overflow-y: hidden;
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