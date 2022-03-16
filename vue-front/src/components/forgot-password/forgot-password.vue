<template>
  <div class="forgot-password">
    <van-nav-bar
      left-this.telErrorMessage="返回"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #title>
        <span>忘记密码</span>
      </template>
    </van-nav-bar>
    <div class="login__block">
      <van-cell-group>
        <!-- 输入手机号，调起手机号键盘 -->
        <van-field
          v-model="tel"
          type="tel"
          label="手机号"
          placeholder="请输入手机号"
          :error-message="telErrorMessage"
          @input="fieldFn"
        />
        <van-field
          v-model="email"
          label="电子邮箱"
          placeholder="请输入电子邮箱"
          :error-message="emailErrorMessage"
          @input="fieldFn"
        />
      </van-cell-group>
      <van-button
        type="primary"
        block
        color="#1989FA"
        @click="loginFn"
        style="margin-top: 30px"
        :disabled="disabled"
        >下一步</van-button
      >
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      tel: "",
      email: "",
      checked: false,
      telErrorMessage: "",
      emailErrorMessage: "",
      disabled: true,
    };
  },
  methods: {
    onClickLeft() {
      // Toast("返回");
      this.$router.push("/login");
    },
    fieldFn() {
      console.log("tel:", this.tel, "email:", this.email);
      if (this.tel && this.email) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    async loginFn() {
      console.log("这是登录按钮", this.checked, this.tel, this.email);
      this.phonefn(this.tel);
      this.emailfn(this.email);
      if (this.telErrorMessage === "" && this.emailErrorMessage === "") {
        var res = await this.$axios.get(
          `/api/www/userForgotPassword/${this.tel}/${this.email}`
        );
        if (res) {
          console.log("res:", res);

          if (res.data.type && res.data.type === "error") {
            Toast({
              message: "手机号/邮箱错误,请重新输入",
              position: "bottom",
            });
          } else {
            console.log("res111:", res);
            this.$router.push({name: "change-password",params:{id:res.data[0].kjwl_yu_id}});
          }
        }
      }
    },
    checkboxFn() {
      console.log("这是复选框：", this.checked);
    },
    phonefn(value) {
      var res = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
      if (value === "") {
        this.telErrorMessage = "";
      } else {
        if (res.test(value)) {
          console.log("res", value);
          this.telErrorMessage = "";
        } else if (value.length < 0 || value.length > 11) {
          this.telErrorMessage = "电话长度为11位";
        } else {
          this.telErrorMessage = "电话格式不正确";
        }
      }
    },
    emailfn(value) {
      var res = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (value === "") {
        this.emailErrorMessage = "邮箱输入为空";
      } else {
        if (res.test(value)) {
          console.log("res", value);
          this.emailErrorMessage = "";
        } else {
          this.emailErrorMessage = "邮箱格式不正确";
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.forgot-password {
  /* position: relative; */
  width: 100%;
  height: 100%;
  /* background-image: linear-gradient(to top, #000 0%, #0d6ce0 100%); */
  background-color: #ffffff;
  color: #333;
}
.login__block {
  width: 100%;
  height: auto;
  padding: 20px 10px;
  box-sizing: border-box;
  // background-color: cadetblue;
}
.van-cell {
  align-items: center;
}
.login__check {
  width: 100%;
  height: auto;
  // background-color: coral;
  font-size: 13px;
  margin-top: 20px;
  .check-light {
    color: #bfbfbf;
  }
  .check-dark {
    color: #5c5c5c;
  }
}
</style>