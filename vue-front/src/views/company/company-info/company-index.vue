<template>
  <div class="company" v-loading="loading">
    <van-sticky :offset-top="0">
      <van-nav-bar title="企业" left-arrow @click-left="onClickLeft">
        <template #right>
          <div class="company-index-nav">
            <van-icon name="search" @click="onClickSearch" />
            <!-- <van-icon name="share" @click="showShareFn" /> -->
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>

    <div class="company__block">
      <div class="company-info">
        <div class="info-image-name">
          <div class="info-block">
            <img
              :src="dataList.kjwl_e_portrait"
              :alt="dataList.kjwl_e_name"
              class="info-img"
            />
            <span class="info-text">{{ dataList.kjwl_e_name }}</span>
          </div>
          <div class="info-focus">
            <span
              v-if="dataList.focus === 0"
              @click.stop="onCollectCompany(dataList)"
              >+ <span>关注</span></span
            >
            <span v-if="dataList.focus === 1">已关注</span>
          </div>
        </div>
        <div class="info-label">
          <div
            class="label-div"
            v-for="(value, key) in dataList.qyss_e_labelName"
            :key="key"
          >
            <span> # </span>
            <span>{{ value.label }}</span>
          </div>
        </div>
        <div class="info-personal-money-time">
          <div class="info-personal">
            <div class="info-personal-text">
              <span>法定代表人</span>
            </div>
            <div class="info-personal-name" @click.stop="onPersonal(dataList)">
              <span style="color: #54c1f0">{{ dataList.kjwl_e_lrpeople }}</span>
            </div>
          </div>
          <div class="info-money">
            <div class="info-money-text">
              <span>注册资本</span>
            </div>
            <div class="info-money-number">
              <span>{{ dataList.kjwl_e_regcapital }}</span>
              <span>万元人民币</span>
            </div>
          </div>
          <div class="info-time">
            <div class="info-time-text">
              <span>成立日期</span>
            </div>
            <div class="info-time-date">
              <span>{{ dataList.kjwl_e_setdate }}</span>
            </div>
          </div>
        </div>
        <div class="info-address-phone-website">
          <div class="info-address-text">
            <van-icon name="phone-o" color="#60C5F1" />
            <span class="info-address">{{ dataList.kjwl_e_phone }}</span>
          </div>
          <div class="info-phone" @click.stop="onMap(dataList)">
            <van-icon name="location-o" color="#60C5F1" />
            <span class="info-phone-text">地址</span>
          </div>
          <div class="info-website" @click.stop="onWebsite(dataList)">
            <van-icon name="shield-o" color="#60C5F1" />
            <span class="info-website-text">网址</span>
          </div>
          <div class="info-more" @click.stop="onMore(dataList)">
            <span class="info-more-text">更多</span>
            <van-icon name="arrow" color="#60C5F1" />
          </div>
        </div>
      </div>
      <div class="company-menu">
        <div
          class="company-menu-list"
          v-for="(item, index) in menuList"
          :key="index"
          @click.stop="onMenuList(item)"
        >
          <div class="list-icon">
            <van-icon :name="item.iconName" color="#60C5F1" />
          </div>
          <div class="list-text">
            <span>{{ item.iconText }}</span>
          </div>
        </div>
      </div>
      <div class="company-feedback" @click="toFeedback">
        <div class="feedback-block">
          <div class="feedback-div feedback-title">企业纠错反馈</div>
          <div class="feedback-div"><van-icon name="arrow" /></div>
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
  data() {
    return {
      showShare: false,
      id: "",
      userid: "",
      loading: false,
      variableEnum,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "QQ", icon: "qq" },
          { name: "复制链接", icon: "link" },
        ],
      ],
      menuList: [
        { id: 1, iconName: "balance-list-o", iconText: "工商信息" },
        { id: 2, iconName: "friends-o", iconText: "主要人员" },
        { id: 3, iconName: "newspaper-o", iconText: "新闻舆情" },
      ],
      dataList: {},
      type: "",
      newsId: "",
      active: "",
    };
  },
  mounted() {
    console.log("route:", this.$route.params);
    this.companyId = this.$route.params.companyId;
    this.id = this.$route.params.id || this.companyId;
    this.userid = localStorage.userid;
    this.companytype =
      this.$route.params.companytype || variableEnum.companyKeyType.search;
    this.newsId = this.$route.params.newsId;
    this.personId = this.$route.params.personId;
    this.active = this.$route.params.active;
    this.getCompanyData();
  },
  methods: {
    onChange(index) {
      console.log("index:", index);
      // Notify({ type: "primary", message: index });
    },
    onClickLeft() {
      // Toast("返回");
      switch (this.companytype) {
        case variableEnum.companyKeyType.newIndex:
          this.$router.push({
            name: "news-index",
            params: { id: this.newsId },
          });
          break;
        case variableEnum.companyKeyType.company_search:
          this.$router.push("/company-search");
          break;
        case variableEnum.companyKeyType.search:
          this.$router.push("/search");
          break;
        case variableEnum.companyKeyType.boss_index:
          this.$router.push({
            name: "boss-index",
            params: { id: this.personId },
          });
          break;
        case variableEnum.companyKeyType.collection_index:
          this.$router.push({
            name: "collection-index",
            params: { active: this.active },
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
    onPersonal(item) {
      console.log("item-personal:", item);
      this.$router.push({
        name: "boss-index",
        params: {
          id: item.kjwl_p_id,
          companyId: item.kjwl_e_id,
          persontype: variableEnum.personKeyType.company_index,
        },
      });
    },
    toFeedback() {
      this.$router.push({
        name: "comapny-feedback",
        params: {
          companyId: this.dataList.kjwl_e_id,
        },
      });
    },
    onMore(item) {
      console.log("item-more:", item);
      this.$router.push({
        name: "company-more",
        params: { id: item.kjwl_e_id },
      });
    },
    onWebsite(item) {
      console.log("item-more:", item);
      this.$router.push({
        name: "outside-company",
        params: {
          id: item.kjwl_e_id,
          companyType: variableEnum.companyKeyType.company_index,
          data: item,
        },
      });
    },
    onMap(item) {
      console.log("item-more:", item);
      this.$router.push({
        name: "company-map",
        params: {
          id: item.kjwl_e_id,
          data: item,
          companyType: variableEnum.companyKeyType.company_index,
        },
      });
    },
    onMenuList(item) {
      console.log("item-menu:", item);
      let url =
        item.id === 1
          ? "business-information"
          : item.id === 2
          ? "main-staff"
          : "news-opinion";
      this.$router.push({ name: url, params: { data: this.dataList } });
    },
    async getCompanyData() {
      this.loading = true;
      console.log("id:", this.id);
      try {
        var res = await this.$axios.get(
          `/api/www/getCompanyData/${this.id}/${this.userid}`
        );
        if (res) {
          console.log("getCompanyData:", res);
          this.dataList = res.data;
          console.log("dataList:", this.dataList);
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
    async onCollectCompany(item) {
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
          this.getCompanyData();
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
.company-index-nav {
  width: 50px;
  height: auto;
  //   background-color: burlywood;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
}
.company__block {
  width: 100%;
  height: auto;
  // background-color: burlywood;
  padding-bottom: 50px;
}
.company-info {
  width: 100%;
  height: auto;
  //   background-color: cadetblue;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  .info-image-name {
    width: 100%;
    height: 70px;
    // background-color: coral;
    font-size: 14px;
    display: flex;
    align-items: center;
    .info-block {
      width: 100%;
      height: 70px;
      // background-color: darkseagreen;
      display: flex;
      align-items: center;
      .info-img {
        width: 50px;
        height: 50px;
        background-color: #fff;
        border-radius: 3px;
        border: 1px solid #f1f1f1;
        object-fit: contain;
      }
      .info-text {
        color: #333;
        margin-left: 5px;
      }
    }
    .info-focus {
      width: 50px;
      height: 20px;
      border: 1px solid #0fa6d8;
      font-size: 12px;
      color: #0fa6d8;
      text-align: center;
      border-radius: 3px;
    }
  }
  .info-label {
    width: 100%;
    height: auto;
    // background-color: cornflowerblue;
    display: flex;
    flex-wrap: wrap;
    padding: 3px 0px;
    box-sizing: border-box;
    margin-top: 10px;
    margin-bottom: 15px;
    .label-div {
      width: auto;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2px 5px;
      margin: 3px 8px 3px 0px;
      font-size: 12px;
      color: #007aae;
      //   border: 1px solid #333;
      background-color: #c8ebfa;
      border-radius: 3px;
    }
  }
  .info-personal-money-time {
    width: 100%;
    height: 80px;
    // background-color: cornflowerblue;
    display: flex;
    margin-bottom: 5px;
    .info-personal {
      width: 25%;
      height: 100%;
      // background-color: darkseagreen;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      .info-personal-text {
        width: 100%;
        height: 30px;
        font-size: 12px;
        color: #979797;
        display: flex;
        align-items: flex-end;
        justify-content: center;
      }
      .info-personal-name {
        width: 100%;
        height: 40px;
        font-size: 13px;
        color: #333;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .info-money {
      width: 50%;
      height: 100%;
      // background-color: cadetblue;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      .info-money-text {
        width: 100%;
        height: 30px;
        font-size: 12px;
        color: #979797;
        display: flex;
        align-items: flex-end;
        justify-content: center;
      }
      .info-money-number {
        width: 100%;
        height: 40px;
        font-size: 13px;
        color: #333;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .info-time {
      width: 25%;
      height: 100%;
      // background-color: darkseagreen;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      .info-time-text {
        width: 100%;
        height: 30px;
        font-size: 12px;
        color: #979797;
        display: flex;
        align-items: flex-end;
        justify-content: center;
      }
      .info-time-date {
        width: 100%;
        height: 40px;
        font-size: 13px;
        color: #333;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .info-address-phone-website {
    width: 100%;
    height: 30px;
    // background-color: darksalmon;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-top: 5px;
    box-sizing: border-box;
    border-top: 1px solid #f5f5f5;
    .info-address-text {
      width: calc(100% - 160px);
      height: 30px;
      // background-color: cornflowerblue;
      display: flex;
      align-items: center;
      font-size: 16px;
      .info-address {
        margin-left: 3px;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .info-phone {
      width: 50px;
      height: 20px;
      background-color: #c8ebfa;
      border-radius: 10px;
      font-size: 16px;
      color: #60c5f1;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .info-phone-text {
        font-size: 12px;
      }
      margin-right: 5px;
    }
    .info-website {
      width: 50px;
      height: 20px;
      // background-color: cornflowerblue;
      background-color: #c8ebfa;
      border-radius: 10px;
      font-size: 16px;
      color: #60c5f1;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .info-website-text {
        font-size: 12px;
      }
      margin-right: 5px;
    }
    .info-more {
      width: 50px;
      height: 20px;
      // background-color: cornflowerblue;
      background-color: #c8ebfa;
      border-radius: 10px;
      font-size: 16px;
      color: #60c5f1;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .info-more-text {
        font-size: 12px;
      }
    }
  }
}
.company-menu {
  width: 100%;
  height: auto;
  // background-color: cadetblue;
  background-color: #fff;
  padding: 30px 10px 10px 10px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .company-menu-list {
    width: 33%;
    height: 100px;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #f5f5f5;
    box-sizing: border-box;
  }
  .list-icon {
    width: 100%;
    height: 50px;
    // background-color: chocolate;
    font-size: 30px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  .list-text {
    width: 100%;
    height: 50px;
    // background-color: burlywood;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.company-feedback {
  width: 100%;
  height: 40px;
  // background-color:cadetblue;
  background-color: #fff;
  padding: 0px 10px;
  box-sizing: border-box;
  .feedback-block {
    border-top: 1px solid #f5f5f5;
    font-size: 13px;
    padding: 0px 5px;
    box-sizing: border-box;
    line-height: 40px;
    color: #333;
    display: flex;
    justify-content: space-between;
  }
}
</style>