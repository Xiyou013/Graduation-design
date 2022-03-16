<template>
  <div id="p_editor">
    <div class="p_left">
      <div class="p_left_1">
        <div class="p_left_1_img">
          <img class="t_img" :src="circleUrl" />
        </div>
        <div class="p_left_1_name">西柚大魔王</div>
      </div>
      <div class="p_left_2">
        <div class="p_left_2_fn1 fn1" @click="clickfn('/personalportrait')">
          更改设定
        </div>
      </div>
    </div>
    <div class="p_right">
      <div class="p_right_1">
        <div class="p_right_1_1">
          <div class="p_right_1_1_top">个&emsp;人&emsp;资&emsp;料</div>
          <div class="p_right_1_1_con">
            <div class="p_right_1_1_con_information1">
              <div class="p_right_1_1_con_information_left1">
                昵&emsp;&emsp;称:
              </div>
              <div class="p_right_1_1_con_information_right1">
                <el-input
                  placeholder="请输入昵称"
                  v-model="name"
                  @blur="namefn"
                  clearable
                >
                </el-input>
              </div>
              <div class="adadd_jy">
                {{ namejy }}
              </div>
            </div>
            <div class="p_right_1_1_con_information1">
              <div class="p_right_1_1_con_information_left1">
                账&emsp;&emsp;号:
              </div>
              <div class="p_right_1_1_con_information_right1">
                <el-input
                  placeholder="请输入账号"
                  v-model="account"
                  @blur="accountfn"
                  clearable
                >
                </el-input>
              </div>
              <div class="adadd_jy">
                {{ accountjy }}
              </div>
            </div>
            <div class="p_right_1_1_con_information1">
              <div class="p_right_1_1_con_information_left1">
                性&emsp;&emsp;别:
              </div>
              <div class="p_right_1_1_con_information_right1">
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
              <div class="adadd_jy"></div>
            </div>
            <div class="p_right_1_1_con_information1">
              <div class="p_right_1_1_con_information_left1">出生年月:</div>
              <div class="p_right_1_1_con_information_right1">
                <el-date-picker
                  v-model="date"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%"
                  @change="valchange2(date)"
                >
                </el-date-picker>
              </div>
              <div class="adadd_jy"></div>
            </div>
            <div class="p_right_1_1_con_information1">
              <div class="p_right_1_1_con_information_left1">
                身&emsp;&emsp;份:
              </div>
              <div class="p_right_1_1_con_information_right1">
                <el-select
                  class="sel"
                  style="width: 308px"
                  v-model="identity"
                  @change="valchange1(identity)"
                  clearable
                  placeholder="请选择登录身份"
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
              <div class="adadd_jy"></div>
            </div>
            <div class="p_right_1_1_con_information1">
              <div class="p_right_1_1_con_information_left1">
                电&emsp;&emsp;话:
              </div>
              <div class="p_right_1_1_con_information_right1">
                <el-input
                  placeholder="请输入电话"
                  v-model="phone"
                  @blur="phonefn"
                  clearable
                >
                </el-input>
              </div>
              <div class="adadd_jy">
                {{ phonejy }}
              </div>
            </div>
            <div class="p_right_1_1_con_information1">
              <div class="p_right_1_1_con_information_left1">电子邮箱:</div>
              <div class="p_right_1_1_con_information_right1">
                <el-input
                  placeholder="请输入电子邮箱"
                  v-model="email"
                  @blur="emailfn"
                  clearable
                >
                </el-input>
              </div>
              <div class="adadd_jy">
                {{ emailjy }}
              </div>
            </div>
          </div>
        </div>
        <div class="p_right_1_1_btn">
          <el-button
            style="
              width: 100px;
              background-color: #c1c1c1;
              color: #ffffff;
              border: 0px;
            "
            @click="toback()"
            >返回</el-button
          >
          <el-button
            style="width: 100px;"
            type="primary"
            @click="save()"
            >保&emsp;&emsp;存</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "p_editor",
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
        account: "",
        name: "",
        date: "",
        sex: "",
        identity: "",
        phone: "",
        email: "",
      },
      circleUrl: require("../../assets/头像.png"),
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    async refresh() {
      var { username, accountdetails, userid } = localStorage;
      console.log(username, accountdetails, userid);
      var res = await this.$axios.get(
        `/api/admin/personal/${userid}`
      );
      if (res) {
        console.log(res);
        var {
          kjwl_u_account,
          kjwl_u_name,
          kjwl_u_birthdate,
          kjwl_u_sex,
          kjwl_u_identity,
          kjwl_u_phone,
          kjwl_u_email,
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
        this.circleUrl = kjwl_u_portrait;
      }
    },
    async save() {
      console.log(123);
      this.accountfn();
      this.namefn();
      this.phonefn();
      this.emailfn();
      console.log(
        "jiaoyan:",
        this.accountjy,
        this.namejy,
        this.phonejy,
        this.emailjy
      );
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
        if (this.identity === "管理员") {
          this.identity = 1;
        } else if (this.identity === "超级管理员") {
          this.identity = 2;
        }
        console.log(2, this.identity);
        var { userid } = localStorage;
        console.log(userid);

        this.admininformation.id = userid;
        this.admininformation.account = this.account;
        this.admininformation.name = this.name;
        this.admininformation.date = this.date;
        this.admininformation.sex = this.sex;
        this.admininformation.identity = this.identity;
        this.admininformation.phone = this.phone;
        this.admininformation.email = this.email;
        console.log(this.admininformation);

        var res = await this.$axios.post(
          "/api/admin/personaleditor",
          this.admininformation
        );
        console.log(res);

        this.$router.push({ path: "/personal" });
      } else {
        this.$message.error("信息未填写完整，请补全信息");
      }
    },
    toback() {
      this.$router.push({ path: "/personal" });
    },
    clickfn(val) {
      console.log(val);
      this.$router.push({
        path: val,
      });
    },
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
  },
};
</script>

<style scoped>
@import "../../css/personaleditor.css";
</style>