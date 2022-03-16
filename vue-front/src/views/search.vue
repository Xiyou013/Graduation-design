<template>
  <div class="select">
    <van-sticky :offset-top="0">
      <div class="select__block" ref="select_tab">
        <div class="seltap__back">
          <van-icon
            name="arrow-left"
            :size="icon_size"
            custom-class="arrow_left"
            @click="seltapBack"
          />
        </div>
        <div class="select-input">
          <van-search
            v-model="seltext"
            @search="searchFn"
            placeholder="请输入搜索关键词"
          />
        </div>
        <div class="select-prompt">
          <el-button type="text" @click="seltapBack" v-if="seltext === ''"
            >取消</el-button
          >
          <el-button type="text" @click="searchFn" v-if="seltext !== ''"
            >搜索</el-button
          >
        </div>
      </div>
    </van-sticky>
    <div class="search__content">
      <van-tabs
        swipeable
        animated
        v-model="active"
        title-active-color="#4783DA"
        color="#4783DA"
        sticky
        :offset-top="topheight"
        @click="tabsChangeFn"
      >
        <van-tab title="公司"> <Company :active="active" /></van-tab>
        <van-tab title="老板"> <Boss :active="active" /> </van-tab>
        <van-tab title="新闻"> <News :active="active" /> </van-tab>
      </van-tabs>
    </div>
    <van-tabbar @change="onChange" route>
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item replace to="/news" icon="comment-o"
        >新闻</van-tabbar-item
      >
      <van-tabbar-item replace to="/personal-center" icon="friends-o"
        >个人中心</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
// import { Notify } from "vant";
import { Toast } from "vant";
import Company from "@/components/searchTabsPlans/company.vue";
import Boss from "@/components/searchTabsPlans/boss.vue";
import News from "@/components/searchTabsPlans/news.vue";
import variableEnum from "@/utils/variableEnum.js";

export default {
  components: { Company, Boss, News },
  computed: {
    topheight() {
      return this.topHeight;
    },
  },
  watch: {
    screenWidth() {
      this.changeVariable();
      this.getTopHeight();
    },
  },
  data() {
    return {
      seltext: "",
      icon_size: 20,
      screenWidth: document.body.clientWidth,
      active: 0,
      topHeight: 50,
      variableEnum,
      params: {
        id: "",
        name: "",
        seltext: "",
        active: "",
      },
    };
  },
  mounted() {
    this.params.id = localStorage.userid;
    this.params.name = localStorage.username;
    localStorage.setItem("keywordType", false);
    this.changeVariable();
    this.getTopHeight();
    const that = this;
    window.addEventListener("resize", function () {
      return (() => {
        that.screenWidth = document.body.clientWidth;
      })();
    });
  },
  methods: {
    onChange(index) {
      console.log("index:", index);
      // Notify({ type: "primary", message: index });
    },
    seltapBack() {
      this.$router.push("/home");
    },
    searchFn() {
      console.log("search:", this.seltext, this.active);
      if (this.seltext.length < 2) {
        Toast({
          message: "请至少输入2个关键字",
          position: "bottom",
        });
        return;
      }
      this.addHistorySterm(this.seltext, this.active);
      localStorage.setItem("keyword", this.seltext);
      switch (this.active) {
        case variableEnum.tabsPlanToSelType.company:
          // this.$router.push("/company-search");
          this.$router.push({name: "company-search",params:{keyword:this.seltext}});
          break;
        case variableEnum.tabsPlanToSelType.boss:
          this.$router.push({name: "boss-search",params:{keyword:this.seltext}});
          break;
        case variableEnum.tabsPlanToSelType.news:
          localStorage.setItem("keywordType", true);
          this.$router.push({name: "news",params:{keyword:this.seltext}});
          break;
      }
    },
    changeVariable() {
      console.log("screenWidth:", this.screenWidth);
      console.log("router:", this.$route.query);
      this.active = Number(this.$route.query.active);
      console.log("active:", this.active);

      // this.topHeight = parseInt(this.$refs.select_tab.offsetHeight);
      this.icon_size =
        this.screenWidth <= 320
          ? 15
          : this.screenWidth > 320 && this.screenWidth < 414
          ? 20
          : this.screenWidth >= 414 && this.screenWidth < 768
          ? 23
          : this.screenWidth >= 768
          ? 35
          : 20;
    },
    getTopHeight() {
      console.log("123:", this.$refs.select_tab.offsetHeight);
      this.topHeight = parseInt(this.$refs.select_tab.offsetHeight);
      this.$el.style.setProperty("--tabs-height", this.topHeight - 6 + "px");
    },
    tabsChangeFn() {
      console.log("active111:", this.active);
    },
    async addHistorySterm(seltext, active) {
      this.params = {
        ...this.params,
        seltext,
        active,
      };
      console.log("params:", this.params);
      try {
        var res = await this.$axios.post(
          `/api/www/userAddHistorySterm`,
          this.params
        );
        if (res) {
          console.log("res:", res);
          this.labelList = res.data;
        }
      } catch (err) {
        this.$message({
          message: err,
          type: "error",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.select__block {
  width: 100%;
  height: 50px;
  background-color: #fff;
  // background-color: cornflowerblue;
  display: flex;
  align-items: center;
  .seltap__back,
  .select-prompt {
    width: 10%;
    height: 30px;
    /* background-color: coral; */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .select-input {
    width: 80%;
    height: 30px;
  }
  // .select-prompt {
  //   width: 10%;
  //   height: 30px;
  //   // background-color: coral;
  //   display: flex;
  //   align-items: center;
  // }
}
.van-search {
  padding: 0px;
}
.search__content {
  width: 100%;
  height: auto;
  background-color: #f2f2f2;
  padding-bottom: 55px;
  box-sizing: border-box;
  // margin-top: 4px;
}
/deep/.van-tabs > div:nth-child(1) {
  height: var(--tabs-height) !important;
  // background-color: cadetblue;
}
</style>