<template>
  <div class="opinion" v-loading="loading">
    <van-sticky :offset-top="0">
      <van-nav-bar
        left-this.telErrorMessage="返回"
        left-arrow
        @click-left="onClickLeft"
      >
        <template #title>
          <span>人物纠错反馈</span>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="opinion__block">
      <div class="opinion__block-title">
        <span>请提出您宝贵的意见</span>
      </div>
      <div id="toolbar-container" class="toolbar"></div>
      <div id="opinion__editor" class="opinion__editor"></div>
    </div>
    <div class="user-phone__block">
      <div class="phone-text">
        <span>联系电话</span>
      </div>
      <div class="user-phone">
        <span>{{ userdata.kjwl_yu_phone }}</span>
      </div>
    </div>
    <div class="Tooltip-text">
      <span>我们会及时处理您的反馈，并第一时间给您恢复。<br /></span>
      <span
        >您还可以发送邮件至<span style="color: #333">kefu@qyss.com</span
        >,或拨打客服电话<br /><span style="color: #333"
          >400-928-2212</span
        ></span
      >
    </div>
    <div class="bottom-btn">
      <van-button type="info" block @click="onSubmit">提交反馈</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import E from "wangeditor";

export default {
  data() {
    return {
      editor: "",
      text: "",
      disabled: true,
      params: {},
      userdata: "",
      loading: false,
    };
  },
  mounted() {
    this.refresh();
    console.log("route:", this.$route.params);
    this.params.id = Number(localStorage.userid);
    this.params.personId = this.$route.params.personId;
    this.params.account =
      this.$route.params.account || localStorage.accountdetails;
    console.log("params:", this.params);
    this.getUserdata();
  },
  methods: {
    onClickLeft() {
      // Toast("返回");
      this.$router.push({
        name: "boss-index",
        params: {
          id: this.params.personId,
        },
      });
    },
    async refresh() {
      // this.editor = new E("#opinion__editor");
      this.editor = new E("#toolbar-container", "#opinion__editor");
      this.editor.config.height = 300;
      this.editor.config.zIndex = 1;
      this.editor.config.menus = [
        "bold",
        "head",
        "link",
        "italic",
        "underline",
      ];
      this.editor.create();
      this.text = this.editor.txt.html();
      // console.log("text:",this.text)
    },
    async getUserdata() {
      this.loading = true;
      this.userdata = "";
      try {
        var res = await this.$axios.get(
          `/api/www/getUserdata/${this.params.id}/${this.params.account}`
        );
        if (res) {
          console.log("res:", res);
          this.userdata = res.data;
          this.params.phone = this.userdata.kjwl_yu_phone;
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
    onSubmit() {
      let str = JSON.stringify(this.editor.txt.html());
      console.log("str:", str);
      if (str === '""' || str === null) {
        Toast({
          message: "输入的意见为空无法提交，请重新输入或返回首页",
          position: "bottom",
        });
      } else {
        this.onSubmitFeedback(str);
      }
    },
    async onSubmitFeedback(str) {
      this.loading = true;
      const params = {
        ...this.params,
        content: str,
      };
      console.log("params:", params);

      try {
        var res = await this.$axios.post(`/api/www/AddUserFeedback`, params);
        if (res) {
          console.log("res:", res);
          Toast({
            message: res.data.message,
            position: "bottom",
          });
          this.onClickLeft();
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
.bottom-btn {
  width: 100%;
  height: 55px;
  padding: 5px 10px;
  box-sizing: border-box;
  background-color: #fff;
  position: fixed;
  bottom: 0px;
}
.opinion__block {
  width: 100%;
  height: auto;
  // background-color: burlywood;
  background-color: #fff;
  margin-top: 10px;
  padding: 10px;
  box-sizing: border-box;
  .opinion__block-title {
    font-size: 14px;
    padding: 5px 0px;
    box-sizing: border-box;
  }
  .toolbar {
    font-size: 15px;
  }
  .opinion__editor {
    height: 200px;
  }
}
.user-phone__block {
  width: 100%;
  height: 80px;
  // background-color: burlywood;
  background-color: #fff;
  margin-top: 10px;
  padding: 10px;
  box-sizing: border-box;
  .phone-text {
    width: 100%;
    height: 30px;
    // background-color: cadetblue;
    line-height: 30px;
    font-size: 14px;
    color: #333;
  }
  .user-phone {
    width: 100%;
    height: 30px;
    // background-color:cornflowerblue;
    line-height: 30px;
    font-size: 14px;
    color: #333;
  }
}
.Tooltip-text {
  width: 100%;
  height: auto;
  // background-color: burlywood;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 10px;
  font-size: 13px;
  color: #bfbfbf;
}
</style>