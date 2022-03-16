<template>
  <div id="admindetails">
    <div class="back" @click="toback">
      <i class="el-icon-close" style="font-size: 30px"></i>
    </div>
    <div class="add_top">超级/管理员信息详情</div>
    <div class="admincon1">
      <div class="add_left">账&emsp;&emsp;号&nbsp;:</div>
      <div class="r1">
        {{ account }}
      </div>
    </div>
    <div class="admincon1">
      <div class="add_left">昵&emsp;&emsp;称&nbsp;:</div>
      <div class="r1">
        {{ name }}
      </div>
    </div>
    <!-- <div class="adadd">
          <div class="adadd_left">密&emsp;&emsp;码&nbsp;:</div>
          <div class="adadd_right">
            
          </div>
      </div> -->
    <div class="admincon1">
      <div class="add_left">出生年月&nbsp;:</div>
      <div class="r1">
        {{ date }}
      </div>
    </div>
    <div class="admincon1">
      <div class="add_left">性&emsp;&emsp;别&nbsp;:</div>
      <div class="r1">
        {{ sex }}
      </div>
    </div>
    <div class="admincon1">
      <div class="add_left">身&emsp;&emsp;份&nbsp;:</div>
      <div class="r1">
        {{ identity }}
      </div>
    </div>
    <div class="admincon1">
      <div class="add_left">电&emsp;&emsp;话&nbsp;:</div>
      <div class="r1">
        {{ phone }}
      </div>
    </div>
    <div class="admincon1 adadd_1">
      <div class="add_left">电子邮箱&nbsp;:</div>
      <div class="r1">
        {{ email }}
      </div>
    </div>
    <!-- <div class="adadd_top"><el-button type="primary" style="width:180px">保存</el-button></div> -->
  </div>
</template>

<script>
import { cookiefn } from "@/utils/cookiefn";

export default {
  name: "admindetails",
  data() {
    return {
      input: "",
      account: "",
      name: "",
      date: "",
      sex: "",
      identity: "",
      phone: "",
      email: "",
    };
  },
  async mounted() {
    let obj = cookiefn.getCookie();
    let adnminId = obj.adnminId;
    // var {account} = this.$store.state;
    console.log(adnminId);
    var res = await this.$axios.get(`/api/admin/admindetails/${adnminId}`);
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
    }
  },
  methods: {
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
  },
};
</script>

<style scoped>
@import "../../css/admindetails.css";
</style>