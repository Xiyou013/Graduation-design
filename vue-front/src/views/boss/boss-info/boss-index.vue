<template>
  <div class="boss" v-loading="loading">
    <van-sticky :offset-top="0">
      <van-nav-bar title="人物" left-arrow @click-left="onClickLeft">
        <template #right>
          <div class="boss-index-nav">
            <van-icon name="search" @click="onClickSearch" />
            <!-- <van-icon name="share" @click="showShareFn" /> -->
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>

    <div class="boss__block">
      <div class="boss-info">
        <div class="info-image-name">
          <div class="info-block">
            <img
              :src="dataList.kjwl_p_portrait"
              :alt="dataList.kjwl_p_name"
              class="info-img"
            />
            <span class="info-text">{{ dataList.kjwl_p_name }}</span>
          </div>
          <div class="info-focus">
            <span
              v-if="dataList.focus === 0"
              @click.stop="onCollectPerson(dataList)"
              >+ <span>关注</span></span
            >
            <span v-if="dataList.focus === 1">已关注</span>
          </div>
        </div>
        <div class="info-introduction" @click.stop="toResume(dataList)">
          <span class="introduction-text">
            <span style="color: #bfbfbf">简介：</span>
            <!-- <span class="introduction-text"> -->
            {{ dataList.kjwl_p_resume }}
            <!-- </span> -->
          </span>
          <!-- <span class="introduction-icon" style="color: #54c1f0">
            &nbsp;更多<van-icon name="arrow" />
          </span> -->
        </div>
      </div>
      <div class="boss-menu">
        <div
          class="boss-menu-list"
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
          <div class="feedback-div feedback-title">人物纠错反馈</div>
          <div class="feedback-div"><van-icon name="arrow" /></div>
        </div>
      </div>
      <div class="boss-company-list">
        <div
          class="company-list"
          v-for="(item, index) in dataList.company"
          :key="index"
          @click="onCompanyIndex(item)"
        >
          <div class="list-image-name">
            <div class="list-block">
              <img
                :src="item.kjwl_e_portrait"
                :alt="item.kjwl_e_name"
                class="list-img"
              />
              <span class="list-text">{{ item.kjwl_e_name }}</span>
            </div>
            <div class="list-focus">
              <span v-if="item.focus === 0" @click.stop="onCollectCompany(item)"
                >+ <span>关注</span></span
              >
              <span v-if="item.focus === 1">已关注</span>
            </div>
          </div>
          <div class="list-personal-money-time">
            <div class="list-personal">
              <div class="list-personal-text">
                <span>法定代表人</span>
              </div>
              <div class="list-personal-name">
                <!-- @click.stop="onPersonal(item)" -->
                <span>{{ item.kjwl_e_lrpeople }}</span>
              </div>
            </div>
            <div class="list-money">
              <div class="list-money-text">
                <span>注册资本</span>
              </div>
              <div class="list-money-number">
                <span>{{ item.kjwl_e_regcapital }}</span>
                <span>万元人民币</span>
              </div>
            </div>
            <div class="list-time">
              <div class="list-time-text">
                <span>成立日期</span>
              </div>
              <div class="list-time-date">
                <span>{{ item.kjwl_e_setdate }}</span>
              </div>
            </div>
          </div>
          <!-- <div class="list-address-phone-website">
            <div class="list-address-text">
              <van-icon name="location-o" color="#60C5F1" />
              <span class="list-address">{{ item.address }}</span>
            </div>
            <div class="list-phone">
              <van-icon name="phone-o" color="#60C5F1" />
              <span class="list-phone-text">电话</span>
            </div>
            <div class="list-website" @click.stop="onWebsite(item)">
              <van-icon name="shield-o" color="#60C5F1" />
              <span class="list-website-text">网址</span>
            </div>
          </div> -->
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
      dataList: {},
      menuList: [
        { id: 1, iconName: "orders-o", iconText: "人物百科" },
        { id: 2, iconName: "friends-o", iconText: "合作伙伴" },
        { id: 3, iconName: "newspaper-o", iconText: "新闻舆情" },
      ],
      companyList: [],
      companyData: "",
      personId: "",
      personData: "",
      companyId: "",
      active: "",
    };
  },
  mounted() {
    console.log("route:", this.$route.params);
    this.personId = this.$route.params.personId;
    this.companyId = this.$route.params.companyId;
    this.personData = this.$route.params.personData;
    this.id = this.$route.params.id || this.personId;
    this.active = this.$route.params.active;

    this.userid = localStorage.userid;
    this.companyData = this.$route.params.data;
    this.persontype =
      this.$route.params.persontype || variableEnum.personKeyType.search;
    this.newsId = this.$route.params.newsId;
    this.getPersonData();
  },
  methods: {
    onChange(index) {
      console.log("index:", index);
      // Notify({ type: "primary", message: index });
    },
    onClickLeft() {
      // Toast("返回");
      switch (this.persontype) {
        case variableEnum.personKeyType.newIndex:
          this.$router.push({
            name: "news-index",
            params: { id: this.newsId },
          });
          break;
        case variableEnum.personKeyType.boss_search:
          this.$router.push("/boss-search");
          break;
        case variableEnum.personKeyType.search:
          this.$router.push("/search");
          break;
        case variableEnum.personKeyType.main_satff:
          this.$router.push({
            name: "main-staff",
            params: { data: this.companyData },
          });
          break;
        case variableEnum.personKeyType.partners:
          this.$router.push({
            name: "partners",
            params: { data: this.personData, id: this.personData.kjwl_p_id },
          });
          break;
        case variableEnum.personKeyType.company_index:
          this.$router.push({
            name: "company-index",
            params: { id: this.companyId },
          });
          break;
        case variableEnum.personKeyType.business_information:
          this.$router.push({
            name: "business-information",
            params: { data: this.companyData },
          });
          break;
        case variableEnum.personKeyType.collection_index:
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
    toFeedback() {
      this.$router.push({
        name: "boss-feedback",
        params: {
          personId: this.dataList.kjwl_p_id,
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
    onMenuList(item) {
      console.log("item-menu:", item);
      let url =
        item.id === 1
          ? "figure-encyclopedia"
          : item.id === 2
          ? "partners"
          : "boss-news-opinion";
      this.$router.push({
        name: url,
        params: { data: this.dataList, id: this.dataList.kjwl_p_id },
      });
    },
    onCompanyIndex(item) {
      console.log("item:", item);
      this.$router.push({
        name: "company-index",
        params: {
          id: item.kjwl_e_id,
          companytype: variableEnum.companyKeyType.boss_index,
          personId: this.id,
        },
      });
    },
    onPersonal(item) {
      console.log("item-personal:", item);
      this.$router.push("/kong-index");
    },
    toResume(item) {
      console.log("item-resume:", item);
      this.$router.push({
        name: "figure-encyclopedia",
        params: { id: item.kjwl_p_id, data: this.dataList },
      });
    },
    async getPersonData() {
      this.loading = true;
      console.log("id:", this.id);
      try {
        var res = await this.$axios.get(
          `/api/www/getPersonData/${this.id}/${this.userid}`
        );
        if (res) {
          console.log("getPersonData:", res);
          this.dataList = res.data;
          this.dataList.kjwl_p_resume = this.dataList.kjwl_p_resume.substring(
            4,
            this.dataList.kjwl_p_resume.length - 5
          );
          this.dataList.kjwl_p_event = this.dataList.kjwl_p_event.substring(
            4,
            this.dataList.kjwl_p_event.length - 5
          );
          this.dataList.kjwl_p_experience = JSON.parse(
            this.dataList.kjwl_p_experience
          );
          this.dataList.kjwl_p_record = JSON.parse(this.dataList.kjwl_p_record);
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
    async onCollectPerson(item) {
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
          this.getPersonData();
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
      console.log("item-cp:", item);
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
          this.getPersonData();
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
.boss-index-nav {
  width: 50px;
  height: auto;
  //   background-color: burlywood;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
}
.boss__block {
  width: 100%;
  height: auto;
  // background-color: burlywood;
  padding-bottom: 50px;
}
.boss-info {
  width: 100%;
  height: auto;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  //   background-color: coral;
}
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
.info-introduction {
  width: 100%;
  height: auto;
  // background-color: cadetblue;
  font-size: 12px;
  margin-top: 10px;
  .introduction-text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    //（行数）
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-align: justify;
    letter-spacing: 1px;
  }
  .introduction-icon {
    display: block;
    width: auto;
    // background-color: darkseagreen;
    text-align: right;
  }
}
.boss-menu {
  width: 100%;
  height: auto;
  // background-color: cadetblue;
  background-color: #fff;
  padding: 20px 10px 10px 10px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .boss-menu-list {
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
.boss-company-list {
  width: 100%;
  height: auto;
  margin-top: 10px;
  // background-color: burlywood;
}
.company-list {
  width: 100%;
  height: 160px;
  // background-color: cadetblue;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 8px;
  padding: 0px 10px;
  box-sizing: border-box;
}
.list-image-name {
  width: 100%;
  height: 50px;
  // background-color: coral;
  font-size: 14px;
  display: flex;
  align-items: center;
  .list-block {
    width: 100%;
    height: 50px;
    // background-color: darkseagreen;
    display: flex;
    align-items: center;
    .list-img {
      width: 35px;
      height: 35px;
      background-color: #fff;
      border-radius: 3px;
      border: 1px solid #f1f1f1;
      object-fit: contain;
    }
    .list-text {
      color: #333;
      margin-left: 5px;
    }
  }
  .list-focus {
    width: 50px;
    height: 20px;
    border: 1px solid #0fa6d8;
    font-size: 12px;
    color: #0fa6d8;
    text-align: center;
    border-radius: 3px;
  }
}
.list-personal-money-time {
  width: 100%;
  height: 50px;
  // background-color: cornflowerblue;
  display: flex;
  .list-personal {
    width: 25%;
    height: 100%;
    // background-color: darkseagreen;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .list-personal-text {
      width: 100%;
      height: 25px;
      font-size: 12px;
      color: #979797;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .list-personal-name {
      width: 100%;
      height: 25px;
      font-size: 13px;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .list-money {
    width: 50%;
    height: 100%;
    // background-color: cadetblue;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .list-money-text {
      width: 100%;
      height: 25px;
      font-size: 12px;
      color: #979797;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .list-money-number {
      width: 100%;
      height: 25px;
      font-size: 13px;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .list-time {
    width: 25%;
    height: 100%;
    // background-color: darkseagreen;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .list-time-text {
      width: 100%;
      height: 25px;
      font-size: 12px;
      color: #979797;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .list-time-date {
      width: 100%;
      height: 25px;
      font-size: 13px;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.list-address-phone-website {
  width: 100%;
  height: 30px;
  // background-color: darksalmon;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-top: 1px solid #f5f5f5;
  .list-address-text {
    width: calc(100% - 100px);
    height: 30px;
    // background-color: cornflowerblue;
    display: flex;
    align-items: center;
    font-size: 16px;
    .list-address {
      margin-left: 3px;
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .list-phone {
    width: 50px;
    height: 20px;
    background-color: #c8ebfa;
    border-radius: 10px;
    font-size: 16px;
    color: #60c5f1;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .list-phone-text {
      font-size: 12px;
    }
  }
  .list-website {
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
    .list-website-text {
      font-size: 12px;
    }
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