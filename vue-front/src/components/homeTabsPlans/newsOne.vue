<template>
  <div class="home__tabs-plan">
    <div
      class="news__block"
      v-for="(item, index) in list"
      :key="index"
      @click="toNewsFn(item)"
    >
      <span class="news__block-circle"></span>
      <div class="news__block-content">
        <!-- {{ item.kjwl_n_name }},{{ item.klwl_n_content }}<br />{{
          "记得去mysql库里在news表中添加阅读量字段"
        }} -->
        <div class="content-title">{{ item.kjwl_n_name }}</div>
        <div class="content-label">
          <div class="label-list" v-for="(value,key) in item.qyss_n_labelName" :key="key"><span>#{{value.label}}</span></div>
        </div>
        <div class="content-con">
          <span v-html="item.kjwl_n_content"></span>
        </div>
      </div>
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
  // watch:{
  //   newsList(){
  //     console.log('newsList:',this.newsList);
  //   },
  // },
  data() {
    return {
      variableEnum,
    };
  },
  methods: {
    toNewsFn(item) {
      console.log("item:", item);
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
      // let obj = {};
      // let arr = [];
      for (let i = 0; i < value.length; i++) {
        for (let j in value[i]) {
          // console.log("j:", j, value[i][j]);
          // for (let key in variableEnum.newsLabelType) {
          //   // console.log("key:",key,variableEnum.newsLabelType[key]);
          //   if (j === variableEnum.newsLabelType[key]) {
          //     this.$set(obj, key, value[i][j] || null);
          //   }
          // }

          if (j === "qyss_n_labelName") {
            value[i][j] = JSON.parse(value[i][j]);
          }
          if (j === "kjwl_n_content") {
            var reg = new RegExp('"', "g");
            value[i][j] = value[i][j].replace(reg, "");
            // console.log(value[i][j]);
          }
        }
        // console.log("obj:",i,obj);
        // arr[i]=obj;

        // console.log("arr:",arr);
        // debugger
      }
      // console.log("obj:",obj);
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
  // background-color: #f2f2f2;
  background-color: #fff;
  padding: 15px;
  box-sizing: border-box;
}
.news__block {
  width: 100%;
  height: auto;
  background-color: #fff;
  border-left: 1px solid #333;
  padding: 10px 0px 10px 10px;
  box-sizing: border-box;
  position: relative;
  // background-color: burlywood;
  .news__block-circle {
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: cornflowerblue;
    position: absolute;
    margin: -15px 0px 0px -16px;
  }
  .news__block-content {
    width: 100%;
    height: auto;
    // background-color: darksalmon;
    font-size: 15px;
    .content-title {
      width: 100%;
      height: auto;
      font-size: 15px;
      // color: #6E6E6E;
    }
    .content-con {
      width: 100%;
      height: auto;
      font-size: 14px;
      color: #333;
    }
    .content-label{
      width: 100%;
      height: auto;
      font-size: 13px;
      display: flex;
      flex-wrap: wrap;
      margin-top: 8px;
    }
    .label-list{
      // background-color: burlywood;
      width: auto;
      height: auto;
      margin-right: 8px;
      margin-top: 5px;
      color: #808080;
    }
  }
}
</style>