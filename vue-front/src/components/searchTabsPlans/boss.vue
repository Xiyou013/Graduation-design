<template>
  <div class="boss__block" v-loading="loading">
    <History :active="active" />
    <span class="boss-text">热门搜索</span>
    <div class="boss-list">
      <div class="list-div" v-for="(item, index) in dataList" :key="index" @click="toBossSearch(item)">
        <img
          :src="item.kjwl_p_portrait"
          :alt="item.kjwl_p_name"
          class="list-img"
        />
        <div class="list-name">
          <span>{{ item.kjwl_p_name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import History from "./history.vue";
export default {
  components: { History },
  props: {
    active: {
      type: Number,
      default: () => {
        return 0;
      },
    },
  },
  // computed: {
  //   activeNum() {
  //     console.log("active123:", this.active);
  //     return this.active;
  //   },
  // },
  watch: {
    active() {
      console.log("active456:", this.active);
      this.getListData();
    },
  },
  data() {
    return {
      dataList: [
        // { name: "苹果", imgurl: require("@/assets/人物(1).png") },
        // { name: "芒果" },
        // { name: "青苹果" },
        // { name: "草莓" },
        // { name: "葡萄" },
        // { name: "柚子", imgurl: require("@/assets/人物(1).png") },
        // { name: "苹果", imgurl: require("@/assets/人物(1).png") },
        // { name: "芒果" },
        // { name: "青苹果" },
        // { name: "草莓" },
        // { name: "葡萄" },
        // { name: "柚子", imgurl: require("@/assets/人物(1).png") },
      ],
      loading: false,
    };
  },
  mounted() {
    console.log("active123:", this.active);
    this.getListData();
  },
  methods: {
    async getListData() {
      this.loading = true;
      this.dataList = [];
      try {
        var res = await this.$axios.get(`/api/www/SearchBossPanel`);
        if (res) {
          console.log("res:", res);
          this.dataList = res.data;
        }
      } catch (err) {
        this.$message({
          message: err,
          type: "error",
        });
      } finally {
        this.loading = false;
      }
    },
    toBossSearch(item){
      console.log('item:', item);
      localStorage.setItem("keyword", item.kjwl_p_name);
      this.$router.push({name:"boss-search",params:{id:item.kjwl_p_name}});
    },
  },
};
</script>

<style lang="less" scoped>
.boss__block {
  width: 100%;
  height: auto;
  // background-color: burlywood;
  background-color: #f2f2f2;
}
.boss-text {
  display: block;
  width: 100%;
  height: 30px;
  font-size: 14px;
  // background-color: darksalmon;
  background-color: #fff;
  padding-left: 10px;
  box-sizing: border-box;
  line-height: 30px;
  border-bottom: 1px solid #BFBFBF;
}
.boss-list {
  width: 100%;
  height: auto;
  // background-color: darkseagreen;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
}
.list-div {
  width: 30%;
  height: 50px;
  // background-color: #f7f8fa;
  background-color: #f2f2f2;
  /* margin-right: 3%; */
  margin: 2% 1% 1% 2%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}
.list-img {
  width: 40%;
  height: 40px;
  // background-color: darksalmon;
  //   background-color: #fff;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  border-radius: 5px;
}
.list-name {
  width: 50%;
  height: 40px;
  // background-color: darkseagreen;
  line-height: 40px;
  font-size: 13px;
  color: #333;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>