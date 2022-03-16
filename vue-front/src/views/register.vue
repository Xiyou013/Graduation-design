<template>
  <div class="register" v-loading="loading">
    <van-nav-bar
      left-this.telErrorMessage="返回"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #title>
        <span>注册</span>
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
        <!-- 输入密码 -->
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          :error-message="passwordErrorMessage"
          @input="fieldFn"
        >
        </van-field>
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
        >完成</van-button
      >
      <div class="login__check">
        <van-checkbox v-model="checked" shape="square" @change="checkboxFn">
          <span class="check-light">注册即同意</span>
          <span class="check-dark">《企业搜索用户协议》</span>
          <span class="check-light">及</span>
          <span class="check-dark">《企业搜索隐私权服务条款》</span>
        </van-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      tel: "",
      password: "",
      email: "",
      checked: false,
      telErrorMessage: "",
      passwordErrorMessage: "",
      emailErrorMessage: "",
      disabled: true,
      loading: false,
    };
  },
  methods: {
    onClickLeft() {
      // Toast("返回");
      this.$router.push("/home");
    },
    fieldFn() {
      console.log(
        "tel:",
        this.tel,
        "password:",
        this.password,
        "email:",
        this.email
      );
      if (this.tel && this.password && this.email) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    loginFn() {
      console.log(
        "这是登录按钮",
        this.checked,
        this.tel,
        this.password,
        this.email
      );
      if (!this.checked) {
        Toast({
          message: "请阅读并同意协议",
          position: "bottom",
        });
      } else {
        this.phonefn(this.tel);
        this.passwordFn(this.password);
        this.emailfn(this.email);
        if (
          this.telErrorMessage === "" &&
          this.passwordErrorMessage === "" &&
          this.emailErrorMessage === ""
        ) {
          this.loginHandler();
        } else {
          Toast({
            message: "手机号/账号或密码错误,请重新输入",
            position: "bottom",
          });
        }
      }
    },
    async loginHandler() {
      try {
        let params = {
          tel: this.tel,
          password: this.password,
          email: this.email,
        };
        console.log("params:", params);

        var res = await this.$axios.post(`/api/www/userRegister`, params);
        if (res) {
          console.log("res:", res);
          Toast({
            message: res.data.data,
            position: "bottom",
          });
          if (res.data.type === "success") {
            setTimeout(() => {
              this.$router.push("/login");
            },0);
          }
        }
      } catch (err) {
        this.$message({
          message: err,
          type: "error",
        });
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
    passwordFn(value) {
      var res = /^[a-zA-Z0-9]{6,12}$/;
      if (value === "") {
        this.passwordErrorMessage = "密码输入为空";
      } else {
        if (res.test(value)) {
          console.log("res1:", value);
          this.passwordErrorMessage = "";
        } else if (value.length < 6 || value.length > 12) {
          this.passwordErrorMessage = "密码长度为6-12位";
        } else {
          this.passwordErrorMessage = "密码格式不正确，6-12为数字或英文";
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register {
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