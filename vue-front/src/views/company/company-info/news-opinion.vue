<template>
  <div class="news-opinion" v-loading="loading">
    <van-sticky :offset-top="0">
      <van-nav-bar title="新闻舆情" left-arrow @click-left="onClickLeft">
        <template #right>
          <div class="news-index-nav">
            <van-icon name="search" @click="onClickSearch" />
            <!-- <van-icon name="share" @click="showShareFn" /> -->
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>

    <div class="news-opinion__block" v-show="showBlock">
      <div
        class="news-list"
        v-for="(item, index) in dataList"
        :key="index"
        @click="onNews(item)"
      >
        <div class="list-info">
          <div class="info-title-attitude">
            <div class="info-title">
              <span>{{ item.kjwl_n_name }}</span>
            </div>
            <div
              class="info-attitude"
              :style="[
                {
                  borderColor:
                    item.qyss_n_positive === 1
                      ? '#6BD089'
                      : item.qyss_n_positive === -1
                      ? '#F47378'
                      : '#A6A6A6',
                  color:
                    item.qyss_n_positive === 1
                      ? '#6BD089'
                      : item.qyss_n_positive === -1
                      ? '#F47378'
                      : '#A6A6A6',
                },
              ]"
            >
              <span>{{
                item.qyss_n_positive === 1
                  ? "积极"
                  : item.qyss_n_positive === -1
                  ? "消极"
                  : "中立"
              }}</span>
            </div>
          </div>
          <div class="info-source-time">
            <div class="info-source">
              <span style="color: #dedede">来源: </span>
              <span>{{ item.kjwl_n_source }}</span>
            </div>
            <div class="info-time">
              <span>{{ item.kjwl_n_rdatetime }}</span>
            </div>
          </div>
        </div>
        <van-icon name="arrow" color="#DEDEDE" />
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
    this.companyId = this.companydata ? this.companydata.kjwl_e_id : this.$route.params.companyId;
    this.getCompanyCollectNews();
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
        params: { id: this.companyId ,},
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
    onNews(item) {
      console.log("item-news:", item);
      this.$router.push({name:"news-index",params:{id:item.kjwl_n_id,type:variableEnum.newsKeyType.company_news,companyId:this.companyId}});
    },
    async getCompanyCollectNews() {
      this.loading = true;
      console.log("companydata:", this.companydata);
      try {
        var res = await this.$axios.get(
          `/api/www/getCompanyCollectNews/${this.companyId}`
        );
        if (res) {
          console.log("getCompanyCollectNews:", res);
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
.news-opinion__block {
  width: 100%;
  height: auto;
  //   background-color: darksalmon;
  //   background-color: #fff;
  color: #333;
}
.news-list {
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.list-info {
  width: 100%;
  height: auto;
  //   background-color: cornflowerblue;
}
.info-title-attitude {
  width: 100%;
  height: auto;
  //   background-color: cadetblue;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px 0px 8px 0px;
  box-sizing: border-box;
  .info-title {
    width: 100%;
    height: auto;
    // background-color: burlywood;
    font-size: 15px;
    margin-right: 5px;
    letter-spacing: 2px;
    line-height: 20px;
  }
  .info-attitude {
    width: 40px;
    height: 20px;
    font-size: 12px;
    border: 1px solid;
    padding: 0px 0px;
    box-sizing: border-box;
    border-radius: 3px;
    text-align: center;
  }
}
.info-source-time {
  width: 100%;
  height: 30px;
  //   background-color: coral;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
}
</style>