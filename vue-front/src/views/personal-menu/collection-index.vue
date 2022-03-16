<template>
  <div class="collection">
    <van-sticky :offset-top="0">
      <van-nav-bar
        left-this.telErrorMessage="返回"
        left-arrow
        @click-left="onClickLeft"
        ref="collection_nav"
      >
        <template #title>
          <span>我的收藏</span>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="collection__tabs">
      <van-tabs
        v-model="active"
        animated
        swipeable
        sticky
        title-active-color="#4783DA"
        color="#4783DA"
        :offset-top="topheight"
      >
        <van-tab title="公司">
          <!-- <div class="home__tabs-plan">标签1</div> -->
          <Companyplan />
        </van-tab>
        <van-tab title="人物">
          <!-- <div class="home__tabs-plan">标签2</div> -->
          <Bossplan />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Companyplan from "@/components/collectionTabsPlans/company-plan.vue";
import Bossplan from "@/components/collectionTabsPlans/boss-plan.vue";
import variableEnum from "@/utils/variableEnum.js";

export default {
  components: { Companyplan, Bossplan },
  computed: {
    topheight() {
      return this.topHeight;
    },
  },
  watch: {
    screenWidth() {
      this.getTopHeight();
    },
  },
  data() {
    return {
      screenWidth: document.body.clientWidth,
      topHeight: 46,
      variableEnum,
      active:variableEnum.tabsPlanToSelType.company,
    };
  },
  async mounted() {
    this.active = this.$route.params.active || variableEnum.tabsPlanToSelType.company;
    await this.getTopHeight();
    const that = this;
    window.addEventListener("resize", function () {
      return (() => {
        that.screenWidth = document.body.clientWidth;
      })();
    });
  },
  methods: {
    onClickLeft() {
      // Toast("返回");
      this.$router.push("/personal-center");
    },
    getTopHeight() {
      // console.log("this.$refs.collection_nav:",this.$refs.collection_nav)
      // this.topHeight = parseInt(this.$refs.collection_nav.offsetHeight);
      this.topHeight =
        this.screenWidth <= 320
          ? 39
          : this.screenWidth > 320 && this.screenWidth < 414
          ? 46
          : this.screenWidth >= 414 && this.screenWidth < 768
          ? 51
          : this.screenWidth >= 768
          ? 92
          : 46;
    },
  },
};
</script>

<style lang="less" scoped>
.collection__tabs {
  width: 100%;
  height: auto;
  background-color: #f2f2f2;
  // background-color: burlywood;
  padding-bottom: 10px;
  box-sizing: border-box;
  // margin-top: 4px;
  /* overflow-y: auto; */
}
</style>