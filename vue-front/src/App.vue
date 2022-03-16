<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: "App",
  components: {
    // HelloWorld
  },
  created() {
    if (localStorage.token) {
      // this.$store.dispatch('setTokenStatus',localStorage.token);
      this.$store.commit("TOKENSTATUS", localStorage.token);
      this.$store.commit("LOGINSTATUS", localStorage.loginstatus);
      this.$store.commit("SET_USER", {
        account: localStorage.accountdetails,
        name: localStorage.username,
        id: localStorage.userid,
      });
      this.$store.commit("SET_PROTRAIT", localStorage.userportrait);
      this.$store.commit("ACCOUNT", localStorage.accountdetails);
      console.log("sssss", this.$store);
    }
  },
};
</script>

<style>
body,
html {
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
}
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
}
</style>
