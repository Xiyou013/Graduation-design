<template>
  <div class="partners" v-loading="loading">
    <van-sticky :offset-top="0">
      <van-nav-bar title="合作伙伴" left-arrow @click-left="onClickLeft">
        <template #right>
          <div class="news-index-nav">
            <van-icon name="search" @click="onClickSearch" />
            <!-- <van-icon name="share" @click="showShareFn" /> -->
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="partners__block" v-show="showBlock">
      <div
        class="partners-list"
        v-for="(item, index) in dataList"
        :key="index"
        @click="toBossIndex(item)"
      >
        <div class="list-image-name">
          <img
            class="list-image"
            :src="item.kjwl_p_portrait"
            :alt="item.kjwl_p_name"
          />
          <span class="list-name">{{ item.kjwl_p_name }}</span>
        </div>
        <div class="list-companynum">
          <span>他关联{{ item.companyNum }}家企业</span>
          <i class="el-icon-right"></i>
        </div>
        <div class="list-companyname">
          <span>{{ item.kjwl_p_enterprise }}</span>
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
import variableEnum from "@/utils/variableEnum.js";
import TemporarilyNoData from "@/components/components/temporarily-no-data.vue";
export default {
  components: { TemporarilyNoData },
  data() {
    return {
      showShare: false,
      loading: false,
      personData: "",
      id: "",
      variableEnum,
      showBlock: true,
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
    this.personid = this.$route.params.id;
    this.personData = this.$route.params.data;
    this.getPersonCollectPerson();
  },
  methods: {
    onChange(index) {
      console.log("index:", index);
      // Notify({ type: "primary", message: index });
    },
    onClickLeft() {
      // Toast("返回");
      this.$router.push({ name: "boss-index", params: { id: this.personid } });
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
    toBossIndex(item) {
      console.log("item-tobossindex:", item);
      this.$router.push({
        name: "kong-index",
        params: {
          personId: item.kjwl_p_id,
          persontype: variableEnum.personKeyType.partners,
          personData: this.personData,
        },
      });
    },
    async getPersonCollectPerson() {
      this.loading = true;
      console.log("personData:", this.personData);
      try {
        var res = await this.$axios.get(
          `/api/www/getPersonCollectPerson/${this.personid}`
        );
        if (res) {
          console.log("getPersonCollectPerson:", res);
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
  },
};
</script>

<style lang="less" scoped>
.news-index-nav {
  width: 50px;
  height: auto;
  //   background-color: burlywood;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
}
.partners__block {
  width: 100%;
  height: auto;
}
.partners-list {
  width: 100%;
  height: auto;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.list-image-name {
  width: 50%;
  height: auto;
  //   background-color: burlywood;
  font-size: 14px;
  display: flex;
  align-items: center;
  .list-image {
    width: 45px;
    height: 45px;
    background-color: #fff;
    border-radius: 3px;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    object-fit: contain;
  }
  .list-name {
    display: block;
    margin-left: 5px;
  }
}
.list-companynum {
  width: 50%;
  height: 45px;
  //   background-color: cadetblue;
  font-size: 14px;
  color: darkorange;
  text-align: right;
  line-height: 45px;
  .el-icon-right {
    font-size: 15px;
    border: 1px solid darkorange;
    color: darkorange;
    border-radius: 3px;
  }
}
.list-companyname {
  width: 100%;
  height: auto;
  //   background-color: cornflowerblue;
  font-size: 13px;
  color: #808080;
  padding-left: 45px;
  padding-top: 5px;
  box-sizing: border-box;
}
</style>