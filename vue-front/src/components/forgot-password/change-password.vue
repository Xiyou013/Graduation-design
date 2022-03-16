<template>
  <div class="forgot-password">
    <van-nav-bar
      left-this.telErrorMessage="返回"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #title>
        <span>确认密码</span>
      </template>
    </van-nav-bar>
    <div class="login__block">
      <van-cell-group>
        <!-- 第一次输入密码 -->
        <van-field
          v-model="newPassword"
          type="password"
          label="新密码"
          placeholder="请输入密码"
          :error-message="newPasswordErrorMessage"
          @input="fieldFn"
        >
        </van-field>
        <!-- 第二次输入密码 -->
        <van-field
          v-model="password"
          type="password"
          label="再次确认密码"
          placeholder="请输入密码"
          :error-message="passwordErrorMessage"
          @input="fieldFn"
        >
        </van-field>
      </van-cell-group>
      <van-button
        type="primary"
        block
        color="#1989FA"
        @click="loginFn"
        style="margin-top: 30px"
        :disabled="disabled"
        >确认密码</van-button
      >
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
const passwordErrorEnum = {
  newPasswordErrorMessage: 1,
  passwordErrorMessage: 2,
};
export default {
  data() {
    return {
      newPassword: "",
      password: "",
      newPasswordErrorMessage: "",
      passwordErrorMessage: "",
      disabled: true,
      id: null,
    };
  },
  mounted() {
    console.log("router:", this.$route.params);
    this.id = this.$route.params.id;
  },
  methods: {
    onClickLeft() {
      // Toast("返回");
      this.$router.push("/forgot-password");
    },
    fieldFn() {
      console.log("newPassword:", this.newPassword, "password:", this.password);
      if (this.newPassword && this.password) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    async loginFn() {
      let params = {
        id: this.id,
        password: this.newPassword,
      };
      console.log("params:", params);
      console.log(
        "这是登录按钮",
        this.checked,
        this.newPassword,
        this.password
      );
      this.passwordFn(
        this.newPassword,
        passwordErrorEnum.newPasswordErrorMessage
      );
      this.passwordFn(this.password, passwordErrorEnum.passwordErrorMessage);
      if (
        this.newPasswordErrorMessage === "" &&
        this.passwordErrorMessage === ""
      ) {
        console.log("这是登录按钮", this.newPassword, this.password);
        if (this.newPassword === this.password) {
          var res = await this.$axios.post(
            `/api/www/userChangePassword`,
            params
          );
          if (res) {
            console.log("res:", res);
            Toast({
              message: "密码一致修改成功",
              position: "bottom",
            });
            setTimeout(() => {
              this.$router.push("/login");
            },0);
          }
        } else {
          Toast({
            message: "密码不一致,请重新输入",
            position: "bottom",
          });
        }
      }
    },
    passwordFn(value, num) {
      let textOne = "密码输入为空";
      let textTwo = "密码长度为6-12位";
      let textThree = "密码格式不正确，6-12为数字或英文";
      var res = /^[a-zA-Z0-9]{6,12}$/;
      if (value === "") {
        num === passwordErrorEnum.newPasswordErrorMessage
          ? (this.newPasswordErrorMessage = textOne)
          : num === passwordErrorEnum.passwordErrorMessage
          ? (this.passwordErrorMessage = textOne)
          : "";
      } else {
        if (res.test(value)) {
          console.log("res1:", value);
          num === passwordErrorEnum.newPasswordErrorMessage
            ? (this.newPasswordErrorMessage = "")
            : num === passwordErrorEnum.passwordErrorMessage
            ? (this.passwordErrorMessage = "")
            : "";
        } else if (value.length < 6 || value.length > 12) {
          num === passwordErrorEnum.newPasswordErrorMessage
            ? (this.newPasswordErrorMessage = textTwo)
            : num === passwordErrorEnum.passwordErrorMessage
            ? (this.passwordErrorMessage = textTwo)
            : "";
        } else {
          num === passwordErrorEnum.newPasswordErrorMessage
            ? (this.newPasswordErrorMessage = textThree)
            : num === passwordErrorEnum.passwordErrorMessage
            ? (this.passwordErrorMessage = textThree)
            : "";
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