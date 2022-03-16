<template>
  <div class="personal-center" v-loading="loading">
    <div class="personal__top">
      <div class="personal-content">
        <div class="personal-info">
          <img
            :src="params.protrait"
            alt="头像"
            class="info-portrait"
            @click="onChangePersonalInfo"
          />
          <div class="info-nickname-level">
            <span class="info-nickname" @click="onChangePersonalInfo">{{
              params.name
            }}</span>
            <div class="info-level">
              <img src="../assets/vip.png" alt="vip" class="info-vip" />
              <span>{{
                params.loginStatus == "2" ? "vip会员" : "普通会员"
              }}</span>
            </div>
          </div>
        </div>
        <van-icon name="setting" @click="onChangePersonalInfo" />
      </div>
      <div class="personal-businessCard">
        <!-- <span>这是名片信息七八九十一二三四五六七八九十一二三四五六七八</span> -->
        <span>{{userdata.kjwl_yu_signature}}</span>
      </div>
      <!-- <div class="personal-vip">
        <div class="personal-vip-animation"></div>
        <div class="vip-text">
          <span>会员中心</span>
        </div>
        <div class="vip-info">
          <span
            >每天仅0.65元 享查老板等<span class="vip-info-text">33</span
            >项会员特权</span
          >
        </div>
      </div> -->
      <!-- <div class="vip-purchase">
        <div class="vip-purchase-circle"></div>
        <img src="../assets/vip.png" alt="vip" class="vip-image" />
        <span class="vip-purchase-text">立即开通</span>
      </div> -->
    </div>
    <div class="personal-menu">
      <div
        class="personal-menu-content"
        v-for="(item, index) in dataList"
        :key="index"
        @click="onClickMenu(item)"
      >
        <div class="personal-menu-title">
          <van-icon :name="item.icon" />
          <span class="title-text">{{ item.title }}</span>
        </div>
        <van-icon name="arrow" />
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
  </div>
</template>

<script>
// import { Notify } from "vant";
export default {
  data() {
    return {
      dataList: [
        { id: 1, icon: "star", title: "我的收藏", path: "collection-index" },
        {
          id: 2,
          icon: "comment",
          title: "意见反馈",
          path: "opinion-index",
        },
        { id: 3, icon: "phone", title: "联系我们", path: "contact-index" },
        { id: 4, icon: "smile", title: "用户帮助", path: "assist-index" },
      ],
      params: {},
      loading: false,
      userdata:'',
    };
  },
  mounted() {
    localStorage.setItem("keywordType", false);
    var {
      state: { tokenStatus, loginStatus, user, protrait },
    } = this.$store;
    console.log("wwwwww", this.$store.state);
    console.log(tokenStatus, loginStatus, user, protrait);
    this.params = { ...user, loginStatus, protrait,name:localStorage.username };
    console.log("params:", this.params);
    this.getUserdata();
  },
  methods: {
    onChange(index) {
      console.log("index:", index);
      // Notify({ type: "primary", message: index });
    },
    onClickMenu(item) {
      console.log("item:", item);
      this.$router.push({
        name: item.path,
        params:{id:this.params.id || this.params.kjwl_yu_id,tel:this.userdata.kjwl_yu_phone,account:this.params.account || this.params.kjwl_yu_account}
      });
    },
    onChangePersonalInfo() {
      this.$router.push({
        path: "/personal-information",
      });
    },
    async getUserdata() {
      this.loading = true;
      this.userdata = '';
      try {
        var res = await this.$axios.get(`/api/www/getUserdata/${this.params.id || this.params.kjwl_yu_id}/${this.params.account || this.params.kjwl_yu_account}`);
        if (res) {
          console.log("res:", res);
          this.userdata = res.data;
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
.personal__top {
  width: 100%;
  height: 150px;
  background-color: #0d6ce0;
  // display: flex;
  // flex-wrap: wrap;
  padding: 10px;
  box-sizing: border-box;
  color: #333;
  .personal-content {
    width: 100%;
    height: 50px;
    // background-color: burlywood;
    margin: 10px 0px 10px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    .personal-info {
      width: 100%;
      height: 50px;
      // background-color: darksalmon;
      display: flex;
      .info-portrait {
        width: 50px;
        height: 50px;
        background-color: #ffffff;
        border-radius: 10px;
      }
      .info-nickname-level {
        width: 100%;
        height: 50px;
        // background-color: darkseagreen;
        padding-left: 8px;
        box-sizing: border-box;
        .info-nickname {
          height: 25px;
          display: block;
          font-size: 15px;
          font-weight: bold;
          line-height: 25px;
        }
        .info-level {
          height: 25px;
          display: flex;
          font-size: 14px;
          line-height: 25px;
          .info-vip {
            width: 22px;
            height: 22px;
          }
        }
      }
    }
  }
  .personal-businessCard {
    width: 100%;
    height: 30px;
    // background-color: cadetblue;
    line-height: 30px;
    font-size: 13px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .personal-vip {
    width: 94%;
    height: 50px;
    background-color: #f5d0a6;
    margin-left: 3%;
    margin-top: 15px;
    border-radius: 5px;
    position: relative;
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: flex-end;
    .vip-text {
      width: 100%;
      height: 25px;
      // background-color: darkseagreen;
      font-size: 14px;
      font-weight: bold;
      line-height: 25px;
      color: #78461a;
      padding-left: 8px;
      box-sizing: border-box;
      position: absolute;
      top: 0px;
      margin-top: 0px;
    }
    .vip-info {
      width: 100%;
      height: 25px;
      // background-color: darkseagreen;
      font-size: 12px;
      line-height: 25px;
      color: #6f4c23;
      padding-left: 8px;
      box-sizing: border-box;
      position: absolute;
      top: 0px;
      margin-top: 25px;
      .vip-info-text {
        font-size: 14px;
        font-weight: bold;
        color: #78461a;
      }
    }
  }
  .personal-vip-animation {
    width: 0px;
    height: 0px;
    /* background-color: #fff; */
    //  background-color: cornflowerblue;
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(242, 242, 242, 1)
    );
    position: absolute;
    transform: rotate(30deg) skew(0deg, -30deg);
    margin-left: 0px;
    margin-top: -5px;
    animation-name: myfirst;
    animation-duration: 1.5s;
    animation-timing-function: linear;
    animation-delay: 2s;
    animation-iteration-count: infinite;
    animation-play-state: running;
    z-index: 100;
    box-sizing: border-box;
  }
  @keyframes myfirst {
    0% {
      left: 0%;
      top: 5px;
      width: 0px;
      height: 0px;
      border-radius: 100%;
    }

    25% {
      left: 0%;
      top: 0px;
      width: 15px;
      height: 60px;
      border-radius: 0%;
    }

    75% {
      left: 90%;
      top: 0px;
      width: 15px;
      height: 60px;
      border-radius: 0%;
    }

    100% {
      left: 105%;
      top: 70px;
      width: 0px;
      height: 0px;
      border-radius: 100%;
    }
  }
  .vip-purchase {
    width: 75px;
    height: 25px;
    background-color: #3a4060;
    display: flex;
    align-items: center;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    position: relative;
    left: calc(100% - 80px);
    margin-top: -37px;
    .vip-purchase-circle {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: #3a4060;
      // background-color: #f5d0a6;
      margin-left: -12.5px;
      flex-shrink: 0;
    }
    .vip-image {
      width: 20px;
      height: 20px;
      margin-left: -16px;
    }
    .vip-purchase-text {
      display: block;
      font-size: 13px;
      color: #fff5e5;
      // margin-left: 3px;
    }
  }
}
.personal-menu {
  width: 100%;
  height: auto;
  // background-color: cornflowerblue;
  overflow: hidden;
  margin-top: 35px;
  padding: 10px;
  box-sizing: border-box;
  .personal-menu-content {
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
    align-items: center;
    border-radius: 5px;
    font-size: 20px;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  .personal-menu-title {
    width: 100%;
    height: 50px;
    // background-color: darksalmon;
    display: flex;
    align-items: center;
  }
  .title-text {
    display: block;
    margin-left: 5px;
    font-size: 14px;
    color: #333;
  }
}
</style>