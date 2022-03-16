<template>
  <div class="history__block" v-if="labelList.length > 0" v-loading="loading">
    <div class="history__nav">
      <span>搜索历史</span>
      <van-icon name="delete-o" @click="deleteFn" />
    </div>
    <div class="history__label">
      <div
        class="label-div"
        v-for="(item, index) in labelList"
        :key="index"
        @click="onCompanyIndex(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import variableEnum from "@/utils/variableEnum.js";
export default {
  props: {
    active: {
      type: Number,
      default: () => {
        return 0;
      },
    },
  },
  watch: {
    active() {
      console.log("active456:", this.active);
      this.getLabelList(this.active);
    },
  },
  data() {
    return {
      variableEnum,
      params: {
        id: "",
        type: "",
      },
      labelList: [],
      loading: false,
    };
  },
  mounted() {
    console.log("active:", this.active);
    this.params.id = localStorage.userid;
    this.getLabelList(this.active);
  },
  methods: {
    deleteFn() {
      console.log("这是删除搜索历史");
      Dialog.confirm({
        title: "",
        message: "确定要删除这些历史搜索数据吗？",
      })
        .then(() => {
          // on confirm
          this.labelList = [];
          this.delHistorySterm(this.active);
        })
        .catch(() => {
          // on cancel
        });
    },
    onCompanyIndex(item) {
      console.log("item:", item);
      localStorage.setItem("keyword", item.label);
      switch (this.active) {
        case variableEnum.tabsPlanToSelType.company:
          // this.$router.push("/company-search");
          this.$router.push({name: "company-search",params:{keyword:item.label}});
          break;
        case variableEnum.tabsPlanToSelType.boss:
          this.$router.push({name: "boss-search",params:{keyword:item.label}});
          break;
        case variableEnum.tabsPlanToSelType.news:
          localStorage.setItem("keywordType", true);
          this.$router.push({name: "news",params:{keyword:item.label,keywordType:localStorage.keywordType}});
          break;
      }
    },
    async getLabelList(active) {
      console.log("getactine:", active);
      this.loading = true;
      this.labelList = [];
      this.params.type = active;
      try {
        var res = await this.$axios.get(
          `/api/www/userHistorySterm/${this.params.id}/${this.params.type}`
        );
        if (res) {
          console.log("res:", res);
          this.labelList = res.data;
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
    async delHistorySterm(active) {
      this.params = {
        ...this.params,
        type: active,
      };
      console.log("params:", this.params);
      try {
        var res = await this.$axios.get(
          `/api/www/userDelHistorySterm/${this.params.id}/${this.params.type}`
        );
        if (res) {
          console.log("res:", res);
          // this.labelList = res.data;
        }
      } catch (err) {
        this.$message({
          message: err,
          type: "error",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.history__block {
  width: 100%;
  height: auto;
  // background-color: cadetblue;
  background-color: #fff;
  color: #333;
  margin-bottom: 8px;
}
.history__nav {
  width: 100%;
  height: 30px;
  // background-color: cornflowerblue;
  padding: 0px 10px;
  box-sizing: border-box;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #bfbfbf;
}
.history__label {
  width: 100%;
  height: auto;
  // background-color: coral;
  font-size: 14px;
  padding-bottom: 5px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}
.label-div {
  width: auto;
  height: 30px;
  padding: 0px 5px;
  border: 1px solid #f2f2f2;
  background-color: #f2f2f2;
  box-sizing: border-box;
  border-radius: 3px;
  display: flex;
  align-items: center;
  margin: 10px 3px 5px 10px;
}
</style>