<template>
  <div id="usercontent">
    <div class="back" @click="toback">
      <i class="el-icon-close" style="font-size: 30px"></i>
    </div>
    <div class="userportrait">
      <img class="t_img2" :src="circleUrl" />
    </div>
    <div class="usercontent">
      <div class="usercon">
        <div class="userc_left">账&emsp;&emsp;号&nbsp;:</div>
        <div class="userc_right">{{ this.userInformation.account }}</div>
      </div>
      <div class="usercon">
        <div class="userc_left">昵&emsp;&emsp;称&nbsp;:</div>
        <div class="userc_right">{{ this.userInformation.name }}</div>
      </div>
      <div class="usercon">
        <div class="userc_left">身&emsp;&emsp;份&nbsp;:</div>
        <div class="userc_right">
          {{ this.userInformation.privilege === 1 ? "普通用户" : "VIP用户" }}
        </div>
      </div>
      <div class="usercon" v-if="this.userInformation.privilege === 2">
        <div class="userc_left">到期时间:</div>
        <div class="userc_right">{{ this.userInformation.privilegetime }}</div>
      </div>
      <div class="usercon">
        <div class="userc_left">手&ensp;机&ensp;号&nbsp;:</div>
        <div class="userc_right">{{ this.userInformation.phone }}</div>
      </div>
      <div class="usercon">
        <div class="userc_left">电子邮箱&nbsp;:</div>
        <div class="userc_right">{{ this.userInformation.email }}</div>
      </div>
      <div class="usercon">
        <div class="userc_left">名&emsp;&emsp;片&nbsp;:</div>
        <div class="userc_right">{{ this.userInformation.signature }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { dateTimeFn } from "@/utils/datetime";
import { cookiefn } from "@/utils/cookiefn";
export default {
  name: "usercontent",
  data() {
    return {
      userInformation: {
        account: "",
        email: "",
        name: "",
        phone: "",
        signature: "",
        privilege: "",
        privilegetime: "",
        userId: "",
      },
      circleUrl: require("../../assets/头像.png"),
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    async refresh() {
      let obj = cookiefn.getCookie();
      this.userId = obj.userId;
      console.log(this.userId);

      var res = await this.$axios.get(`/api/admin/userdetails/${this.userId}`);
      if (res) {
        console.log(res.data);
        const {
          kjwl_yu_account,
          kjwl_yu_email,
          kjwl_yu_name,
          kjwl_yu_phone,
          kjwl_yu_portrait,
          kjwl_yu_signature,
          kjwl_yu_privilege,
          kjwl_yu_privilegetime,
        } = res.data[0];

        this.userInformation.account = kjwl_yu_account;
        this.userInformation.email = kjwl_yu_email;
        this.userInformation.name = kjwl_yu_name;
        this.userInformation.phone = kjwl_yu_phone;
        this.userInformation.signature = kjwl_yu_signature;
        // this.userInformation.privilege = kjwl_yu_privilege;
        //判断vip身份，1为普通用户，2为vip用户
        if (kjwl_yu_privilege === 1) {
          this.userInformation.privilege = kjwl_yu_privilege;
        } else if (kjwl_yu_privilege === 2) {
          //如果是vip用户，则显示时间
          this.gettime(kjwl_yu_privilegetime);
          console.log("privilege:", this.userInformation.privilege);
        }
        this.userInformation.privilegetime = dateTimeFn.showTime(
          kjwl_yu_privilegetime
        );
        this.circleUrl = kjwl_yu_portrait;
      }
    },
    //判断vip用户时间是否到期，到期则身份置1，改为普通用户；若未到期，则显示到期时间
    async gettime(val) {
      console.log("val:", val);
      let str;
      let date1 = dateTimeFn.showDateTime(dateTimeFn.showTime(new Date()));
      let date2 = dateTimeFn.showDateTime(dateTimeFn.showTime(val));
      console.log("date:", date1, date2);
      if (date1 > date2) {
        str = 1;
      } else str = 2;
      console.log("str:", str);
      this.userInformation.privilege = str;
      let res = await this.$axios.get(
        `/api/admin/usereditor/${this.userId}/${str}`
      );
      console.log("res:", res.data);
    },
    toback() {
      this.$router.push({ path: "/user" });
    },
  },
};
</script>

<style scoped>
@import "../../css/usercontent.css";
</style>