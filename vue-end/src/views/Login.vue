<template>
  <div id="div1">
    <div id="login" ref="logindiv">
      <div id="logo">
        <img class="img1top" src="../assets/企业搜索3.png" alt="" />
      </div>
      <div class="tit t1">
        {{ name }}
      </div>
      <div class="tit">
        <input
          class="input1"
          type="text"
          name="useraccount"
          v-model="useraccount"
          @blur="useraccountjy"
          placeholder="请输入账号"
        />
      </div>
      <div class="d1">
        {{ uaccount }}
      </div>
      <div class="tit">
        <input
          class="input1"
          type="password"
          name="userpassword"
          v-model="userpassword"
          @blur="passwordjy"
          placeholder="请输入密码"
        />
      </div>
      <div class="d1">
        {{ upassword }}
      </div>
      <div class="tit">
        <el-select
          class="sel"
          v-model="value"
          @change="valchange(value)"
          clearable
          placeholder="请选择登录身份"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="tit t2">
        <div id="sublogin" @click="loginHandler()">登录</div>
      </div>
    </div>
    <div id="imgbottom">
      <img src="@/assets/logindi.jpg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  // inject:['reload'],
  // inject:['routerRefresh'],

  data() {
    return {
      name: "企业信息后台管理系统",
      useraccount: "",
      userpassword: "",
      uaccount: "",
      upassword: "",
      options: [
        {
          value: 1,
          label: "管理员",
        },
        {
          value: 2,
          label: "超级管理员",
        },
      ],
      value: "",
      loginstatus: 0,
      loginuser: {
        account: "",
        name: "",
        id: "",
      },
      timer: true,
    };
  },
  mounted() {
    this.loginAnimation();
  },
  methods: {
    loginAnimation() {
      let topHeight = 950;
      var statues = true;
      //   var timer = 0;
      var timer1 = 0;
      if (topHeight >= 950) {
        if (statues == true) {
          clearInterval(timer1);
          //   this.$refs.logindiv.style.top = topHeight - 5 + "px";
          //   console.log("123:", this.$refs.logindiv.style.top, topHeight);
          timer1 = setInterval(() => {
            if (topHeight === -90) {
              clearInterval(timer1);
              return;
            }
            this.$refs.logindiv.style.top = topHeight - 5 + "px";
            topHeight -= 5;
            // console.log("456:", this.$refs.logindiv.style.top, topHeight);
          }, 5);
          statues = false;
        }
      }
    },
    useraccountjy() {
      var res = /^[0-9]{10,15}$/;
      if (this.useraccount === "") {
        this.uaccount = "账号输入为空";
      } else {
        if (res.test(this.useraccount)) {
          console.log("res", this.useraccount);
          this.uaccount = "";
        } else if (
          this.useraccount.length < 10 ||
          this.useraccount.length > 15
        ) {
          this.uaccount = "账号为长度为10-15位数字";
        } else {
          this.uaccount = "账号格式不正确，10-15位数字";
        }
      }
    },
    passwordjy() {
      var res = /^[a-zA-Z0-9]{6,12}$/;
      if (this.userpassword === "") {
        this.upassword = "密码输入为空";
      } else {
        if (res.test(this.userpassword)) {
          console.log("res1:", this.userpassword);
          this.upassword = "";
        } else if (
          this.userpassword.length < 6 ||
          this.userpassword.length > 12
        ) {
          this.upassword = "密码长度为6-12位";
        } else {
          this.upassword = "密码格式不正确，6-12为数字或英文";
        }
      }
    },
    valchange(value) {
      console.log(value);
      this.loginstatus = value;
      console.log(this.loginstatus);
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
      this.useraccountjy();
      this.passwordjy();
      console.log(this.loginstatus);
      console.log(this.useraccount, this.userpassword, this.loginstatus);
      if (this.uaccount === "" && this.upassword === "") {
        console.log(this.loginstatus);
        var res = await this.$axios.get(
          `/api/admin/user/${this.useraccount}/${this.userpassword}`
        );
        if (res) {
          if (res.data.length === 0) {
            alert("用户不存在哦");
          } else if (res.data.length > 0) {
            console.log("res:", res.data);
            var {
              kjwl_u_account,
              kjwl_u_name,
              kjwl_u_identity,
              kjwl_u_portrait,
              kjwl_u_id,
            } = res.data[0];
            console.log(
              kjwl_u_account,
              kjwl_u_name,
              kjwl_u_identity,
              kjwl_u_portrait,
              kjwl_u_id
            );
            var str = this.getRnadomFiveInt();
            console.log(str);
            localStorage.setItem("token", str);
            localStorage.setItem("accountdetails", kjwl_u_account);
            localStorage.setItem("loginstatus", kjwl_u_identity);
            localStorage.setItem("username", kjwl_u_name);
            localStorage.setItem("userportrait", kjwl_u_portrait);
            localStorage.setItem("userid", kjwl_u_id);
            this.loginuser.account = kjwl_u_account;
            this.loginuser.name = kjwl_u_name;
            this.loginuser.id = kjwl_u_id;
            this.$store.commit("LOGINSTATUS", kjwl_u_identity);
            this.$store.commit("SET_USER", this.loginuser);
            this.$store.commit("TOKENSTATUS", localStorage.token);
            this.$store.commit("SET_PROTRAIT", kjwl_u_portrait);
            console.log("123", this.$store);
            var {
              state: { tokenStatus, loginStatus, user },
            } = this.$store;
            console.log(tokenStatus, loginStatus, user);
            if (this.loginstatus != kjwl_u_identity) {
              alert("登录身份出错");
            } else if (this.loginstatus === kjwl_u_identity) {
              this.$router.push("/admin");
            }
          }
        }
      } else {
        console.log("error submit!!");
        return false;
      }
    },
  },
};
</script>

<style scoped>
#div1 {
  width: 100%;
  height: calc(100% - 223px);
  background: -webkit-gradient(
    linear,
    0% 0%,
    0% 100%,
    from(#4465d8),
    to(#489edb)
  );
  /* background     :   linear-gradient(top,#4465D8 #4796DA); */
}
#login {
  width: 350px;
  height: 450px;
  /* background-color: rgb(105, 122, 172); */
  background-color: #fff;
  position: fixed;
  top: 950px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 15px;
  z-index: 1000;
}
#logo {
  width: 100%;
  height: 90px;
  /* background-color: salmon; */
  margin-top: 10px;
  position: relative;
}
.img1top {
  /* width: 96%; */
  height: 100%;
  /* margin-left: 2%; */
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
}
.tit {
  width: 96%;
  height: 40px;
  margin-left: 2%;
  margin-top: 7px;
  /* background-color: sandybrown; */
  line-height: 40px;
  text-align: center;
  font-size: 23px;
  color: #333;
}
.input1 {
  width: 298px;
  height: 35px;
  outline: none;
  padding-left: 10px;
  display: block;
  margin: 0px 3.5%;
  font-size: 14px;
  color: #333;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
}
.d1 {
  width: 89%;
  height: 20px;
  margin-left: 9%;
  margin-top: 5px;
  /* background-color: chartreuse; */
  font-size: 13px;
  color: #cc3333;
}
.sel {
  width: 310px;
  height: 35px;
  outline: none;
  margin-top: -10px;
}
/* .sel option{
        height: 35px;
    } */
.t1 {
  margin-top: 15px;
}
.t2 {
  margin-top: 25px;
}
#sublogin {
  width: 310px;
  height: 40px;
  margin-left: 4%;
  background-color: #6495ed;
  font-size: 14px;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}
#imgbottom {
  width: 100%;
  height: 223px;
  background-color: cornflowerblue;
  position: fixed;
  bottom: 0px;
  z-index: 999;
}
#imgbottom img {
  width: 100%;
  height: 100%;
}
</style>