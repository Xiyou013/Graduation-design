<template>
  <div class="news-index" v-loading="loading">
    <van-sticky :offset-top="0">
      <van-nav-bar title="新闻详情" left-arrow @click-left="onClickLeft">
        <template #right>
          <div class="news-index-nav">
            <van-icon name="search" @click="onClickSearch" />
            <!-- <van-icon name="share" @click='showShareFn'/> -->
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="news-content">
      <div class="news-info">
        <div class="info-title">
          <span>{{ newsdata.kjwl_n_name }} </span>
        </div>
        <div class="info-label">
          <div class="label-attitude">
            <span>{{
              newsdata.qyss_n_positive === 1
                ? "积极"
                : newsdata.qyss_n_positive === -1
                ? "消极"
                : "中立"
            }}</span>
          </div>
          <div
            class="label-list"
            v-for="(item, index) in newsdata.qyss_n_labelName"
            :key="index"
          >
            <span>{{ item.label }}</span>
          </div>
        </div>
        <div class="info-source-time">
          <div class="info-source">
            <span class="source-text">来源：</span>
            <span class="source-mediaName">{{ newsdata.kjwl_n_source }}</span>
          </div>
          <span class="info-time">{{ newsdata.kjwl_n_rdatetime }}</span>
        </div>
        <van-divider class="info-divider" />
        <div class="info-content">
          <span>{{ newsdata.kjwl_n_content }}</span>
        </div>
        <div class="info-url" @click.stop="toNewsUrl">
          <div class="url-icon">
            <van-icon name="weapp-nav" color="#fff" />
          </div>
          <div class="url-text">
            <span>{{ newsdata.kjwl_n_name }}</span>
          </div>
        </div>
      </div>
      <div class="news-enterprise" v-if="enterpriseList.length > 0">
        <div class="enterprise-title">
          <span>相关企业</span>
        </div>
        <div
          class="enterprise-list"
          v-for="(item, index) in enterpriseList"
          :key="index"
          @click="toNewsCompany(item)"
        >
          <div class="enterprise-block">
            <img
              :src="item.kjwl_e_portrait"
              :alt="item.kjwl_e_name"
              class="enterprise-img"
            />
            <span class="enterprise-text">{{ item.kjwl_e_name }}</span>
          </div>
          <div class="enterprise-focus">
            <span v-if="item.focus === 0" @click.stop="toCollectCompany(item)"
              >+ <span>关注</span></span
            >
            <span v-if="item.focus === 1">已关注</span>
          </div>
        </div>
      </div>
      <div class="news-personal" v-if="personalList.length > 0">
        <div class="personal-title">
          <span>相关人员</span>
        </div>
        <div
          class="personal-list"
          v-for="(item, index) in personalList"
          :key="index"
          @click="toNewsPerson(item)"
        >
          <div class="personal-block">
            <img
              :src="item.kjwl_p_portrait"
              :alt="item.kjwl_p_name"
              class="personal-img"
            />
            <span class="personal-text">{{ item.kjwl_p_name }}</span>
          </div>
          <div class="personal-focus">
            <span v-if="item.focus === 0" @click.stop="toCollectPerson(item)"
              >+ <span>关注</span></span
            >
            <span v-if="item.focus === 1">已关注</span>
          </div>
        </div>
      </div>
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
    <van-share-sheet
      v-model="showShare"
      safe-area-inset-bottom
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import variableEnum from "@/utils/variableEnum.js";
export default {
  //   watch: {
  //     screenWidth() {
  //       this.changeVariable();
  //       //   this.getTopHeight();
  //     },
  //   },
  data() {
    return {
      showShare: false,
      enterpriseList: [],
      personalList: [],
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "QQ", icon: "qq" },
          { name: "复制链接", icon: "link" },
        ],
      ],
      id: "",
      userid: "",
      loading: false,
      newsdata: "",
      keyword: "",
      type: "",
    };
  },
  mounted() {
    console.log("router:", this.$route.params);
    this.id = this.$route.params.id;
    this.userid = localStorage.userid;
    this.type = this.$route.params.type || variableEnum.newsKeyType.search;
    this.keyword = localStorage.keyword;
    this.companyId = this.$route.params.companyId;
    this.personId = this.$route.params.personId;
    this.getNewsData();
    this.addNewsClickNum();
    // this.getNewsCompanyList();
    // this.getNewsPersonalList();
  },
  methods: {
    onChange(index) {
      console.log("index:", index);
      // Notify({ type: "primary", message: index });
    },
    onClickLeft() {
      // Toast("返回");
      switch (this.type) {
        case variableEnum.newsKeyType.keyword:
          // this.$router.push("/company-search");
          this.$router.push({
            name: "news",
            params: { keyword: this.keyword },
          });
          break;
        case variableEnum.newsKeyType.nokeyword:
          this.$router.push({ name: "news", params: { keyword: false } });
          break;
        case variableEnum.newsKeyType.search:
          this.$router.push("/search");
          break;
        case variableEnum.newsKeyType.home:
          this.$router.push("/home");
          break;
        case variableEnum.newsKeyType.company_news:
          this.$router.push({
            name: "news-opinion",
            params: { companyId: this.companyId },
          });
          break;
        case variableEnum.newsKeyType.person_news:
          this.$router.push({
            name: "boss-news-opinion",
            params: { id: this.personId },
          });
          break;
      }
    },
    onClickSearch() {
      this.$router.push({
        path: "/search",
        query: {
          active: 0,
        },
      });
    },
    showShareFn() {
      this.showShare = true;
    },
    onSelect(option) {
      console.log("select:", option.name);
      this.showShare = false;
    },
    toNewsUrl() {
      console.log("这里是点击跳转至外部新闻网站", this.newsdata,this.newsdata.kjwl_n_url);
      this.$router.push({
        name: "outside-news",
        params: {
          id: this.newsdata.kjwl_n_id,
          newsType: variableEnum.newsKeyType.news_index,
          url:this.newsdata.kjwl_n_url,
        },
      });
    },
    toNewsPerson(item) {
      console.log("item-p:", item);
      this.$router.push({
        name: "boss-index",
        params: {
          id: item.kjwl_p_id,
          persontype: variableEnum.personKeyType.newIndex,
          newsId: this.id,
        },
      });
    },
    toNewsCompany(item) {
      console.log("item-c:", item);
      this.$router.push({
        name: "company-index",
        params: {
          id: item.kjwl_e_id,
          companytype: variableEnum.companyKeyType.newIndex,
          newsId: this.id,
        },
      });
    },
    async toCollectCompany(item) {
      console.log("item-ce:", item);
      this.loading = true;
      try {
        var res = await this.$axios.get(
          `/api/www/addCollectCompany/${item.kjwl_e_id}/${this.userid}`
        );
        if (res) {
          console.log("res:", res);
          Toast({
            message: res.data.message,
            position: "bottom",
          });
          this.getNewsData();
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
    async toCollectPerson(item) {
      console.log("item-cp:", item);
      this.loading = true;
      try {
        var res = await this.$axios.get(
          `/api/www/addCollectPerson/${item.kjwl_p_id}/${this.userid}`
        );
        if (res) {
          console.log("res:", res);
          Toast({
            message: res.data.message,
            position: "bottom",
          });
          this.getNewsData();
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
    changeVariable() {
      if (this.newsdata.qyss_n_positive === -1) {
        this.$el.style.setProperty("--attitude-background", "#FBCFD0");
        this.$el.style.setProperty("--attitude-color", "#F47378");
      }
      if (this.newsdata.qyss_n_positive === 1) {
        this.$el.style.setProperty("--attitude-background", "#C8EFD4");
        this.$el.style.setProperty("--attitude-color", "#6BD089");
      }
      if (this.newsdata.qyss_n_positive === 0) {
        this.$el.style.setProperty("--attitude-background", "#F2F2F2");
        this.$el.style.setProperty("--attitude-color", "#A6A6A6");
      }
    },
    async getNewsData() {
      this.loading = true;
      try {
        var res = await this.$axios.get(`/api/www/getNewsData/${this.id}`);
        if (res) {
          console.log("res:", res);
          this.newsdata = res.data;
          // this.newsdata = this.newsListFormat(res.data);
          this.newsdata.qyss_n_labelName = JSON.parse(
            this.newsdata.qyss_n_labelName
          );
          this.newsdata.kjwl_n_content = this.newsdata.kjwl_n_content.substring(
            4,
            this.newsdata.kjwl_n_content.length - 5
          );

          console.log("this.newsdata:", this.newsdata);
          this.changeVariable();
          this.getNewsCompanyList();
          this.getNewsPersonalList();
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
    async addNewsClickNum() {
      this.loading = true;
      try {
        var res = await this.$axios.get(
          `/api/www/addNewsClickNum/${this.id}`
        );
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
        this.loading = false;
      }
    },
    async getNewsCompanyList() {
      this.loading = true;
      try {
        var res = await this.$axios.get(
          `/api/www/getNewsCompanyList/${this.id}/${this.userid}`
        );
        if (res) {
          console.log("res:", res);
          this.enterpriseList = res.data;
          console.log("this.enterpriseList:", this.enterpriseList);
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
    async getNewsPersonalList() {
      this.loading = true;
      try {
        var res = await this.$axios.get(
          `/api/www/getNewsPersonalList/${this.id}/${this.userid}`
        );
        if (res) {
          console.log("res:", res);
          this.personalList = res.data;
          console.log("this.personalList:", this.personalList);
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
  },
};
</script>

<style lang="less" scoped>
.news-index-nav {
  width: 50px;
  height: auto;
  //   background-color: burlywood;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
}
.news-content {
  width: 100%;
  height: auto;
  //   background-color: burlywood;
  padding-bottom: 50px;
}
.news-info {
  width: 100%;
  height: auto;
  //   background-color: cadetblue;
  background-color: #fff;
  padding: 15px;
  box-sizing: border-box;
  .info-title {
    width: 100%;
    height: auto;
    // background-color: coral;
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }
  .info-label {
    width: 100%;
    height: auto;
    // background-color: burlywood;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    .label-attitude {
      width: auto;
      height: auto;
      padding: 3px 5px;
      box-sizing: border-box;
      font-size: 13px;
      color: var(--attitude-color);
      // DB837F
      //   ffeaf4
      background-color: var(--attitude-background);
      border-radius: 3px;
      margin: 2px 3px;
    }
    .label-list {
      width: auto;
      height: auto;
      padding: 3px 5px;
      box-sizing: border-box;
      font-size: 12px;
      color: #626262;
      background-color: #ededed;
      border-radius: 3px;
      margin: 3px 3px;
    }
  }
  .info-source-time {
    width: 100%;
    height: auto;
    // background-color: burlywood;
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    color: #636363;
    .info-source {
      width: auto;
      height: auto;
      //   background-color: coral;
      font-size: 13px;
      margin-right: 10px;
    }
    .info-time {
      width: auto;
      height: auto;
      //   background-color: cornflowerblue;
      font-size: 13px;
    }
  }
  .info-divider {
    margin-top: 25px;
  }
  .info-content {
    width: 100%;
    height: auto;
    // background-color: darkseagreen;
    font-size: 14px;
    color: #333;
    text-align: justify;
    line-height: 30px;
  }
  .info-url {
    width: 100%;
    height: 60px;
    background-color: #f9f3f5;
    margin-top: 20px;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;

    .url-icon {
      width: 40px;
      height: 40px;
      background-color: #1389e8;
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
    }
    .url-text {
      width: 100%;
      height: 40px;
      font-size: 14px;
      color: #2e2c2d;
      //   background-color: coral;
      padding-left: 5px;
      box-sizing: border-box;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      //   white-space: nowrap;
    }
  }
}
.news-enterprise,
.news-personal {
  width: 100%;
  height: auto;
  //   background-color: cadetblue;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 10px;
  .enterprise-title,
  .personal-title {
    width: 100%;
    height: 30px;
    // background-color: darksalmon;
    font-size: 15px;
    font-weight: bold;
    display: flex;
    align-items: center;
    padding-left: 10px;
    box-sizing: border-box;
  }
  .enterprise-list,
  .personal-list {
    width: 100%;
    height: 40px;
    // background-color: darksalmon;
    font-size: 14px;
    display: flex;
    align-items: center;
    border-top: 1px solid #f9f9f9;
    padding-left: 10px;
    box-sizing: border-box;
    .enterprise-block,
    .personal-block {
      width: 100%;
      height: 40px;
      //   background-color: darkseagreen;
      display: flex;
      align-items: center;
    }
    .enterprise-img,
    .personal-img {
      width: 25px;
      height: 25px;
      background-color: #fff;
      border-radius: 3px;
      border: 1px solid #f1f1f1;
      object-fit: contain;
    }
    .enterprise-text,
    .personal-text {
      margin-left: 5px;
      color: #0fa6d8;
    }
    .enterprise-focus,
    .personal-focus {
      width: 50px;
      height: 20px;
      border: 1px solid #0fa6d8;
      font-size: 12px;
      color: #0fa6d8;
      text-align: center;
      border-radius: 3px;
    }
  }
}
</style>