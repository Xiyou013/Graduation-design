<template>
  <div id="home">
    <div class="home__topnav">
      <img class="topnav-image" src="../assets/企业搜索1.png" alt="企业搜索" />
      <div
        class="login-user"
        v-if="tokenStatus"
        @click="toSkip('/personal-center')"
      >
        <img class="user-protrait" :src="userProtrait" :alt="userName" />
        <span class="user-name">{{ userName }}</span>
      </div>
      <div class="topnav-button" v-else>
        <el-button type="text" style="color: #f7f7f7" @click="loginFn"
          >登录</el-button
        >
        <el-button type="text" style="color: #f7f7f7" @click="registerFn"
          >注册</el-button
        >
      </div>
    </div>
    <div class="home__select">
      <div class="select-tabs">
        <div
          class="tabs-plan"
          @click="tabsPlanToSelFn(variableEnum.tabsPlanToSelType.company)"
        >
          <span>搜公司</span>
        </div>
        <div
          class="tabs-plan"
          @click="tabsPlanToSelFn(variableEnum.tabsPlanToSelType.boss)"
        >
          <span>搜老板</span>
        </div>
        <div
          class="tabs-plan"
          @click="tabsPlanToSelFn(variableEnum.tabsPlanToSelType.news)"
        >
          <span>搜新闻</span>
        </div>
      </div>

      <van-sticky :offset-top="0">
        <div class="select-input" ref="select_input">
          <van-search
            v-model="seltext"
            background="#0D6CE0"
            @focus="tabsPlanToSelFn(variableEnum.tabsPlanToSelType.company)"
            placeholder="请输入搜索关键词"
          />
        </div>
      </van-sticky>
    </div>
    <div class="home__tabs">
      <van-tabs
        animated
        swipeable
        sticky
        title-active-color="#4783DA"
        color="#4783DA"
        :offset-top="topheight"
      >
        <van-tab title="企业新闻">
          <!-- <div class="home__tabs-plan">标签1</div> -->
          <NewsOne :newsList="newsDataList" />
        </van-tab>
        <van-tab title="热搜新闻">
          <!-- <div class="home__tabs-plan">标签2</div> -->
          <NewsTwo :newsList="newsList" />
        </van-tab>
      </van-tabs>
    </div>
    <div class="hmoe_bottom">
      <van-tabbar @change="onChange" route>
        <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/search" icon="search"
          >搜索</van-tabbar-item
        >
        <van-tabbar-item replace to="/news" icon="comment-o"
          >新闻</van-tabbar-item
        >
        <van-tabbar-item replace to="/personal-center" icon="friends-o"
          >个人中心</van-tabbar-item
        >
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import variableEnum from "@/utils/variableEnum.js";
// import { Notify } from "vant";
import NewsOne from "@/components/homeTabsPlans/newsOne.vue";
import NewsTwo from "@/components/homeTabsPlans/newsTwo.vue";
//每隔10分钟刷新获取热搜新闻的点击量
const time = 600000;

export default {
  name: "home",
  components: { NewsOne, NewsTwo },
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
      variableEnum,
      seltext: "",
      active: 0,
      screenWidth: document.body.clientWidth,
      topHeight: 50,
      tokenStatus: null,
      userProtrait: null,
      userName: null,
      newsDataList: [],
      newsList: [],
    };
  },
  async mounted() {
    localStorage.setItem("keywordType", false);
    var {
      state: { tokenStatus, loginStatus, user, protrait },
    } = this.$store;
    console.log("wwwwww", this.$store.state);
    console.log(tokenStatus, loginStatus, user, protrait);
    this.tokenStatus = tokenStatus;
    this.userProtrait = localStorage.userportrait;
    this.userName = localStorage.username;

    await this.getTopHeight();
    this.editNewsDataNum();
    this.editNewsClick();
    this.refreshInterval = setInterval(() => {
      console.log("123456789");
      this.addNewsClick();
      this.editNewsClick();
      this.editNewsDataNum();
    }, time);
    const that = this;
    window.addEventListener("resize", function () {
      return (() => {
        that.screenWidth = document.body.clientWidth;
      })();
    });
  },
  //如果在mounted里的setInterval不关闭的话，在切换组件时，被它包含的函数任然会继续执行
  beforeDestroy() {
    if (this.refreshInterval != null) clearInterval(this.refreshInterval);
  },
  methods: {
    loginFn() {
      console.log("这是登录");
      this.$router.push("/login");
    },
    registerFn() {
      console.log("这是注册");
      this.$router.push("/register");
    },
    tabsPlanToSelFn(val) {
      console.log("val:", val);
      this.$router.push({
        path: "/search",
        query: {
          active: val,
        },
      });
    },
    toSkip(url) {
      this.$router.push(url);
    },
    onChange(index) {
      console.log("index-onChange:", index);
      // Notify({ type: "primary", message: index });
    },
    getTopHeight() {
      this.topHeight = parseInt(this.$refs.select_input.offsetHeight);
    },
    async getNewsData() {
      try {
        var res = await this.$axios.get(`/api/www/mobile/terminal/homeNews`);
        if (res) {
          console.log("res:", res);
          this.newsDataList = res.data;
        }
      } catch (err) {
        this.$message({
          message: err,
          type: "error",
        });
      }
    },
    async getNewsList() {
      try {
        var res = await this.$axios.get(
          `/api/www/mobile/terminal/homeNewsList`
        );
        if (res) {
          console.log("res:", res);
          this.newsList = res.data;
        }
      } catch (err) {
        this.$message({
          message: err,
          type: "error",
        });
      }
    },
    async editNewsDataNum() {
      try {
        var res = await this.$axios.get(
          `/api/www/mobile/terminal/editNewsDataNum`
        );
        if (res) {
          console.log("res:", res);
          this.getNewsData();
          this.getNewsList();
        }
      } catch (err) {
        this.$message({
          message: err,
          type: "error",
        });
      }
    },
    async addNewsClick() {
      // this.loading = true;
      try {
        var res = await this.$axios.get(`/api/www/addNewsClick`);
        if (res) {
          console.log("res:", res);
          // this.editNewsClick();
          // Toast({
          //   message: res.data.message,
          //   position: "bottom",
          // });
        }
      } catch (err) {
        this.$message({
          message: err,
          type: "error",
        });
      } finally {
        // this.loading = false;
      }
    },
    async editNewsClick() {
      // this.loading = true;
      try {
        var res = await this.$axios.get(`/api/www/editNewsClick`);
        if (res) {
          console.log("res:", res);
          // Toast({
          //   message: res.data.message,
          //   position: "bottom",
          // });
        }
      } catch (err) {
        this.$message({
          message: err,
          type: "error",
        });
      } finally {
        // this.loading = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../css/home.css";
.login-user {
  max-width: 35%;
  font-size: 14px;
  // background-color: yellowgreen;
  display: flex;
  align-items: center;
  padding-right: 8px;
  box-sizing: border-box;
  .user-protrait {
    width: 37px;
    height: 37px;
    background-color: #fff;
    border-radius: 50%;
  }
  .user-name {
    max-width: 60px;
    display: block;
    // background-color: burlywood;
    margin-left: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
    text-align: center;
  }
}
</style>