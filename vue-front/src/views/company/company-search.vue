<template>
  <div class="company" v-loading="loading">
    <van-sticky :offset-top="0">
      <div class="select__block" ref="select_tab">
        <div class="seltap__back">
          <van-icon
            name="arrow-left"
            :size="icon_size"
            custom-class="arrow_left"
            @click="seltapBack"
          />
        </div>
        <div class="select-input">
          <van-search
            v-model="seltext"
            @search="searchFn"
            @focus="tabsPlanToSelFn(variableEnum.tabsPlanToSelType.company)"
            :placeholder="keyword ? keyword : '请输入搜索关键词'"
          />
        </div>
        <div class="select-prompt">
          <el-button type="text" @click="seltapBack" v-if="seltext === ''"
            >取消</el-button
          >
          <el-button type="text" @click="searchFn" v-if="seltext !== ''"
            >搜索</el-button
          >
        </div>
        <div class="select-label">
          <span class="label-title">标签选择：</span>
          <div class="label-key">
            <el-cascader
              :value="label"
              :options="options"
              ref="labelRegion"
              :show-all-levels="false"
              clearable
              :props="props"
              @change="labelChange"
              popper-class="train-tree"
            ></el-cascader>
          </div>
        </div>
      </div>
    </van-sticky>

    <div class="company__block" v-show="showBlock">
      <div
        class="company-list"
        v-for="(item, index) in dataList"
        :key="index"
        @click="onCompanyIndex(item)"
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
            <span v-if="item.focus === 0" @click.stop="onCollectCompany(item)"
              >+ <span>关注</span></span
            >
            <span v-if="item.focus === 1">已关注</span>
          </div>
        </div>
        <div class="list-personal-money-time">
          <div class="list-personal">
            <div class="list-personal-text">
              <span>法定代表人</span>
            </div>
            <div class="list-personal-name">
              <!-- @click.stop="onPersonal(item)" -->
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
          <div class="list-website" @click.stop="onWebsite(item)">
            <van-icon name="shield-o" color="#60C5F1" />
            <span class="list-website-text">网址</span>
          </div>
        </div>
      </div>
    </div>

    <div class="company__block" v-show="!showBlock">
      <noSearchContent />
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
  </div>
</template>

<script>
import { Toast } from "vant";
import variableEnum from "@/utils/variableEnum.js";
import noSearchContent from "@/components/searchTabsPlans/noSearchContent.vue";

export default {
  components: { noSearchContent },
  watch: {
    screenWidth() {
      this.changeVariable();
      // this.getTopHeight();
    },
  },
  data() {
    return {
      variableEnum,
      seltext: "",
      icon_size: 20,
      screenWidth: document.body.clientWidth,
      loading: false,
      showBlock: true,
      dataList: [],
      options: [],
      keyword: "",
      label: "",
      labelkey: "",
      props: {
        value: "qyss_l_id",
        label: "qyss_l_name",
        children: "children",
      },
    };
  },
  mounted() {
    this.changeVariable();
    // this.getTopHeight();
    console.log("route:", this.$route.params);
    this.keyword = this.$route.params.keyword || localStorage.keyword;
    this.userid = localStorage.userid;
    this.getCompanyList();
    this.selectCascader();
    const that = this;
    window.addEventListener("resize", function () {
      return (() => {
        that.screenWidth = document.body.clientWidth;
      })();
    });
  },
  methods: {
    seltapBack() {
      this.$router.push("/home");
    },
    searchFn() {
      console.log("search:", this.seltext);
    },
    onChange(index) {
      console.log("index:", index);
      // Notify({ type: "primary", message: index });
    },
    tabsPlanToSelFn(val) {
      console.log("val:", val);
      this.$router.push({
        path: "/search",
        query: {
          active: val,
        },
      });
    },
    async selectCascader() {
      let res = await this.$axios.get("/api/admin/news/selectCascader");
      console.log(res.data);
      if (res.data) this.options = res.data;
    },
    changeVariable() {
      console.log("screenWidth:", this.screenWidth);
      // this.topHeight = parseInt(this.$refs.select_tab.offsetHeight);
      this.icon_size =
        this.screenWidth <= 320
          ? 15
          : this.screenWidth > 320 && this.screenWidth < 414
          ? 20
          : this.screenWidth >= 414 && this.screenWidth < 768
          ? 23
          : this.screenWidth >= 768
          ? 35
          : 20;
    },
    onCompanyIndex(item) {
      console.log("item:", item);
      this.$router.push({
        name: "company-index",
        params: {
          id: item.kjwl_e_id,
          companytype: variableEnum.companyKeyType.company_search,
        },
      });
    },
    onWebsite(item) {
      console.log("item-website:", item);
      // this.$router.push("/home");
    },
    async onCollectCompany(item) {
      console.log("item-ce:", item);
      this.loading = true;
      try {
        var res = await this.$axios.get(
          `/api/www/addCollectCompany/${item.kjwl_e_id}/${this.userid}`
        );
        if (res) {
          console.log("res:", res);
          Toast({
            message: res.data.message,
            position: "bottom",
          });
          this.getCompanyList();
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
    onPersonal(item) {
      console.log("item-personal:", item);
      this.$router.push({
        name: "boss-search",
        params: {
          keyword: item.kjwl_e_lrpeople,
          type: variableEnum.personKeyType.company_search,
        },
      });
    },
    async getCompanyList() {
      this.loading = true;
      console.log("keyword:", this.keyword);
      let params = {
        keyword: this.keyword,
        userid: this.userid,
        labelkey: this.labelkey,
      };
      try {
        var res = await this.$axios.post(`/api/www/getCompanyList`, params);
        if (res) {
          console.log("getCompanyListres:", res);
          this.dataList = res.data;
          if (this.dataList.length <= 0) this.showBlock = false;
          if (this.dataList.length > 0) this.showBlock = true;
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
    labelChange(val) {
      this.handlechange(val, "labelRegion");
    },
    handlechange(val, cascaderName, num) {
      console.log("val:", val, num);
      this.label = val;
      let CheckedNodes = this.$refs[cascaderName].getCheckedNodes();
      console.log("data1:", CheckedNodes);
      if (CheckedNodes[0]) this.labelkey = CheckedNodes[0].label;
      else this.labelkey = "";
      console.log("plabel:", this.label, this.labelkey);
      this.getCompanyList();
      const _cascader = this.$refs[cascaderName];
      if (_cascader) {
        _cascader.$refs.panel.checkedValue = [];
        _cascader.$refs.panel.activePath = [];
        _cascader.$refs.panel.syncActivePath();
      }
    },
  },
};
</script>

<style>
.train-tree .el-cascader-node {
  padding: 0px !important;
  width: 120px !important;
}
/* .train-tree .el-cascader-panel {
  width: 120px !important;
} */
.train-tree .el-cascader-menu {
  min-width: 0 !important;
  width: 120px !important;
}
.train-tree .el-cascader-menu__list {
  padding: 0px !important;
}
</style>

<style lang="less" scoped>
.select__block {
  width: 100%;
  height: 100px;
  background-color: #fff;
  // background-color: cornflowerblue;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .seltap__back,
  .select-prompt {
    width: 10%;
    height: 30px;
    /* background-color: coral; */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .select-input {
    width: 80%;
    height: 30px;
  }
  // .select-prompt {
  //   width: 10%;
  //   height: 30px;
  //   // background-color: coral;
  //   display: flex;
  //   align-items: center;
  // }
  .select-label {
    width: 100%;
    height: 30px;
    // background-color: cadetblue;
    display: flex;
    border-bottom: 2px solid rgb(100 101 102 / 12%);
    .label-title {
      display: block;
      width: 23%;
      height: 30px;
      // background-color: burlywood;
      font-size: 14px;
      text-align: center;
      line-height: 30px;
    }
    .label-key {
      width: 77%;
      height: 30px;
      /deep/.el-cascader {
        top: -16px;
        width: 100%;
        .el-input {
          .el-input__inner {
            height: 30px;
            border-radius: 0px;
            border: 0px solid #fff;
            font-size: 13px;
          }
        }
      }
    }
  }
}
// /deep/.el-cascader__dropdown {
//   /deep/.el-cascader-panel {
//     /deep/.el-cascader-menu {

//     }
//   }
// }
.van-search {
  padding: 0px;
}
.company__block {
  width: 100%;
  height: auto;
  //   background-color: burlywood;
  padding-bottom: 50px;
  // overflow: hidden;
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