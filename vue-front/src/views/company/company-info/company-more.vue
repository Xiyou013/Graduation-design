<template>
  <div class="more" v-loading="loading">
    <van-sticky :offset-top="0">
      <van-nav-bar title="品牌主页" left-arrow @click-left="onClickLeft">
        <template #right>
          <div class="more-index-nav">
            <van-icon name="search" @click="onClickSearch" />
            <!-- <van-icon name="share" @click="showShareFn" /> -->
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="more__block">
      <div class="more__top-nav">
        <div class="more-info">
          <div class="info-image-name">
            <div class="info-block">
              <img
                :src="dataList.kjwl_e_portrait"
                :alt="dataList.kjwl_e_name"
                class="info-img"
              />
              <span class="info-text">{{ dataList.kjwl_e_name }}</span>
            </div>
          </div>
          <div class="info-company">
            <van-icon name="phone-o" color="#60C5F1" />
            <span class="info-company-text">{{ dataList.kjwl_e_phone }}</span>
          </div>
          <div class="info-company">
            <van-icon name="envelop-o" color="#60C5F1" />
            <span class="info-company-text">{{ dataList.kjwl_e_email }}</span>
          </div>
          <div class="info-company">
            <van-icon name="shield-o" color="#60C5F1" />
            <span class="info-company-text">{{ dataList.kjwl_e_website }}</span>
          </div>
          <div class="info-company" @click.stop="onMap(dataList)">
            <van-icon name="location-o" color="#60C5F1" />
            <span class="info-company-text">{{ dataList.kjwl_e_address }}</span>
          </div>
        </div>
      </div>
      <div class="more-Introduction">
        <div class="Introduction-title"><span>公司简介</span></div>
        <div class="Introduction-content">
          <span>{{ dataList.kjwl_e_resume }}</span>
        </div>
      </div>
    </div>

    <van-tabbar @change="onChange" route>
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item replace to="/news" icon="comment-o"
        >新闻</van-tabbar-item
      >
      <van-tabbar-item replace to="/personal-center" icon="friends-o"
        >个人中心</van-tabbar-item
      >
    </van-tabbar>
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

export default {
  data() {
    return {
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "QQ", icon: "qq" },
          { name: "复制链接", icon: "link" },
        ],
      ],
      dataList: {},
      id: "",
      loading: false,
    };
  },
  mounted() {
    console.log("route:", this.$route.params);
    this.id = this.$route.params.id;
    this.getIntroductionData();
  },
  methods: {
    onChange(index) {
      console.log("index:", index);
      // Notify({ type: "primary", message: index });
    },
    onClickLeft() {
      // Toast("返回");
      this.$router.push({ name: "company-index", params: { id: this.id } });
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
    onMap(item) {
      console.log("item-more:", item);
      this.$router.push({
        name: "company-map",
        params: {
          id: item.kjwl_e_id,
          data:item,
          companyType: variableEnum.companyKeyType.company_more,
        },
      });
    },
    async getIntroductionData() {
      this.loading = true;
      console.log("id:", this.id);
      try {
        var res = await this.$axios.get(
          `/api/www/getIntroductionData/${this.id}`
        );
        if (res) {
          console.log("getIntroductionData:", res);
          this.dataList = res.data;
          this.dataList.kjwl_e_resume = this.dataList.kjwl_e_resume.substring(
            4,
            this.dataList.kjwl_e_resume.length - 5
          );
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
.more-index-nav {
  width: 50px;
  height: auto;
  //   background-color: burlywood;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
}
.more__block {
  width: 100%;
  height: auto;
  //   background-color: burlywood;
  background-color: #fff;
  padding-bottom: 60px;
}
.more__top-nav {
  width: 100%;
  height: 230px;
  background-color: #0d6ce0;
  padding: 20px 10px 0px 10px;
  box-sizing: border-box;
}
.more-info {
  width: 100%;
  height: auto;
  background-color: #fff;
  .info-image-name {
    width: 100%;
    height: 70px;
    // background-color: coral;
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 0px 5px;
    box-sizing: border-box;
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
        display: block;
        width: 100%;
        height: 50px;
        // background-color: cornflowerblue;
        color: #333;
        margin-left: 5px;
        text-align: center;
        line-height: 50px;
      }
    }
  }
  .info-company {
    width: 100%;
    height: 30px;
    // background-color: cornflowerblue;
    margin: 10px 0px;
    font-size: 20px;
    display: flex;
    align-items: center;
    padding: 0px 5px 0px 8px;
    box-sizing: border-box;
    .info-company-text {
      font-size: 13px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      //   background-color: coral;
      margin-left: 5px;
    }
  }
}
.more-Introduction {
  width: 100%;
  height: auto;
  //   background-color: cornflowerblue;
  background-color: #fff;
  margin-top: 30px;
  padding: 0px 10px 10px 10px;
  box-sizing: border-box;
}
.Introduction-title {
  width: 100%;
  height: 50px;
  // background-color:darksalmon;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  line-height: 50px;
  border-bottom: 1px solid #f5f5f5;
}
.Introduction-content {
  width: 100%;
  height: auto;
  //   background-color: darksalmon;
  font-size: 15px;
  text-align: justify;
  text-indent: 2em;
  letter-spacing: 2px;
  line-height: 30px;
}
</style>