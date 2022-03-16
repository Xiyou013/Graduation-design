<template>
  <div id="login">
    <div class="login__navbar">
      <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        ref="navbar"
      >
        <template #title>
          <span>密码登录</span>
        </template>
        <template #right>
          <span class="login__navbar-right">注册</span>
        </template>
      </van-nav-bar>
    </div>

    <div class="login__block">
      <van-cell-group>
        <!-- 输入手机号，调起手机号键盘 -->
        <van-field
          v-model="tel"
          type="tel"
          label="手机号/账号"
          placeholder="请输入手机号/账号"
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
          <template #button>
            <el-button type="text" @click="forgotPassword">忘记密码?</el-button>
          </template>
        </van-field>
      </van-cell-group>
      <van-button
        type="primary"
        block
        color="#1989FA"
        @click="loginFn"
        style="margin-top: 30px"
        :disabled="disabled"
        >登录</van-button
      >
      <div class="login__check">
        <van-checkbox v-model="checked" shape="square" @change="checkboxFn">
          <span class="check-light">登录即同意</span>
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
// import api from "@/utils/api.js";

export default {
  data() {
    return {
      tel: "",
      password: "",
      checked: false,
      telErrorMessage: "",
      passwordErrorMessage: "",
      disabled: true,
      data: null,
    };
  },
  mounted() {},
  methods: {
    onClickLeft() {
      // Toast("返回");
      this.$router.push("/home");
    },
    onClickRight() {
      // Toast("按钮");
      this.$router.push("/register");
    },
    fieldFn() {
      console.log("tel:", this.tel, "password:", this.password);
      if (this.tel && this.password) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    forgotPassword() {
      console.log("忘记密码");
      this.$router.push("/forgot-password");
    },
    loginFn() {
      console.log("这是登录按钮", this.checked, this.tel, this.password);
      this.passwordFn(this.password);
      // this.phoneFn(this.tel);
      if (!this.checked) {
        Toast({
          message: "请阅读并同意协议",
          position: "bottom",
        });
      } else {
        if (this.telErrorMessage != "" || this.passwordErrorMessage != "") {
          Toast({
            message: "手机号/账号或密码错误,请重新输入",
            position: "bottom",
          });
        } else {
          this.loginHandler();
        }
      }
    },
    checkboxFn() {
      console.log("这是复选框：", this.checked);
    },
    //生成token
    getRnadomFiveInt() {
      //创建空数组
      var temp = [];
      //for循环来生成随机五个数组元素，有可能是五个||四个||其他
      for (var i = 0; i < 5; i++) {
        //生成一个random_int的变量来存放0-9的随机数
        var random_int = parseInt(Math.random() * 10);
        //如果这个数组为0位||生成的随机数为0，返回函数，利用递归来继续循环
        if (i === 0 && random_int === 0) {
          return this.getRnadomFiveInt();
        }
        //在temp空数组中添加随机数
        temp.push(random_int);
      }
      //输出数组，数组长度，并且输出数组的每一位
      console.log(temp, temp.length, temp.join(""));
      return temp.join("");
    },

    async loginHandler() {
      try {
        var res = await this.$axios.get(
          `/api/www/userLogin/${this.tel}/${this.password}`
        );
        if (res) {
          console.log("res:", res);
          if (res.data.length === 0) {
            Toast({
              message: "用户不存在哦",
              position: "bottom",
            });
          } else if (res.data.length > 0) {
            var {
              kjwl_yu_account,
              kjwl_yu_name,
              kjwl_yu_portrait,
              kjwl_yu_privilege,
              kjwl_yu_id,
            } = res.data[0];
            var str = this.getRnadomFiveInt();
            console.log(str);
            localStorage.setItem("token", str);
            localStorage.setItem("accountdetails", kjwl_yu_account);
            localStorage.setItem("loginstatus", kjwl_yu_privilege);
            localStorage.setItem("username", kjwl_yu_name);
            localStorage.setItem("userportrait", kjwl_yu_portrait);
            localStorage.setItem("userid", kjwl_yu_id);
            this.$store.commit("LOGINSTATUS", kjwl_yu_privilege);
            this.$store.commit("SET_USER", res.data[0]);
            this.$store.commit("TOKENSTATUS", localStorage.token);
            this.$store.commit("SET_PROTRAIT", kjwl_yu_portrait);
            console.log("123", this.$store);
            var {
              state: { tokenStatus, loginStatus, user },
            } = this.$store;
            console.log(tokenStatus, loginStatus, user);
            this.$router.push("/home");
          }
        }
      } catch (err) {
        this.$message({
          message: err,
          type: "error",
        });
      }
    },
    passwordFn(value) {
      let textOne = "密码输入为空";
      let textTwo = "密码长度为6-12位";
      let textThree = "密码格式不正确，6-12为数字或英文";
      var res = /^[a-zA-Z0-9]{6,12}$/;
      if (value === "") {
        this.passwordErrorMessage = textOne;
      } else {
        if (res.test(value)) {
          console.log("res1:", value);
          this.passwordErrorMessage = "";
        } else if (value.length < 6 || value.length > 12) {
          this.passwordErrorMessage = textTwo;
        } else {
          this.passwordErrorMessage = textThree;
        }
      }
    },
    phoneFn(value) {
      let textOne = "手机号码输入为空";
      let textTwo = "手机号码长度为11位";
      let textThree = "手机号码格式不正确";
      var res = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
      if (value === "") {
        this.telErrorMessage = textOne;
      } else {
        if (res.test(value)) {
          console.log("res1:", value);
          this.telErrorMessage = "";
        } else if (value.length != 11) {
          this.telErrorMessage = textTwo;
        } else {
          this.telErrorMessage = textThree;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
#login {
  /* position: relative; */
  width: 100%;
  height: 100%;
  /* background-image: linear-gradient(to top, #000 0%, #0d6ce0 100%); */
  background-color: #ffffff;
  color: #333;
}
.login__navbar {
  width: 100%;
  height: auto;
  background-color: cornflowerblue;
}
.login__navbar-right {
  color: #1989fa;
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