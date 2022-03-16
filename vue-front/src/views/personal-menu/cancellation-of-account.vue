<template>
  <div class="cancellation-of-account" v-loading='loading'>
    <van-sticky :offset-top="0">
      <van-nav-bar
        left-this.telErrorMessage="返回"
        left-arrow
        @click-left="onClickLeft"
      >
        <template #title>
          <span>注销账号</span>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="img__block">
      <img
        :src="require('@/assets/账号禁用.png')"
        alt="注销账号"
        class="cancellation-of-img"
      />
    </div>
    <div class="cancellation-of-text__block">
      <div class="cancellation-of-block-title">
        <span>注销账号注意事项</span>
      </div>
      <div
        class="cancellation-of-block-list"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <span>{{ item.details }}</span>
      </div>
      <div class="cancellation-of-block-phone">
        <span>客服电话：</span>
        <span style="color: #60c5f1">400-982-2212</span>
      </div>
    </div>
    <div class="bottom-btn">
      <van-button type="info" class="logOut" block @click="onLogOut"
        >注销账号</van-button
      >
    </div>
  </div>
</template>

<script>
import { Toast,Dialog } from "vant";

export default {
  data() {
    return {
      dataList: [
        {
          id: 1,
          details:
            "1.账号一旦注销，您将无法登录和使用该账号，您也就无法以该账号登录使用我们提供的所有产品和服务",
        },
        {
          id: 2,
          details:
            "2.账号注销后，包括但不限于您账号下绑定的用户信息、会员权益、认真信息、关注监控、下载记录、付款记录、会员积分等信息会同步删除且不可找回",
        },
        { id: 3, details: "如果您确实需要注销账号，请拨打客服电话进行处理" },
      ],
      loading:false,
      params:{},
    };
  },
  mounted(){
    this.params.id = localStorage.userid;
  },
  methods: {
    onClickLeft() {
      // Toast("返回");
      this.$router.push("/personal-information");
    },
    onLogOut() {
      console.log("这是注销账号");
      Dialog.confirm({
        title: "",
        message: "确定要注销所登录的账号吗？",
        props: {
          "cancel-button-text": "不,我手滑了",
        },
      })
        .then(() => {
          // on confirm
          this.EditUserAccountStatus();
        })
        .catch(() => {
          // on cancel
        });
    },
    async EditUserAccountStatus() {
      this.loading = true;
      this.userdata = "";
      try {
        var res = await this.$axios.get(`/api/www/EditUserAccountStatus/${this.params.id}`);
        if (res) {
          console.log("res:", res);
          Toast({
            message: res.data.message,
            position: "bottom",
          });
          this.onLogOutFn();
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
    async onLogOutFn() {
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
  background-color: #f2f2ff;
  position: fixed;
  bottom: 10px;
  .logOut {
    color: #333;
    background-color: #f2f2f2;
    border-color: #f2f2f2;
    font-size: 15px;
    letter-spacing: 2px;
  }
}
.cancellation-of-account {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.img__block {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}
.cancellation-of-img {
  // width: 100%;
  height: 200px;
}
.cancellation-of-text__block {
  width: 100%;
  height: 200px;
  // background-color:burlywood;
  padding: 10px;
  box-sizing: border-box;
  .cancellation-of-block-title {
    width: 100%;
    height: 30px;
    // background-color:cadetblue;
    font-size: 15px;
    font-weight: bold;
    color: #333;
    line-height: 30px;
  }
  .cancellation-of-block-list {
    width: 100%;
    height: auto;
    // background-color: darksalmon;
    font-size: 13px;
    color: #bfbfbf;
    margin: 10px 0px;
    line-height: 25px;
  }
  .cancellation-of-block-phone {
    width: 100%;
    height: auto;
    // background-color:darkseagreen;
    font-size: 13px;
    color: #bfbfbf;
  }
}
</style>