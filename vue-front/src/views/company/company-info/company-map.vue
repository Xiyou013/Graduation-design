<template>
  <div class="companyMap">
    <van-sticky :offset-top="0">
      <van-nav-bar title="地图" left-arrow @click-left="onClickLeft">
      </van-nav-bar>
    </van-sticky>

    <div class="mapBlock" v-loading="loading">
      <baidu-map
        class="mapBlock"
        :center="address"
        :zoom="17"
        :scroll-wheel-zoom="true"
      >
        <!-- <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale> -->
        <bm-local-search
          :keyword="address"
          style="display: none"
        ></bm-local-search>
      </baidu-map>
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
      // address: "安徽省芜湖市弋江区芜湖高新技术产业开发区久盛路8号",
      address: "",
      loading: false,
      variableEnum,
      companyData: "",
      companyType:'',
    };
  },
  mounted() {
    // this.$el.style.setProperty("--cont-z-index", 1000);
    console.log("route:", this.$route.params);
    this.id = this.$route.params.id;
    this.companyType = this.$route.params.companyType;
    this.companyData = this.$route.params.data;
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
        // this.address = "安徽省芜湖市弋江区芜湖高新技术产业开发区久盛路8号";
        this.address = this.companyData.kjwl_e_address;
        console.log('this.address:',this.address);
        // this.$el.style.setProperty("--cont-z-index", 1);
        this.loading = false;
      }, 2000);
    },
    onClickLeft() {
      // Toast("返回");
      // this.$router.push({ name: "company-index", params: { id: this.id } });
      switch (this.companyType) {
        case variableEnum.companyKeyType.company_index:
          this.$router.push({
            name: "company-index",
            params: { id: this.id },
          });
          break;
        case variableEnum.companyKeyType.business_information:
          this.$router.push({
            name: "business-information",
            params: { data: this.companyData },
          });
          break;
        case variableEnum.companyKeyType.company_more:
          this.$router.push({
            name: "company-more",
            params: { data: this.companyData,id: this.id },
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

      // this.topHeight = parseInt(this.$refs.select_tab.offsetHeight);
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
.mapBlock {
  width: 100%;
  height: var(--cont-height) !important;
  // background-color: cadetblue;
  position: fixed;
  z-index: 100;
}
// .div-block {
//   width: 100%;
//   height: var(--cont-height) !important;
//   background-color: burlywood;
//   position: fixed;
//   z-index: var(--cont-z-index) !important;
// }
</style>