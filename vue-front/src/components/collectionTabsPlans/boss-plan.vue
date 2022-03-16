<template>
  <div class="boss__tabs-plan" v-loading="loading">
    <div
      class="boss-list"
      v-for="(item, index) in dataList"
      :key="index"
      @click="onBossIndex(item)"
      v-show="showBlock"
    >
      <div class="boss-image-name-companyNumber">
        <img
          :src="item.kjwl_p_portrait"
          :alt="item.kjwl_p_name"
          class="boss-image"
        />
        <div class="boss-name-companyNumber">
          <div class="boss-name">
            <span>{{ item.kjwl_p_name }}</span>
          </div>
          <div class="boss-companyNumber">
            <span class="boss-companyNumber-text"
              >共关联<span class="boss-companyNumber-item-text">{{
                item.companyNumber
              }}</span
              >家企业</span
            >
          </div>
        </div>
        <div class="list-focus">
          <span v-if="item.focus === 0">+ <span>关注</span></span>
          <span v-if="item.focus === 1" @click.stop="delCollectPerson(item)"
            >已关注</span
          >
        </div>
      </div>
      <div
        class="boss-companyList"
        v-for="(value, keyword) in item.company"
        :key="keyword"
      >
        <img
          :src="value.kjwl_e_portrait"
          :alt="value.kjwl_e_name"
          class="companyList-image"
        />
        <span class="companyList-name">{{ value.kjwl_e_name }}</span>
      </div>
    </div>

    <div class="company__block" v-show="!showBlock">
      <TemporarilyNoData />
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import variableEnum from "@/utils/variableEnum.js";
import TemporarilyNoData from "@/components/components/temporarily-no-data.vue";
export default {
  components: { TemporarilyNoData },
  data() {
    return {
      userid: "",
      loading: false,
      showBlock: true,
      variableEnum,
      dataList: [],
    };
  },
  mounted() {
    this.userid = localStorage.userid;
    this.getCollectPersonList();
  },
  methods: {
    onBossIndex(item) {
      console.log("item111:", item);
       this.$router.push({
        name: "boss-index",
        params: {
          id: item.kjwl_p_id,
          active:variableEnum.tabsPlanToSelType.boss,
          persontype: variableEnum.personKeyType.collection_index,
        },
      });
    },
    async getCollectPersonList() {
      this.loading = true;
      try {
        var res = await this.$axios.get(
          `/api/www/getCollectPersonList/${this.userid}`
        );
        if (res) {
          console.log("getCollectPersonList:", res);
          this.dataList = res.data;
          if (this.dataList.length <= 0) this.showBlock = !this.showBlock;
          console.log("dataList:", this.dataList);
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
    async delCollectPerson(item) {
      console.log("item:", item);
      this.loading = true;
      try {
        var res = await this.$axios.get(
          `/api/www/delCollectPerson/${item.kjwl_p_id}/${this.userid}`
        );
        if (res) {
          console.log("res:", res);
          Toast({
            message: res.data.message,
            position: "bottom",
          });
          this.getCollectPersonList();
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
.boss__tabs-plan {
  width: 100%;
  height: auto;
  // background-color: burlywood;
  color: #333;
  //   background-color: #f2f2f2;
}
.boss-list {
  width: 100%;
  height: auto;
  // background-color: cadetblue;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 15px;
  .boss-image-name-companyNumber {
    width: 100%;
    height: 50px;
    // background-color: coral;
    display: flex;
    align-items: center;
    .boss-image {
      width: 45px;
      height: 45px;
      background-color: #fff;
      border-radius: 5px;
      border: 1px solid #ebecea;
      object-fit: contain;
    }
    .boss-name-companyNumber {
      width: 100%;
      height: 50px;
      // background-color: darkseagreen;
      padding-left: 5px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      .boss-name {
        width: 100%;
        height: 25px;
        // background-color: darksalmon;
        font-size: 15px;
        display: flex;
        align-items: center;
      }
      .boss-companyNumber {
        width: 100%;
        height: 25px;
        // background-color: lightskyblue;
        font-size: 12px;
        display: flex;
        align-items: center;
        letter-spacing: 2px;
        .boss-companyNumber-text {
          color: #bfbfbf;
        }
        .boss-companyNumber-item-text {
          color: #f47378;
        }
      }
    }
    .list-focus {
      width: 60px;
      height: 20px;
      border: 1px solid #0fa6d8;
      font-size: 12px;
      color: #0fa6d8;
      text-align: center;
      border-radius: 3px;
    }
  }
  .boss-companyList {
    width: 100%;
    height: 30px;
    // background-color:darksalmon;
    display: flex;
    align-items: center;
    .companyList-image {
      width: 20px;
      height: 20px;
      background-color: #fff;
      border: 1px solid #ebecea;
      border-radius: 3px;
      object-fit: contain;
    }
    .companyList-name {
      width: 100%;
      font-size: 13px;
      padding-right: 5px;
      box-sizing: border-box;
      text-align: right;
    }
  }
}
</style>