<template>
  <div class="news__block" v-loading="loading">
    <History :active="active" />
    <span class="news-text">热门搜索</span>
    <div class="news-list">
      <div style="width: 100%; height: 8px"></div>
      <div
        class="list-div"
        v-for="(item, index) in dataList"
        :key="index"
        @click="toNewsFn(item)"
      >
        <div class="list-sort" ref="list_sort" :style="[{ color: sortColor }]">
          {{ index + 1 }}
        </div>
        <div class="list-name">
          {{ item.kjwl_n_name }}
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
    toNewsFn(item) {
      console.log("item:", item);
      localStorage.setItem("keyword", item.kjwl_n_name);
      this.$router.push({
        name: "news",
        params: {
          keyword: item.kjwl_n_name,
        },
      });
    },
    async getListData() {
      this.loading = true;
      this.dataList = [];
      try {
        var res = await this.$axios.get(`/api/www/SearchNewsPanel`);
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
  },
};
</script>

<style lang="less" scoped>
.news__block {
  width: 100%;
  height: auto;
  // background-color: burlywood;
  background-color: #f2f2f2;
  color: #333;
}
.news-text {
  display: block;
  width: 100%;
  height: 30px;
  font-size: 14px;
  // background-color: darksalmon;
  background-color: #fff;
  padding-left: 10px;
  box-sizing: border-box;
  line-height: 30px;
  border-bottom: 1px solid #bfbfbf;
}
.news-list {
  width: 100%;
  height: auto;
  padding: 0px 8px;
  box-sizing: border-box;
  background-color: #fff;
}
.list-div {
  width: 100%;
  height: 40px;
  // background-color: rgb(233, 216, 122);
  /* margin-right: 3%; */
  margin: 0px 0px 8px 0px;
  display: flex;
  align-items: center;
  font-size: 14px;
  .list-sort {
    width: 10%;
    height: 40px;
    // background-color: cadetblue;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 15px;
  }
  .list-name {
    width: 90%;
    height: 40px;
    // background-color: cornflowerblue;
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>