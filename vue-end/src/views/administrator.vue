<template>
  <div id="admin">
    <Top :name="name"></Top>
    <div class="leftnav">
      <el-menu
        router
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        background-color="#4783DA"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/home">
          <img
            class="img2"
            v-if="flag !== '/home'"
            src="@/assets/首页1.png"
            alt=""
          />
          <img
            class="img2"
            v-if="flag === '/home'"
            src="@/assets/首页2.png"
            alt=""
          />
          <span slot="title">首&emsp;&emsp;&emsp;页</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <!-- <i class="el-icon-location"></i> -->
            <img class="img2" src="@/assets/企业1.png" alt="" />
            <span>信&nbsp;息&nbsp;管&nbsp;理</span>
          </template>
          <el-menu-item index="/enterprise">
            <img
              class="img2"
              v-if="flag !== '/enterprise'"
              src="@/assets/企业1.png"
              alt=""
            />
            <img
              class="img2"
              v-if="flag === '/enterprise'"
              src="@/assets/企业2.png"
              alt=""
            />
            <span slot="title">企&nbsp;业&nbsp;信&nbsp;息</span>
          </el-menu-item>
          <el-menu-item index="/boss">
            <img
              class="img2"
              v-if="flag !== '/boss'"
              src="@/assets/老板1.png"
              alt=""
            />
            <img
              class="img2"
              v-if="flag === '/boss'"
              src="@/assets/老板2.png"
              alt=""
            />
            <span slot="title">人&nbsp;才&nbsp;信&nbsp;息</span>
          </el-menu-item>
          <el-menu-item index="/news">
            <img
              class="img2"
              v-if="flag !== '/news'"
              src="@/assets/新闻1.png"
              alt=""
            />
            <img
              class="img2"
              v-if="flag === '/news'"
              src="@/assets/新闻2.png"
              alt=""
            />
            <span slot="title">新&nbsp;闻&nbsp;信&nbsp;息</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/labelIndex">
          <img
            class="img2"
            v-if="flag !== '/labelIndex'"
            src="@/assets/标签.png"
            alt=""
          />
          <img
            class="img2"
            v-if="flag === '/labelIndex'"
            src="@/assets/标签1.png"
            alt=""
          />
          <span slot="title">标&nbsp;签&nbsp;管&nbsp;理</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <img class="img2" src="@/assets/用户1.png" alt="" />
            <span>用&nbsp;户&nbsp;管&nbsp;理</span>
          </template>
          <el-menu-item index="/user">
            <img
              class="img2"
              v-if="flag !== '/user'"
              src="@/assets/用户1.png"
              alt=""
            />
            <img
              class="img2"
              v-if="flag === '/user'"
              src="@/assets/用户2.png"
              alt=""
            />
            <span slot="title">用&nbsp;户&nbsp;信&nbsp;息</span>
          </el-menu-item>
          <el-menu-item index="/feedbackIndex">
            <img
              class="img2"
              v-if="flag !== '/feedbackIndex'"
              src="@/assets/意见反馈.png"
              alt=""
            />
            <img
              class="img2"
              v-if="flag === '/feedbackIndex'"
              src="@/assets/意见反馈1.png"
              alt=""
            />
            <span slot="title">意&nbsp;见&nbsp;反&nbsp;馈</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/adminindex" ref="sss">
          <img
            class="img2"
            v-if="flag !== '/adminindex'"
            src="@/assets/管理员1.png"
            alt=""
          />
          <img
            class="img2"
            v-if="flag === '/adminindex'"
            src="@/assets/管理员2.png"
            alt=""
          />
          <span slot="title">管理员信息</span>
        </el-menu-item>
        <el-menu-item index="/personal">
          <img
            class="img2"
            v-if="flag !== '/personal'"
            src="@/assets/个人资料1.png"
            alt=""
          />
          <img
            class="img2"
            v-if="flag === '/personal'"
            src="@/assets/个人资料2.png"
            alt=""
          />
          <span slot="title">个&nbsp;人&nbsp;信&nbsp;息</span>
        </el-menu-item>
        <el-menu-item index="/help">
          <img
            class="img2"
            v-if="flag !== '/help'"
            src="@/assets/帮助1.png"
            alt=""
          />
          <img
            class="img2"
            v-if="flag === '/help'"
            src="@/assets/帮助2.png"
            alt=""
          />
          <span slot="title">帮&nbsp;助&nbsp;信&nbsp;息</span>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="rightdiv">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Top from "@/components/top.vue";
export default {
  name: "admin",
  data() {
    return {
      name: "",
      flag: 0,
      loginstatus: "",
    };
  },
  components: {
    Top,
  },
  mounted() {
    console.log(this.$refs.sss);
    console.log(this.loginstatus);
    var {
      state: { tokenStatus, loginStatus, user, protrait },
    } = this.$store;
    console.log("wwwwww", this.$store.state);
    console.log(tokenStatus, loginStatus, user, protrait);
    console.log(user.account, user.name);
    this.name = user.name;
    console.log(this.name);
    this.loginstatus = loginStatus;
    console.log(this.loginstatus);

    if (this.loginstatus == 1) {
      var dom = this.$refs.sss;
      console.log(dom);
      this.$refs.sss.$el.style.display = "none";
    }
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.flag = key;
      console.log(this.flag);
    },
  },
};
</script>

<style scoped>
@import "../css/admin.css";
</style>