<template>
  <div class="company__block" v-loading="loading">
    <History :active="active" />
    <span class="company-text">热门搜索</span>
    <div class="company-list">
      <div class="list-div" v-for="(item, index) in dataList" :key="index" @click="toCompanySearch(item)">
        <div class="list-sort" ref="list_sort" :style="[{ color: sortColor }]">
          {{ index + 1 }}
        </div>
        <div class="list-name">
          {{ item.kjwl_e_name }}
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
        // { value: "001", label: "第1个" },
        // { value: "002", label: "第2个" },
        // { value: "003", label: "第3个" },
        // { value: "004", label: "第4个" },
        // { value: "005", label: "第5个" },
        // { value: "001", label: "第1个" },
        // { value: "002", label: "第2个" },
        // { value: "003", label: "第3个" },
        // { value: "004", label: "第4个" },
        // { value: "005", label: "第5个" },
      ],
      sortColor: null,
      loading: false,
    };
  },
  mounted() {
    console.log("active123:", this.active);
    this.getListData();
  },
  methods: {
    changeCssColor() {
      setTimeout(() => {
        for (var index = 0; index < this.dataList.length; index++) {
          if (index === 0) {
            this.$refs.list_sort[index].style.cssText = `color: red`;
          }
          if (index === 1) {
            this.$refs.list_sort[index].style.cssText = `color: coral`;
          }
          if (index === 2) {
            this.$refs.list_sort[index].style.cssText = `color: goldenrod`;
          }
          if (index > 2) {
            this.$refs.list_sort[index].style.cssText = `color: #333`;
          }
        }
      });
    },
    async getListData() {
      this.loading = true;
      this.dataList = [];
      try {
        var res = await this.$axios.get(`/api/www/SearchCompanyPanel`);
        if (res) {
          console.log("res:", res);
          this.dataList = res.data;
          this.changeCssColor();
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
    toCompanySearch(item){
      console.log('item:', item);
      localStorage.setItem("keyword", item.kjwl_e_name);
      this.$router.push({name:"company-search",params:{id:item.kjwl_e_name}});
    },
  },
};
</script>

<style lang="less" scoped>
.company__block {
  width: 100%;
  height: auto;
  // background-color: burlywood;
  background-color: #f2f2f2;
}
.company-text {
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
.company-list {
  width: 100%;
  height: auto;
  /* background-color: coral; */
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
}
.list-div {
  width: 50%;
  height: 40px;
  // background-color: darkseagreen;
  display: flex;
  align-items: center;
  .list-sort {
    width: 20%;
    height: 40px;
    // background-color: cadetblue;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 15px;
  }
  .list-name {
    width: 80%;
    height: 40px;
    // background-color: cornflowerblue;
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
// .list-sort:nth-child(1) {
//   color: var(--color);
// }
</style>