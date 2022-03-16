<template>
  <div class="company__tabs-plan" v-loading="loading">
    <div
      class="company-list"
      v-for="(item, index) in dataList"
      :key="index"
      @click="onCompanyIndex(item)"
      v-show="showBlock"
    >
      <div class="list-image-name">
        <div class="list-block">
          <img
            :src="item.kjwl_e_portrait"
            :alt="item.kjwl_e_name"
            class="list-img"
          />
          <span class="list-text">{{ item.kjwl_e_name }}</span>
        </div>
        <div class="list-focus">
          <span v-if="item.focus === 0">+ <span>关注</span></span>
          <span v-if="item.focus === 1" @click.stop="delCollectCompany(item)"
            >已关注</span
          >
        </div>
      </div>
      <div class="list-personal-money-time">
        <div class="list-personal">
          <div class="list-personal-text">
            <span>法定代表人</span>
          </div>
          <div class="list-personal-name">
            <span>{{ item.kjwl_e_lrpeople }}</span>
          </div>
        </div>
        <div class="list-money">
          <div class="list-money-text">
            <span>注册资本</span>
          </div>
          <div class="list-money-number">
            <span>{{ item.kjwl_e_regcapital }}</span>
            <span>万元人民币</span>
          </div>
        </div>
        <div class="list-time">
          <div class="list-time-text">
            <span>成立日期</span>
          </div>
          <div class="list-time-date">
            <span>{{ item.kjwl_e_setdate }}</span>
          </div>
        </div>
      </div>
      <div class="list-address-phone-website">
        <div class="list-address-text">
          <van-icon name="location-o" color="#60C5F1" />
          <span class="list-address">{{ item.kjwl_e_address }}</span>
        </div>
        <div class="list-phone">
          <van-icon name="phone-o" color="#60C5F1" />
          <span class="list-phone-text">电话</span>
        </div>
        <div class="list-website">
          <van-icon name="shield-o" color="#60C5F1" />
          <span class="list-website-text">网址</span>
        </div>
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
    this.getCollectCompanyList();
  },
  methods: {
    onCompanyIndex(item) {
      console.log("item:", item);
      this.$router.push({
        name: "company-index",
        params: { id: item.kjwl_e_id,active:variableEnum.tabsPlanToSelType.company,companytype:variableEnum.companyKeyType.collection_index },
      });
    },
    async getCollectCompanyList() {
      this.loading = true;
      try {
        var res = await this.$axios.get(
          `/api/www/getCollectCompanyList/${this.userid}`
        );
        if (res) {
          console.log("getCollectCompanyList:", res);
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
    async delCollectCompany(item) {
      console.log("item:", item);
      this.loading = true;
      try {
        var res = await this.$axios.get(
          `/api/www/delCollectCompany/${item.kjwl_e_id}/${this.userid}`
        );
        if (res) {
          console.log("res:", res);
          Toast({
            message: res.data.message,
            position: "bottom",
          });
          this.getCollectCompanyList();
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
.company__tabs-plan {
  width: 100%;
  height: auto;
  // background-color: burlywood;
  // background-color: #fff;
}
.company-list {
  width: 100%;
  height: 160px;
  // background-color: cadetblue;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
  padding: 0px 10px;
  box-sizing: border-box;
}
.list-image-name {
  width: 100%;
  height: 50px;
  // background-color: coral;
  font-size: 14px;
  display: flex;
  align-items: center;
  .list-block {
    width: 100%;
    height: 50px;
    // background-color: darkseagreen;
    display: flex;
    align-items: center;
    .list-img {
      width: 35px;
      height: 35px;
      background-color: #fff;
      border-radius: 3px;
      border: 1px solid #f1f1f1;
      object-fit: contain;
    }
    .list-text {
      color: #333;
      margin-left: 5px;
    }
  }
  .list-focus {
    width: 50px;
    height: 20px;
    border: 1px solid #0fa6d8;
    font-size: 12px;
    color: #0fa6d8;
    text-align: center;
    border-radius: 3px;
  }
}
.list-personal-money-time {
  width: 100%;
  height: 50px;
  // background-color: cornflowerblue;
  display: flex;
  .list-personal {
    width: 25%;
    height: 100%;
    // background-color: darkseagreen;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .list-personal-text {
      width: 100%;
      height: 25px;
      font-size: 12px;
      color: #979797;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .list-personal-name {
      width: 100%;
      height: 25px;
      font-size: 13px;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .list-money {
    width: 50%;
    height: 100%;
    // background-color: cadetblue;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .list-money-text {
      width: 100%;
      height: 25px;
      font-size: 12px;
      color: #979797;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .list-money-number {
      width: 100%;
      height: 25px;
      font-size: 13px;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .list-time {
    width: 25%;
    height: 100%;
    // background-color: darkseagreen;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .list-time-text {
      width: 100%;
      height: 25px;
      font-size: 12px;
      color: #979797;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .list-time-date {
      width: 100%;
      height: 25px;
      font-size: 13px;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.list-address-phone-website {
  width: 100%;
  height: 30px;
  // background-color: darksalmon;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-top: 1px solid #f5f5f5;
  .list-address-text {
    width: calc(100% - 100px);
    height: 30px;
    // background-color: cornflowerblue;
    display: flex;
    align-items: center;
    font-size: 16px;
    .list-address {
      margin-left: 3px;
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .list-phone {
    width: 50px;
    height: 20px;
    background-color: #c8ebfa;
    border-radius: 10px;
    font-size: 16px;
    color: #60c5f1;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .list-phone-text {
      font-size: 12px;
    }
  }
  .list-website {
    width: 50px;
    height: 20px;
    // background-color: cornflowerblue;
    background-color: #c8ebfa;
    border-radius: 10px;
    font-size: 16px;
    color: #60c5f1;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .list-website-text {
      font-size: 12px;
    }
  }
}
</style>