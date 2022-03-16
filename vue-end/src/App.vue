<template>
  <!-- <div v-if="routerAlive"> -->
      <!-- router组件 -->

  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',

  created() {
    if(localStorage.token){
      // this.$store.dispatch('setTokenStatus',localStorage.token);
      this.$store.commit('TOKENSTATUS',localStorage.token);
      this.$store.commit('LOGINSTATUS',localStorage.loginstatus);
      this.$store.commit('SET_USER',{account:localStorage.accountdetails,name:localStorage.username,id:localStorage.userid});
      this.$store.commit('SET_PROTRAIT',localStorage.userportrait);
      this.$store.commit('ACCOUNT',localStorage.accountdetails);
      console.log('sssss',this.$store)
    }



    // if (localStorage.eleToken) {
    //   const decode = jwt_decode(localStorage.eleToken);
    //   console.log(localStorage.eleToken);
    //   this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
    //   this.$store.dispatch("setUser", decode);
    // }
  },
  // methods: {
  //   isEmpty(value) {
  //     return (
  //       value === undefined ||
  //       value === null ||
  //       (typeof value === "object" && Object.keys(value).length === 0) ||
  //       (typeof value === "string" && value.trim().length === 0)
  //     );
  //   }
  // },



  provide(){
    return{
      // routerRefresh: this.routerRefresh,
      // reload:this.reload
    }
  },
  data(){
    return{
      // routerAlive:true,
      // isRouterAlive:true,
    }
  },
 methods:{
    // routerRefresh(){
    //   this.routerAlive = false;
    //   this.$nextTick(()=>{
    //     this.routerAlive = true;
    //   });
    // }
    // reload(){
    //   this.isRouterAlive = false;
    //   this.$nextTick(function () {
    //     this.isRouterAlive = true
    //   });
    // },
	},
  components: {
    
  }
}
</script>

<style>
body,html{
  height: 100%;
  padding: 0;
  margin: 0;
}
#app{
  height: 100%;
}
</style>
