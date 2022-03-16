<template>
  <div class="personal" v-loading="loading">
    <van-sticky :offset-top="0">
      <van-nav-bar title="主要人员" left-arrow @click-left="onClickLeft">
        <template #right>
          <div class="more-index-nav">
            <van-icon name="search" @click="onClickSearch" />
            <!-- <van-icon name="share" @click="showShareFn" /> -->
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>

    <div class="personal__block" v-show="showBlock">
      <div
        class="personal-list"
        v-for="(item, index) in dataList"
        :key="index"
        @click="onPersonal(item)"
      >
        <div class="info-image-name">
          <div class="info-block">
            <img
              :src="item.kjwl_p_portrait"
              :alt="item.kjwl_p_name"
              class="info-img"
            />
            <span class="info-text">{{ item.kjwl_p_name }}</span>
          </div>
          <div class="info-focus">
            <span v-if="item.focus === 0" @click.stop="onCollectPerson(item)"
              >+ <span>关注</span></span
            >
            <span v-if="item.focus === 1">已关注</span>
          </div>
        </div>
        <div class="list-position">
          <span style="color: #828284">职务: </span>
          <span>{{ item.kjwl_p_position }}</span>
        </div>
      </div>
    </div>

    <div class="company__block" v-show="!showBlock">
      <TemporarilyNoData />
    </div>

    <van-share-sheet
      v-model="showShare"
      safe-area-inset-bottom
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import variableEnum from "@/utils/variableEnum.js";
import TemporarilyNoData from '@/components/components/temporarily-no-data.vue'
export default {
  components: { TemporarilyNoData },
  data() {
    return {
      showShare: false,
      loading: false,
      showBlock: true,
      userid: "",
      variableEnum,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "QQ", icon: "qq" },
          { name: "复制链接", icon: "link" },
        ],
      ],
      dataList: [],
    };
  },
  mounted() {
    console.log("route:", this.$route.params);
    this.companydata = this.$route.params.data;
    this.userid = localStorage.userid;
    this.getCompanyCollectPerson();
  },
  methods: {
    onChange(index) {
      console.log("index:", index);
      // Notify({ type: "primary", message: index });
    },
    onClickLeft() {
      // Toast("返回");
      this.$router.push({
        name: "company-index",
        params: { id: this.companydata.kjwl_e_id ,},
      });
    },
    onClickSearch() {
      this.$router.push({
        path: "/search",
        query: {
          active: 0,
        },
      });
    },
    showShareFn() {
      this.showShare = true;
    },
    onSelect(option) {
      console.log("select:", option.name);
      this.showShare = false;
    },
    onPersonal(item) {
      console.log("item-personal:", item);
      this.$router.push({name:"boss-index",params:{id:item.kjwl_p_id,persontype:variableEnum.personKeyType.main_satff,data:this.companydata}});
    },
    async getCompanyCollectPerson() {
      this.loading = true;
      console.log("companydata:", this.companydata);
      try {
        var res = await this.$axios.get(
          `/api/www/getCompanyCollectPerson/${this.companydata.kjwl_e_id}/${this.userid}`
        );
        if (res) {
          console.log("getCompanyCollectPerson:", res);
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
    async onCollectPerson(item) {
      console.log("item-ce:", item);
      this.loading = true;
      try {
        var res = await this.$axios.get(
          `/api/www/addCollectPerson/${item.kjwl_p_id}/${this.userid}`
        );
        if (res) {
          console.log("res:", res);
          Toast({
            message: res.data.message,
            position: "bottom",
          });
          this.getCompanyCollectPerson();
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
.more-index-nav {
  width: 50px;
  height: auto;
  //   background-color: burlywood;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
}
.personal__block {
  width: 100%;
  height: auto;
  //   background-color: darksalmon;
  //   background-color: #fff;
  color: #333;
}
.personal-list {
  width: 100%;
  height: auto;
  //   background-color: darkseagreen;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.info-image-name {
  width: 100%;
  height: 70px;
  // background-color: coral;
  font-size: 14px;
  display: flex;
  align-items: center;
  .info-block {
    width: 100%;
    height: 70px;
    // background-color: darkseagreen;
    display: flex;
    align-items: center;
    .info-img {
      width: 50px;
      height: 50px;
      background-color: #fff;
      border-radius: 3px;
      border: 1px solid #f1f1f1;
      object-fit: contain;
    }
    .info-text {
      color: #333;
      margin-left: 5px;
    }
  }
  .info-focus {
    width: 50px;
    height: 20px;
    border: 1px solid #0fa6d8;
    font-size: 12px;
    color: #0fa6d8;
    text-align: center;
    border-radius: 3px;
  }
}
.list-position {
  width: 100%;
  height: 30px;
  // background-color: cornflowerblue;
  font-size: 14px;
  line-height: 30px;
}
</style>