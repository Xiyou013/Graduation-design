<template>
  <div class="home__tabs-plan">
    <div
      class="news__block"
      v-for="(item, index) in list"
      :key="index"
      @click="toNewsFn(item)"
    >
      <div class="news-title">
        {{ item.kjwl_n_name }}
      </div>
      
      <!-- <div class="news-reading">{{ item.label }}</div> -->
      <div class="content-label">
        <div
          class="label-list"
          v-for="(value, key) in item.qyss_n_labelName"
          :key="key"
        >
          <span>#{{ value.label }}</span>
        </div>
      </div>
      <div class="news-source">{{ item.kjwl_n_source }}</div>
      <div class="news-time">{{ item.kjwl_n_rdatetime }}</div>
    </div>
  </div>
</template>

<script>
import variableEnum from "@/utils/variableEnum.js";

export default {
  props: {
    newsList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    list() {
      // console.log("newsList:", this.newsList);
      return this.newsListFormat(this.newsList);
    },
  },
  data() {
    return {
      // list: [
      //   { value: "001", label: "第1个" },
      //   { value: "002", label: "第2个" },
      //   { value: "003", label: "第3个" },
      //   { value: "004", label: "第4个" },
      //   { value: "005", label: "第5个" },
      // ],
      variableEnum,

    };
  },
  methods: {
    toNewsFn(item) {
      console.log("item-newsTwo:", item);
      this.$router.push({
        name: "news-index",
        params: {
          id: item.kjwl_n_id,
          type:variableEnum.newsKeyType.home,
        },
      });
    },
    newsListFormat(value) {
      // console.log("vuale:", value);
      for (let i = 0; i < value.length; i++) {
        for (let j in value[i]) {
          // console.log("j:", j, value[i][j]);
          if (j === "qyss_n_labelName") {
            value[i][j] = JSON.parse(value[i][j]);
          }
          if (j === "kjwl_n_content") {
            var reg = new RegExp('"', "g");
            value[i][j] = value[i][j].replace(reg, "");
            // console.log(value[i][j]);
          }
        }
      }
      // console.log("vuale:", value);

      return value;
    },
  },
};
</script>

<style lang="less" scoped>
.home__tabs-plan {
  width: 100%;
  height: auto;
  // background-color: burlywood;
  padding: 0px 5px;
  box-sizing: border-box;
  background-color: #fff;
  // background-color: #f2f2f2;
}
.news__block {
  width: 100%;
  height: auto;
  // background-color: darkseagreen;
  padding: 15px 8px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #d9d9d9;
  font-size: 15px;
  .news-title {
    width: 100%;
    height: auto;
    // background-color: goldenrod;
  }
  .news-source {
    width: 50%;
    height:auto;
    font-size: 14px;
    // color: #A6A6A6;
    color: #808080;

    // background-color: greenyellow;
  }
  .news-reading {
    width: 25%;
    height: auto;
    background-color: hotpink;
  }
  .news-time {
    width: 50%;
    height: auto;
    font-size: 14px;
    color: #808080;
    // background-color: beige;
    text-align: right;
  }
  .content-label {
    width: 100%;
    height: auto;
    font-size: 13px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .label-list {
    // background-color: burlywood;
    width: auto;
    height: auto;
    margin-right: 8px;
    margin-top: 5px;
    // color: #808080;
    color: #A6A6A6;

  }
}
</style>