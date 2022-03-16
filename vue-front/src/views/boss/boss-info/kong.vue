<template>
  <div class="kong"></div>
</template>

<script>
export default {
  data(){
    return{
      personId:"",
      persontype:"",
      personData:"",
    }
  },
  mounted() {
    console.log("route:", this.$route.params);
    this.personId = this.$route.params.personId;
    this.persontype = this.$route.params.persontype;
    this.personData = this.$route.params.personData;

    // this.$router.push("/boss-index");
    console.log("跳转");
    this.$router.push({
      name: "boss-index",
      params: {
        personId:this.personId,
        persontype:this.persontype,
        personData:this.personData,
      },
    });
  },
};
</script>

<style>
</style>