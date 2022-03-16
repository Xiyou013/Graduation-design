<template>
  <div class="figure-encyclopedia" v-loading="loading">
    <van-sticky :offset-top="0">
      <van-nav-bar title="人物百科" left-arrow @click-left="onClickLeft">
        <template #right>
          <div class="news-index-nav">
            <van-icon name="search" @click="onClickSearch" />
            <!-- <van-icon name="share" @click="showShareFn" /> -->
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="figure-encyclopedia__block">
      <div class="info-one">
        <img
          class="info-image"
          :src="dataList.kjwl_p_portrait"
          :alt="dataList.kjwl_p_name"
        />
        <span class="info-name">{{ dataList.kjwl_p_name }}</span>
      </div>
      <div class="info-two">
        <div class="info-title"><span>简介</span></div>
        <div class="info-text">
          <span>{{ dataList.kjwl_p_resume }}</span>
        </div>
      </div>
      <div class="info-three">
        <div class="info-title"><span>基本信息</span></div>
        <div
          class="info-list"
          v-for="(item, index) in dataList.basic_information"
          :key="index"
        >
          <span class="list-title">{{ item.title }}</span>
          <span class="list-text">{{ item.text }}</span>
        </div>
      </div>
      <div class="info-four">
        <div class="info-title"><span>教育经历</span></div>
        <div
          class="info-listRecord"
          v-for="(item, index) in dataList.education_experience"
          :key="index"
        >
          <!-- <img
            class="list-image"
            :src="item.schoolImgurl"
            :alt="item.schoolName"
          /> -->
          <!-- <div class="list-name-record">
            <span class="list-name">{{ item.schoolName }}</span>
            <span class="list-record">{{ item.schoolRecord }}</span>
          </div>
          <span class="list-time">{{ item.learningTime }}</span> -->
          <div class='list-cont'>
            <span>{{ item.scontent }}</span>
          </div>
        </div>
      </div>
      <div class="info-five">
        <div class="info-title"><span>任职履历</span></div>
        <div
          class="info-listRecord"
          v-for="(item, index) in dataList.for_record"
          :key="index"
        >
          <!-- <img
            class="list-image"
            :src="item.companyImgurl"
            :alt="item.companyName"
          />
          <div class="list-name-record">
            <span class="list-name">{{ item.companyName }}</span>
            <span class="list-record">{{ item.companyPosition }}</span>
          </div>
          <span class="list-time">{{ item.workingTime }}</span> -->
          <div class='list-cont'>
            <span>{{ item.rcontent }}</span>
          </div>
        </div>
      </div>
      <div class="info-six">
        <div class="info-title"><span>重要事件</span></div>
        <div class="info-text">
          <span>{{ dataList.kjwl_p_event }}</span>
        </div>
      </div>
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
export default {
  data() {
    return {
      showShare: false,
      loading: false,
      id: "",
      dataList: {},
      personData: {},
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "QQ", icon: "qq" },
          { name: "复制链接", icon: "link" },
        ],
      ],
      personDataList: {
        basic_information: [
          {
            id: 1,
            title: "出生年月",
            englishname: "kjwl_p_birthdate",
            text: "",
          },
          {
            id: 2,
            title: "最高学历",
            englishname: "kjwl_p_recordschool",
            text: "",
          },
          {
            id: 3,
            title: "毕业院校",
            englishname: "kjwl_p_graduateschool",
            text: "",
          },
          {
            id: 4,
            title: "所学专业",
            englishname: "kjwl_p_professional",
            text: "",
          },
          {
            id: 5,
            title: "任职企业",
            englishname: "kjwl_p_enterprise",
            text: "",
          },
          { id: 6, title: "职务", englishname: "kjwl_p_position", text: "" },
        ],
        education_experience: [
          // {
          //   schoolImgurl: require("@/assets/人物.png"),
          //   schoolName: "重庆大学",
          //   schoolRecord: "本科",
          //   learningTime: "1963年—1967年",
          // },
          // {
          //   schoolImgurl: require("@/assets/人物.png"),
          //   schoolName: "重庆大学",
          //   schoolRecord: "本科",
          //   learningTime: "1963年—1967年",
          // },
        ],
        for_record: [
          // {
          //   companyImgurl: require("@/assets/人物.png"),
          //   companyName: "华为技术有限公司",
          //   companyPosition: "总裁",
          //   workingTime: "1988年—至今",
          // },
          // {
          //   companyImgurl: require("@/assets/人物.png"),
          //   companyName: "深圳南油（集团）有限公司",
          //   companyPosition: "-",
          //   workingTime: "1982年—1984年",
          // },
        ],
      },
    };
  },
  mounted() {
    console.log("route:", this.$route.params);
    this.id = this.$route.params.id;
    this.personData = this.$route.params.data;
    this.initialize();
  },
  methods: {
    initialize() {
      this.dataList = {
        ...this.personDataList,
        ...this.personData,
      };
      this.dataList.basic_information = this.PersonFormat(
        this.dataList.basic_information
      );
      this.dataList.education_experience = this.dataList.kjwl_p_experience;
      this.dataList.for_record = this.dataList.kjwl_p_record;
      console.log("this.dataList", this.dataList);
    },
    onChange(index) {
      console.log("index:", index);
      // Notify({ type: "primary", message: index });
    },
    onClickLeft() {
      // Toast("返回");
      this.$router.push({ name: "boss-index", params: { id: this.id } });
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
    PersonFormat(data) {
      for (var i = 0; i < data.length; i++) {
        data[i].text = this.dataList[data[i].englishname];
      }
      return data;
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
.figure-encyclopedia__block {
  width: 100%;
  height: auto;
}
.info-one {
  width: 100%;
  height: auto;
  padding: 15px 10px;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  align-items: center;
  .info-image {
    width: 45px;
    height: 45px;
    background-color: #fff;
    border-radius: 3px;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    object-fit: contain;
  }
  .info-name {
    display: block;
    margin-left: 8px;
    font-size: 14px;
  }
}
.info-two,
.info-three,
.info-four,
.info-five,
.info-six {
  width: 100%;
  height: auto;
  margin-top: 15px;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  color: #333;
  display: flex;
  flex-wrap: wrap;
}
.info-title {
  width: 100%;
  font-size: 15px;
  padding: 10px 0px;
  box-sizing: border-box;
  border-bottom: 1px solid #e6e6e6;
}
.info-text {
  font-size: 12px;
  // padding: 10px;
  // box-sizing: border-box;
  text-align: justify;
  letter-spacing: 1px;
}
.info-list {
  width: 48%;
  height: auto;
  font-size: 14px;
  margin: 10px 0px;
  //   background-color: cadetblue;
}
.info-list:nth-child(odd) {
  width: 52%;
  //   background-color: darksalmon;
  padding-left: 4%;
  box-sizing: border-box;
  border-left: 1px solid #f5f5f5;
}
.list-title {
  display: flex;
  width: 100%;
  height: 30px;
  color: #8c8c8c;
  align-items: center;
}
.list-text {
  display: flex;
  width: 100%;
  height: 30px;
  color: #333;
  align-items: center;
}
.info-listRecord {
  width: 100%;
  height: auto;
  // background-color: burlywood;
  background-color: #fff;
  margin-bottom: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
  display: flex;
  border-bottom: 1px solid #f5f5f5;
  .list-cont{
    font-size: 13px;
  }
  .list-image {
    width: 40px;
    height: 40px;
    background-color: #fff;
    border: 1px solid #f0f0f0;
    box-sizing: border-box;
    border-radius: 3px;
  }
  .list-name-record {
    width: 100%;
    height: 40px;
    // background-color: cadetblue;
    font-size: 13px;
    padding-left: 5px;
    box-sizing: border-box;
    .list-name,
    .list-record {
      display: block;
      width: 100%;
      height: 20px;
    }
    .list-name {
      color: #54c1f0;
    }
    .list-record {
      color: #8c8c8c;
    }
  }
  .list-time {
    width: 150px;
    height: 40px;
    // background-color: coral;
    font-size: 12px;
    line-height: 40px;
    color: #8c8c8c;
  }
}
</style>