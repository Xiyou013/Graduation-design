<template>
  <div id="top">
    <div class="t_left">
      <img class="imgtop" src="../assets/企业搜索1.png" alt="" />
    </div>
    <div class="t_right">
      <div class="touxiang">
        <!-- <img :src="circleUrl" alt=""> -->
        <img class="t_img" :src="circleUrl" />
      </div>
      <div class="userkuang">
        <div class="u_top">
          {{ n1 && n1 }}
        </div>
        <div class="u_bottom">
          {{ msg && msg }}
        </div>
      </div>
      <div class="log-out" @click="onLogOut">退出登录</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "top",
  props: {
    name: {
      type: String,
    },
  },
  data() {
    return {
      // circleUrl: require("../assets/头像.png"),
      n1: "",
      p1: "",
      msg: "",
    };
  },
  mounted() {
    //获取登录账号昵称
    setTimeout(() => {
      console.log(this.name);
      this.n1 = this.name;
    });
    //获取当前时间
    this.timer = setInterval(() => {
      this.showTime();
    }, 1000);
    // this.circleUrl = require('../assets/首页1.png');
    // console.log(this.circleUrl)

    //从vuex 缓存获取登录账号信息
    var {
      state: { tokenStatus, loginStatus, user, protrait },
    } = this.$store;
    console.log("wwwwww", this.$store.state);
    console.log(tokenStatus, loginStatus, user, protrait);
    // this.circleUrl = protrait;
    // console.log(this.circleUrl)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  computed: {
    circleUrl() {
      return this.$store.state.protrait;
    },
  },
  methods: {
    showTime() {
      var date = new Date();
      this.msg =
        date.getFullYear() +
        "/" +
        this.padaDate(date.getMonth() + 1) +
        "/" +
        this.padaDate(date.getDate()) +
        "  " +
        this.padaDate(date.getHours()) +
        ":" +
        this.padaDate(date.getMinutes());
      // +':'+ this.padaDate(date.getSeconds())
    },
    padaDate(value) {
      return value < 10 ? "0" + value : value;
    },
    onLogOut() {
      console.log("这是退出登录");
      this.$confirm("确定要退出所登录的账号吗？", "", {
        confirmButtonText: "是的，我确定",
        cancelButtonText: "不,我手滑了",
        type: "warning",
      })
        .then(() => {
          this.onLogOutFn();
        })
        .catch(() => {});
    },
    onLogOutFn() {
      localStorage.clear();
      location.reload();
    },
  },
};
</script>

<style scoped>
@import "../css/top.css";
</style>