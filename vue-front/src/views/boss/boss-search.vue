<template>
  <div class="boss" v-loading="loading">
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
            @focus="tabsPlanToSelFn(variableEnum.tabsPlanToSelType.boss)"
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

    <div class="boss__block" v-show="showBlock">
      <div
        class="boss-list"
        v-for="(item, index) in dataList"
        :key="index"
        @click="onBossIndex(item)"
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
            <span v-if="item.focus === 0" @click.stop="onCollectPerson(item)"
              >+ <span>关注</span></span
            >
            <span v-if="item.focus === 1">已关注</span>
          </div>
        </div>
        <div
          class="boss-companyList"
          v-for="(value, key) in item.company"
          :key="key"
        >
          <!-- @click.stop="onCompany(value)" -->
          <img
            :src="value.kjwl_e_portrait"
            :alt="value.kjwl_e_name"
            class="companyList-image"
          />
          <span class="companyList-name">{{ value.kjwl_e_name }}</span>
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
      showBlock: true,
      loading: false,
      keyword: "",
      dataList: [],
      options: [],
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
    this.persontype =
      this.$route.params.type || variableEnum.personKeyType.home;
    this.getPersonList();
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
      switch (this.persontype) {
        case variableEnum.personKeyType.company_search:
          this.$router.push({
            name: "company-search",
            params: {},
          });
          break;
        case variableEnum.personKeyType.home:
          this.$router.push("/home");
          break;
      }
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
    onBossIndex(item) {
      console.log("item:", item);
      this.$router.push({
        name: "boss-index",
        params: {
          id: item.kjwl_p_id,
          persontype: variableEnum.personKeyType.boss_search,
        },
      });
    },
    onCompany(item) {
      console.log("item-company:", item);
      this.$router.push("/company-index");
    },
    async getPersonList() {
      this.loading = true;
      console.log("keyword:", this.keyword);
      let params = {
        keyword: this.keyword,
        userid: this.userid,
        labelkey: this.labelkey,
      };
      try {
        var res = await this.$axios.post(`/api/www/getPersonList`, params);
        if (res) {
          console.log("getPersonList:", res);
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
    async onCollectPerson(item) {
      console.log("item-cp:", item);
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
          this.getPersonList();
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
      this.getPersonList();
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
.van-search {
  padding: 0px;
}
.boss__block {
  width: 100%;
  height: auto;
  //   background-color: burlywood;
  padding-bottom: 50px;
  // overflow: hidden;
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