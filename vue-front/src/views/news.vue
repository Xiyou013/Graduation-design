<template>
  <div class="news" v-loading="loading">
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
            @focus="tabsPlanToSelFn(variableEnum.tabsPlanToSelType.news)"
            :placeholder="keyword ? keyword : '请输入搜索关键词'"
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
        <div class="select-attitude">
          <span class="attitude-title">新闻情感：</span>
          <div class="attitude-key">
            <van-dropdown-menu active-color="#1989fa">
              <van-dropdown-item
                v-model="attitudeKey"
                :options="option1"
                @change="changeAttitudeKey"
              />
            </van-dropdown-menu>
          </div>
        </div>
      </div>
    </van-sticky>
    <div class="news__content" v-show="showBlock">
      <div class="news-list">
        <div
          class="list-div"
          v-for="(item, index) in dataList"
          :key="index"
          @click="toNewsFn(item)"
        >
          <div class="list-title">
            <span class="list-title-text">{{ item.kjwl_n_name }}</span>
            <span
              class="list-title-attitude"
              :style="[
                {
                  borderColor:
                    item.qyss_n_positive === 1
                      ? '#6BD089'
                      : item.qyss_n_positive === -1
                      ? '#F47378'
                      : '#A6A6A6',
                  color:
                    item.qyss_n_positive === 1
                      ? '#6BD089'
                      : item.qyss_n_positive === -1
                      ? '#F47378'
                      : '#A6A6A6',
                },
              ]"
              >{{
                item.qyss_n_positive === 1
                  ? "积极"
                  : item.qyss_n_positive === -1
                  ? "消极"
                  : "中立"
              }}</span
            >
          </div>
          <div class="list-label">
            <div
              class="label-div"
              v-for="(value, keyword) in item.qyss_n_labelName"
              :key="keyword"
            >
              <span> # </span>
              <span>{{ value.label }}</span>
            </div>
          </div>
          <div class="list-source">
            <span class="list-text">来源：</span>
            <span>{{ item.kjwl_n_source }}</span>
          </div>
          <div class="list-time">
            <span class="list-text">发布时间：</span>
            <span>{{ item.kjwl_n_rdatetime }}</span>
          </div>
          <!-- <div class="list-mbody">
            <span class="list-text">发布主体：</span>
            <span>{{ item.kjwl_n_mbody }}</span>
          </div> -->
        </div>
      </div>
      <!-- <div class="news__vip">
        <span class="news__vip-text"
          ><span>成为VIP会员即可查看全部新闻</span></span
        >
        <van-button color="#0D6CE0" class="news__vip-btn"
          >立即开通VIP</van-button
        >
      </div> -->
    </div>
    <div class="company__block" v-show="!showBlock">
      <noSearchContent />
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
import variableEnum from "@/utils/variableEnum.js";
import noSearchContent from "@/components/searchTabsPlans/noSearchContent.vue";

export default {
  components: { noSearchContent },
  watch: {
    screenWidth() {
      this.changeVariable();
      // this.getTopHeight();
    },
  },
  data() {
    return {
      variableEnum,
      seltext: "",
      icon_size: 20,
      screenWidth: document.body.clientWidth,
      loading: false,
      keyword: "",
      keywordType: "",
      type: 1,
      showBlock: true,
      dataList: [],
      attitudeKey: "",
      option1: [
        { text: "不限", value: "" },
        { text: "消极", value: -1 },
        { text: "中立", value: 0 },
        { text: "积极", value: 1 },
      ],
    };
  },
  mounted() {
    this.changeVariable();
    // this.getTopHeight();
    console.log("router:", this.$route.params);
    this.keyword = this.$route.params.keyword;
    this.keywordType = localStorage.keywordType;
    console.log("keywordType:", this.keywordType);
    if (JSON.parse(this.keywordType)) {
      this.keyword = localStorage.keyword;
    }
    if (this.keyword === false || this.keyword === undefined) {
      this.type = variableEnum.newsKeyType.nokeyword;
    } else {
      this.type = variableEnum.newsKeyType.keyword;
    }
    const that = this;
    window.addEventListener("resize", function () {
      return (() => {
        that.screenWidth = document.body.clientWidth;
      })();
    });
    this.getNewsList();
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
      console.log("search:", this.seltext);
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
    changeVariable() {
      console.log("screenWidth:", this.screenWidth);
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
    toNewsFn(item) {
      console.log("item:", item);
      this.$router.push({
        name: "news-index",
        params: {
          id: item.kjwl_n_id,
          type: this.type,
        },
      });
    },
    changeAttitudeKey(value) {
      console.log("value:", value);
      this.getNewsList();
    },
    async getNewsList() {
      this.loading = true;
      let res;
      console.log("keyword:", this.keyword);
      let params = {
        keyword: this.keyword,
        attitudeKey: this.attitudeKey,
      };
      console.log("params:", params);
      try {
        if (this.type === variableEnum.newsKeyType.nokeyword) {
          console.log("123");
          res = await this.$axios.post(`/api/www/getNewsList`, params);
        }
        if (this.type === variableEnum.newsKeyType.keyword) {
          console.log("456");
          res = await this.$axios.post(`/api/www/getNewsKeywordList`, params);
        }

        if (res) {
          console.log("res:", res);
          // this.dataList = res.data;
          this.dataList = this.newsListFormat(res.data);
          if (this.dataList.length <= 0) this.showBlock = false;
          if (this.dataList.length > 0) this.showBlock = true;
          console.log("this.dataList:", this.dataList);
        }
      } catch (err) {
        this.$message({
          message: err,
          type: "error",
        });
      } finally {
        this.loading = false;
      }
    },
    newsListFormat(value) {
      for (let i = 0; i < value.length; i++) {
        for (let j in value[i]) {
          if (j === "qyss_n_labelName") {
            value[i][j] = JSON.parse(value[i][j]);
          }
          if (j === "kjwl_n_content") {
            var reg = new RegExp('"', "g");
            value[i][j] = value[i][j].replace(reg, "");
          }
        }
      }
      return value;
    },
  },
};
</script>

<style lang="less" scoped>
.select__block {
  width: 100%;
  height: 100px;
  background-color: #fff;
  // background-color: cornflowerblue;
  display: flex;
  flex-wrap: wrap;
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
  .select-attitude {
    width: 100%;
    height: 30px;
    // background-color: cadetblue;
    display: flex;
    .attitude-title {
      display: block;
      width: 23%;
      height: 30px;
      // background-color: burlywood;
      font-size: 14px;
      text-align: center;
      line-height: 30px;
      border-bottom: 2px solid rgb(100 101 102 / 12%);
    }
    .attitude-key {
      width: 77%;
      height: 30px;
    }
  }
}
/deep/.van-dropdown-menu__bar {
  height: 30px;
  box-shadow: 0 2px 0 rgb(100 101 102 / 12%);
}
/deep/.van-ellipsis {
  font-size: 13px;
}

.van-search {
  padding: 0px;
}
.news__content {
  width: 100%;
  height: auto;
  // background-color: burlywood;
  padding-bottom: 50px;
  // overflow: hidden;
}
.news__vip {
  width: 100%;
  height: 120px;
  background-color: #fff;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .news__vip-text {
    display: block;
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    // background-color:darksalmon;
    font-size: 16px;
    color: #333;
  }
  .news__vip-btn {
    width: 180px;
  }
}
.news-list {
  width: 100%;
  height: auto;
  // background-color: darksalmon;
}
.list-div {
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
  .list-title {
    width: 100%;
    height: auto;
    // background-color: darksalmon;
    font-size: 15px;
    color: #333;
    display: flex;
    .list-title-text {
      display: block;
      width: 100%;
      height: auto;
      padding-right: 5px;
      box-sizing: border-box;
    }
    .list-title-attitude {
      display: block;
      width: 40px;
      height: 20px;
      font-size: 12px;
      border: 1px solid;
      padding: 0px 0px;
      box-sizing: border-box;
      border-radius: 3px;
      text-align: center;
    }
  }
  .list-label {
    width: 100%;
    height: auto;
    // background-color: cornflowerblue;
    display: flex;
    flex-wrap: wrap;
    padding: 8px 0px;
    box-sizing: border-box;
    .label-div {
      width: auto;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0px 4px;
      margin: 3px 8px 3px 0px;
      font-size: 12px;
      color: #cbcccf;
      // border: 1px solid #333;
    }
  }
  .list-text {
    color: #cbcccf;
  }
  .list-source,
  .list-time,
  .list-mbody {
    width: 100%;
    height: auto;
    // background-color: darkorange;
    font-size: 13px;
    color: #333;
    margin: 5px 0px 3px 0px;
  }
}
</style>