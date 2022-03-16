<template>
  <div class="personal-information">
    <van-sticky :offset-top="0">
      <van-nav-bar
        left-this.telErrorMessage="返回"
        left-arrow
        @click-left="onClickLeft"
      >
        <template #title>
          <span>个人信息</span>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="user-portrait-nickname">
      <div
        class="user-portrait__block"
        @click="
          onChangePage('头像', variableEnum.modifyInformationEnum.portrait)
        "
      >
        <div class="user-portrait">
          <span>头像</span>
          <img :src="userdata.kjwl_yu_portrait" alt="" class="portrait-img" />
        </div>
        <van-icon name="arrow" color="#BFBFBF" />
      </div>
      <div
        class="user-nickname__block"
        @click="
          onChangePage('昵称', variableEnum.modifyInformationEnum.nickname)
        "
      >
        <div class="user-nickname">
          <span>昵称</span>
          <span style="color: #bfbfbf">{{ userdata.kjwl_yu_name }}</span>
        </div>
        <van-icon name="arrow" color="#BFBFBF" />
      </div>
    </div>
    <div class="user-phone-email-card">
      <div
        class="user-phone__block"
        @click="
          onChangePage('手机号码', variableEnum.modifyInformationEnum.phone)
        "
      >
        <div class="user-phone">
          <span>手机号码</span>
          <span style="color: #bfbfbf">{{ userdata.kjwl_yu_phone }}</span>
        </div>
        <van-icon name="arrow" color="#BFBFBF" />
      </div>
      <div
        class="user-email__block"
        @click="onChangePage('邮箱', variableEnum.modifyInformationEnum.email)"
      >
        <div class="user-email">
          <span>邮箱</span>
          <span style="color: #bfbfbf">{{ userdata.kjwl_yu_email }}</span>
        </div>
        <van-icon name="arrow" color="#BFBFBF" />
      </div>
      <div
        class="user-card__block"
        @click="onChangePage('名片', variableEnum.modifyInformationEnum.card)"
      >
        <div class="user-card">
          <span>名片</span>
        </div>
        <van-icon name="arrow" color="#BFBFBF" />
      </div>
    </div>
    <div
      class="cancellation-of-account"
      @click="onSwitchPage('/cancellation-of-account')"
    >
      <div class="cancellation-of-account__block">
        <div class="user-cancellation-of-account">
          <span>注销账号</span>
        </div>
        <van-icon name="arrow" color="#BFBFBF" />
      </div>
    </div>
    <div class="bottom-btn">
      <van-button type="info" class="logOut" block @click="onLogOut"
        >退出登录</van-button
      >
    </div>
  </div>
</template>

<script>
import variableEnum from "@/utils/variableEnum.js";
import { Dialog } from "vant";

export default {
  data() {
    return {
      variableEnum,
      userdata: "",
      params: {},
    };
  },
  mounted() {
    var {
      state: { tokenStatus, loginStatus, user, protrait },
    } = this.$store;
    console.log("wwwwww", this.$store.state);
    console.log(tokenStatus, loginStatus, user, protrait);
    this.params = { ...user, loginStatus, protrait };
    console.log("params:", this.params);
    this.getUserdata();
  },
  methods: {
    onClickLeft() {
      // Toast("返回");
      this.$router.push("/personal-center");
    },
    onLogOut() {
      console.log("这是退出登录");
      Dialog.confirm({
        title: "",
        message: "确定要退出所登录的账号吗？",
        props:{
          'cancel-button-text':'不,我手滑了'
        }
      })
        .then(() => {
          // on confirm
          this.onLogOutFn();
        })
        .catch(() => {
          // on cancel
        });
    },
    onSwitchPage(url) {
      // Toast("返回");
      this.$router.push(url);
    },
    onChangePage(title, type) {
      this.$router.push({
        name: "/modify-information",
        params: {
          title,
          type,
        },
      });
    },
    async getUserdata() {
      this.loading = true;
      this.userdata = "";
      try {
        var res = await this.$axios.get(
          `/api/www/getUserdata/${this.params.id || this.params.kjwl_yu_id}/${this.params.account || this.params.kjwl_yu_account}`
        );
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
    async onLogOutFn(){
      localStorage.clear();
      location.reload();
    },
  },
};
</script>

<style lang="less" scoped>
.bottom-btn {
  width: 100%;
  height: 55px;
  padding: 5px 10px;
  box-sizing: border-box;
  background-color: #fff;
  position: fixed;
  bottom: 0px;
  .logOut {
    color: #333;
    background-color: #fff;
    border-color: #fff;
    font-size: 15px;
    letter-spacing: 2px;
  }
}
.user-portrait-nickname,
.user-phone-email-card,
.cancellation-of-account {
  width: 100%;
  height: auto;
  //   background-color: burlywood;
  background-color: #fff;
  padding: 0px 10px;
  box-sizing: border-box;
  margin-top: 10px;
}
.user-portrait {
  width: 100%;
  height: 60px;
  // background-color: cornflowerblue;
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f9f9f9;
  .portrait-img {
    width: 40px;
    height: 40px;
    background-color: #fff;
  }
}
.user-portrait__block,
.user-nickname__block,
.user-phone__block,
.user-email__block,
.user-card__block,
.cancellation-of-account__block {
  width: 100%;
  height: auto;
  //   background-color: cadetblue;
  display: flex;
  align-items: center;
  font-size: 18px;
  .user-nickname,
  .user-phone,
  .user-email,
  .user-card,
  .user-cancellation-of-account {
    width: 100%;
    height: 40px;
    // background-color: cornflowerblue;
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f9f9f9;
  }
}
</style>