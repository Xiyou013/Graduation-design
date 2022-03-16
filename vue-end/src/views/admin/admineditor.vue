<template>
  <div id="adminadd">
    <div class="adadd_top">超级/管理员添加</div>
    <div class="adadd">
      <div class="adadd_left">账&emsp;&emsp;号&nbsp;:</div>
      <div class="adadd_right">
        <el-input
          style="outline: none; margin-top: 5px"
          placeholder="请输入内容"
          v-model="account"
          clearable
          @blur="accountfn"
        >
        </el-input>
      </div>
      <div class="adadd_jy">
        {{ accountjy }}
      </div>
    </div>
    <div class="adadd">
      <div class="adadd_left">昵&emsp;&emsp;称&nbsp;:</div>
      <div class="adadd_right">
        <el-input
          style="outline: none; margin-top: 5px"
          placeholder="请输入内容"
          v-model="name"
          clearable
          @blur="namefn"
        >
        </el-input>
      </div>
      <div class="adadd_jy">
        {{ namejy }}
      </div>
    </div>
    <div class="adadd">
      <div class="adadd_left">密&emsp;&emsp;码&nbsp;:</div>
      <div class="adadd_right">
        <el-input
          style="outline: none; margin-top: 5px"
          v-model="password"
          clearable
          :disabled="true"
          show-password
        >
        </el-input>
      </div>
    </div>
    <div class="adadd">
      <div class="adadd_left">出生年月&nbsp;:</div>
      <div class="adadd_right">
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择日期"
          style="width: 100%"
          @change="valchange2(date)"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="adadd">
      <div class="adadd_left">性&emsp;&emsp;别&nbsp;:</div>
      <div class="adadd_right">
        <el-select
          class="sel"
          v-model="sex"
          @change="valchange(sex)"
          clearable
          placeholder="请选择性别"
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
    </div>
    <div class="adadd">
      <div class="adadd_left">身&emsp;&emsp;份&nbsp;:</div>
      <div class="adadd_right">
        <el-select
          class="sel"
          v-model="identity"
          @change="valchange1(identity)"
          clearable
          placeholder="请选择管理员身份"
        >
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="adadd">
      <div class="adadd_left">电&emsp;&emsp;话&nbsp;:</div>
      <div class="adadd_right">
        <el-input
          style="outline: none; margin-top: 5px"
          placeholder="请输入内容"
          v-model="phone"
          clearable
          @blur="phonefn"
        >
        </el-input>
      </div>
      <div class="adadd_jy">
        {{ phonejy }}
      </div>
    </div>
    <div class="adadd">
      <div class="adadd_left">电子邮箱&nbsp;:</div>
      <div class="adadd_right">
        <el-input
          style="outline: none; margin-top: 5px"
          placeholder="请输入内容"
          v-model="email"
          clearable
          @blur="emailfn"
        >
        </el-input>
      </div>
      <div class="adadd_jy">
        {{ emailjy }}
      </div>
    </div>
    <div class="adadd_top">
      <el-button
        style="
          width: 100px;
          background-color: #c1c1c1;
          color: #ffffff;
          border: 0px;
        "
        @click="toback()"
        >返回</el-button>
      <el-button type="primary" style="width: 100px" @click="admineditor()"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
import { cookiefn } from "@/utils/cookiefn";
export default {
  name: "adminadd",
  data() {
    return {
      account: "",
      name: "",
      date: "",
      sex: "",
      identity: "",
      phone: "",
      email: "",
      accountjy: "",
      namejy: "",
      phonejy: "",
      emailjy: "",

      id: "",
      password: "",
      portrait: "",

      options: [
        {
          value: "男",
          label: "男",
        },
        {
          value: "女",
          label: "女",
        },
      ],
      options1: [
        {
          value: 1,
          label: "管理员",
        },
        {
          value: 2,
          label: "超级管理员",
        },
      ],
      admininformation: {
        id: "",
        adnminId: "",
        name: "",
        password: "",
        portrait: "",
        date: "",
        sex: "",
        identity: "",
        phone: "",
        email: "",
        status: 1,
      },
    };
  },
  async mounted() {
    // console.log(localStorage.accountdetails)
    // console.log(this.$store);

    // var {account} = this.$store.state;

    let obj = cookiefn.getCookie();
    this.adnminId = obj.adnminId;
    console.log(this.adnminId);
    var res = await this.$axios.get(`/api/admin/admindetails/${this.adnminId}`);
    if (res) {
      console.log(res);
      var {
        kjwl_u_id,
        kjwl_u_account,
        kjwl_u_name,
        kjwl_u_birthdate,
        kjwl_u_sex,
        kjwl_u_identity,
        kjwl_u_phone,
        kjwl_u_email,
        kjwl_u_password,
        kjwl_u_portrait,
      } = res.data[0];
      this.date = this.showTime(kjwl_u_birthdate);
      this.account = kjwl_u_account;
      this.name = kjwl_u_name;
      this.sex = kjwl_u_sex;
      if (kjwl_u_identity === 1) {
        this.identity = "管理员";
      } else if (kjwl_u_identity === 2) {
        this.identity = "超级管理员";
      }

      this.phone = kjwl_u_phone;
      this.email = kjwl_u_email;

      this.id = kjwl_u_id;
      this.password = kjwl_u_password;
      this.portrait = kjwl_u_portrait;
    }
  },
  methods: {
    valchange(value) {
      console.log(value);
      this.sex = value;
      console.log(this.sex);
    },
    valchange1(value) {
      console.log(value);
      this.identity = value;
      console.log(this.identity);
    },
    valchange2(value) {
      console.log(value);
      this.date = value;
      console.log(this.date);
    },
    accountfn() {
      var res = /^[0-9]{10,15}$/;
      if (this.account === "") {
        this.accountjy = "账号输入为空";
      } else {
        if (res.test(this.account)) {
          console.log("res", this.account);
          this.accountjy = "";
        } else if (this.account.length < 10 || this.account.length > 15) {
          this.accountjy = "账号为长度为10-15位数字";
        } else {
          this.accountjy = "账号格式不正确，10-15位数字";
        }
      }
    },
    namefn() {
      var res = /^[\u4E00-\u9FA5A-Za-z\s]{2,8}$/;
      if (this.name === "") {
        this.namejy = "昵称输入为空";
      } else {
        if (res.test(this.name)) {
          console.log("res", this.name);
          this.namejy = "";
        } else if (this.name.length < 2 || this.name.length > 8) {
          this.namejy = "昵称长度为2-8";
        } else {
          this.namejy = "昵称格式不正确，中文或英文";
        }
      }
    },
    phonefn() {
      var res = /^1\d{10}$/;
      if (this.phone === "") {
        this.phonejy = "电话输入为空";
      } else {
        if (res.test(this.phone)) {
          console.log("res", this.phone);
          this.phonejy = "";
        } else if (this.phone.length < 0 || this.phone.length > 11) {
          this.phonejy = "电话长度为11位";
        } else {
          this.phonejy = "电话格式不正确";
        }
      }
    },
    emailfn() {
      var res = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (this.email === "") {
        this.emailjy = "邮箱输入为空";
      } else {
        if (res.test(this.email)) {
          console.log("res", this.email);
          this.emailjy = "";
        } else {
          this.emailjy = "邮箱格式不正确";
        }
      }
    },
    showTime(val) {
      var date = new Date(val);
      var msg =
        date.getFullYear() +
        "-" +
        this.padaDate(date.getMonth() + 1) +
        "-" +
        this.padaDate(date.getDate());
      // console.log(msg)
      return msg;
    },
    padaDate(value) {
      return value < 10 ? "0" + value : value;
    },
    toback() {
      this.$router.push({ path: "/adminindex" });
    },
    //管理员编辑
    async admineditor() {
      console.log("admineditor:", "编辑成功");

      this.accountfn();
      this.namefn();
      this.phonefn();
      this.emailfn();
      console.log(
        this.account,
        this.name,
        this.date,
        this.sex,
        this.identity,
        this.phone,
        this.email
      );
      if (
        this.account &&
        this.name &&
        this.date &&
        this.sex &&
        this.identity &&
        this.phone &&
        this.email !== ""
      ) {
        console.log(this.date);
        this.date = this.showTime(this.date);
        console.log(this.date);
        console.log(1, this.identity);

        this.admininformation.id = this.id;
        this.admininformation.account = this.account;
        this.admininformation.name = this.name;
        this.admininformation.date = this.date;
        this.admininformation.sex = this.sex;

        if (this.identity === "管理员") {
          this.identity = 1;
        } else if (this.identity === "超级管理员") {
          this.identity = 2;
        }
        console.log(2, this.identity);
        this.admininformation.identity = this.identity;
        this.admininformation.phone = this.phone;
        this.admininformation.email = this.email;
        this.admininformation.password = this.password;
        this.admininformation.portrait = this.portrait;
        console.log(this.admininformation);

        var res = await this.$axios.post(
          "/api/admin/admineditor",
          this.admininformation
        );
        console.log(res);

        this.$router.push("/adminindex");
      } else {
        this.$message.error("信息未填写完整，请补全信息");
      }
    },
  },
};
</script>

<style scoped>
@import "../../css/admineditor.css";
</style>