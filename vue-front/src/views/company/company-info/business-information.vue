<template>
  <div class="business" v-loading="loading">
    <van-sticky :offset-top="0">
      <van-nav-bar :title="companyName" left-arrow @click-left="onClickLeft">
        <template #right>
          <div class="business-index-nav">
            <van-icon name="search" @click="onClickSearch" />
            <!-- <van-icon name="share" @click="showShareFn" /> -->
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>

    <div class="business__block">
      <div class="business-info-one">
        <div class="info-one-title">
          <span>登记信息</span>
        </div>
        <div class="info-one-legalPerson" @click.stop="onPersonal">
          <span class="legalPerson-title">法定代表人</span>
          <span class="legalPerson-name">{{
            dataList.legalPerson || "-"
          }}</span>
        </div>
        <div class="info-one-part">
          <div
            class="part__block"
            v-for="(item, index) in dataList.onepart"
            :key="index"
          >
            <span class="part__block-title">{{ item.title || "-" }}</span>
            <span class="part__block-text">
              {{ item.text || "-" }}
              <!-- <span v-if="item.englishname === 'kjwl_e_regcapital' || item.englishname === 'kjwl_e_concapital'">万元人民币</span>
              <span v-if="item.englishname === 'kjwl_e_staffnum'">
                {{ item.text}}
              </span> -->
            </span>
          </div>
        </div>
      </div>
      <div class="business-info-two">
        <div
          class="part__block"
          v-for="(item, index) in dataList.twopart"
          :key="index"
        >
          <span class="part__block-title">{{ item.title || "-" }}</span>
          <span class="part__block-text">{{ item.text || "-" }}</span>
        </div>
      </div>
      <div class="business-info-three">
        <div
          class="part__inline-block"
          v-for="(item, index) in dataList.threepart"
          :key="index"
        >
          <span class="part__inline-block-title">{{ item.title || "-" }}</span>
          <span class="part__inline-block-text">{{ item.text || "-" }}</span>
        </div>
      </div>
      <div class="business-info-four">
        <div
          class="part__inline-block"
          v-for="(item, index) in dataList.fourpart"
          :key="index"
        >
          <span class="part__inline-block-title">{{ item.title || "-" }}</span>
          <span class="part__inline-block-text part-textarea">{{
            item.text || "-"
          }}</span>
        </div>
      </div>
      <div class="business-info-five">
        <div
          class="part__inline-block"
          v-for="(item, index) in dataList.fivepart"
          :key="index"
        >
          <span class="part__inline-block-title">{{ item.title || "-" }}</span>
          <span class="part__inline-block-text">{{ item.text || "-" }}</span>
        </div>
      </div>
      <div class="business-info-six">
        <div
          class="part__inline-block"
          v-for="(item, index) in dataList.sixpart"
          :key="index"
          @click.stop="onMap(item)"
        >
          <span class="part__inline-block-title">{{ item.title || "-" }}</span>
          <span class="part__inline-block-text six-part-text">
            <van-icon :name="item.icon" color="#54C1F0" />
            <span class="six-text">{{ item.text || "-" }}</span>
          </span>
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
import variableEnum from "@/utils/variableEnum.js";

export default {
  data() {
    return {
      showShare: false,
      loading: false,
      variableEnum,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "QQ", icon: "qq" },
          { name: "复制链接", icon: "link" },
        ],
      ],
      companyName: "",
      companydata: {},
      companySpecificData: {},
      dataList: {
        legalPerson: "",
        legalPersonId: "",
        onepart: [
          { id: 1, title: "成立日期", englishname: "kjwl_e_setdate", text: "" },
          // { id: 2, title: "登记状态", englishname: "kjwl_e_registration_status", text: "存续" },
          {
            id: 3,
            title: "注册资本",
            englishname: "kjwl_e_regcapital",
            text: "",
          },
          {
            id: 4,
            title: "实缴资本",
            englishname: "kjwl_e_concapital",
            text: "",
          },
          { id: 5, title: "企业类型", englishname: "kjwl_e_type", text: "" },
          {
            id: 6,
            title: "参保人数",
            englishname: "kjwl_e_ginsengnum",
            text: "",
          },
          {
            id: 7,
            title: "人员规模",
            englishname: "kjwl_e_staffnum",
            text: "",
          },
        ],
        twopart: [
          {
            id: 1,
            title: "统一社会信用代码",
            englishname: "kjwl_e_utscc",
            text: "",
          },
          {
            id: 2,
            title: "纳税人识别号",
            englishname: "kjwl_e_taxpayernum",
            text: "",
          },
          {
            id: 3,
            title: "工商注册号",
            englishname: "kjwl_e_bregnum",
            text: "",
          },
          {
            id: 4,
            title: "组织机构代码",
            englishname: "kjwl_e_orgcode",
            text: "",
          },
          {
            id: 5,
            title: "进出口企业代码",
            englishname: "kjwl_e_iaeecode",
            text: "",
          },
          {
            id: 6,
            title: "纳税人资质",
            englishname: "kjwl_e_taxpayerqua",
            text: "",
          },
        ],
        threepart: [
          {
            id: 1,
            title: "英文名",
            englishname: "kjwl_e_ename",
            text: "",
          },
          {
            id: 2,
            title: "中文名",
            englishname: "kjwl_e_fname",
            text: "",
          },
          {
            id: 3,
            title: "所属行业",
            englishname: "kjwl_e_industry",
            text: "",
          },
        ],
        fourpart: [
          {
            id: 1,
            title: "经营范围",
            englishname: "kjwl_e_businessscope",
            text: "",
          },
        ],
        fivepart: [
          {
            id: 1,
            title: "营业期限",
            englishname: "kjwl_e_businessterm",
            text: "",
          },
          {
            id: 2,
            title: "核准日期",
            englishname: "kjwl_e_approvaldate",
            text: "",
          },
          {
            id: 3,
            title: "登记机关",
            englishname: "kjwl_e_regauthority",
            text: "",
          },
        ],
        sixpart: [
          {
            id: 1,
            title: "电话",
            englishname: "kjwl_e_phone",
            text: "",
            icon: "phone-o",
          },
          {
            id: 2,
            title: "官网",
            englishname: "kjwl_e_website",
            text: "",
            icon: "shield-o",
          },
          {
            id: 3,
            title: "邮箱",
            englishname: "kjwl_e_email",
            text: "",
            icon: "envelop-o",
          },
          {
            id: 4,
            title: "地址",
            englishname: "kjwl_e_address",
            text: "",
            icon: "location-o",
          },
        ],
      },
    };
  },
  mounted() {
    console.log("route:", this.$route.params);
    this.companydata = this.$route.params.data;
    this.getCompanySpecificData();
  },
  methods: {
    initialize() {
      this.companyName = this.companydata.kjwl_e_name;
      this.dataList.legalPerson = this.companydata.kjwl_e_lrpeople;
      this.dataList.legalPersonId = this.companydata.kjwl_p_id;
      this.dataList.onepart = this.companyFormat(this.dataList.onepart);
      this.dataList.twopart = this.companyFormat(this.dataList.twopart);
      this.dataList.threepart = this.companyFormat(this.dataList.threepart);
      this.dataList.fourpart = this.companyFormat(this.dataList.fourpart);
      this.dataList.fivepart = this.companyFormat(this.dataList.fivepart);
      this.dataList.sixpart = this.companyFormat(this.dataList.sixpart);
    },
    onChange(index) {
      console.log("index:", index);
      // Notify({ type: "primary", message: index });
    },
    onMap(item) {
      console.log("item-more:", item);
      if (item.englishname === "kjwl_e_address") {
        this.$router.push({
          name: "company-map",
          params: {
            data: this.companydata,
            companyType: variableEnum.companyKeyType.business_information,
          },
        });
      }
      // this.$router.push({
      //   name: "company-map",
      //   params: { id: item.kjwl_e_id },
      // });
    },
    onClickLeft() {
      // Toast("返回");
      this.$router.push({
        name: "company-index",
        params: { id: this.companydata.kjwl_e_id },
      });
    },
    onPersonal() {
      console.log("item-personal:", this.companydata);
      this.$router.push({
        name: "boss-index",
        params: {
          id: this.companydata.kjwl_p_id,
          data: this.companydata,
          persontype: variableEnum.personKeyType.business_information,
        },
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
    async getCompanySpecificData() {
      this.loading = true;
      console.log("companydata:", this.companydata);
      try {
        var res = await this.$axios.get(
          `/api/www/getCompanySpecificData/${this.companydata.kjwl_e_id}`
        );
        if (res) {
          console.log("getCompanySpecificData:", res);
          this.companySpecificData = res.data;
          this.companydata = {
            ...this.companydata,
            ...this.companySpecificData,
          };
          console.log("companySpecificData:", this.companySpecificData);
          console.log("companydata:", this.companydata);

          this.initialize();
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
    companyFormat(data) {
      for (var i = 0; i < data.length; i++) {
        if (
          data[i].englishname === "kjwl_e_regcapital" ||
          data[i].englishname === "kjwl_e_concapital"
        ) {
          data[i].text = this.companydata[data[i].englishname] + "万元人民币";
        } else if (data[i].englishname === "kjwl_e_staffnum") {
          if (this.companydata[data[i].englishname] <= 20)
            data[i].text = "0-20人";
          if (
            this.companydata[data[i].englishname] > 20 &&
            this.companydata[data[i].englishname] <= 50
          )
            data[i].text = "20-50人";
          if (
            this.companydata[data[i].englishname] > 50 &&
            this.companydata[data[i].englishname] <= 100
          )
            data[i].text = "50-100人";
          if (this.companydata[data[i].englishname] > 100) {
            let num = this.companydata[data[i].englishname].substring(0, 1);
            for (
              var j = 0;
              j < this.companydata[data[i].englishname].length - 1;
              j++
            ) {
              num = num + "0";
            }
            data[i].text = num + "人以上";
          }
        } else if (data[i].englishname === "kjwl_e_businessscope") {
          data[i].text = this.companydata[data[i].englishname].substring(
            4,
            this.companydata[data[i].englishname].length - 5
          );
        } else {
          data[i].text = this.companydata[data[i].englishname];
        }
      }
      return data;
    },
  },
};
</script>

<style lang="less" scoped>
.business-index-nav {
  width: 50px;
  height: auto;
  //   background-color: burlywood;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
}
.business__block {
  width: 100%;
  height: auto;
  //   background-color: darksalmon;
  //   background-color: #fff;
  color: #333;
}
.business-info-one {
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  .info-one-title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    font-weight: bold;
    border-bottom: 1px solid #f5f5f5;
  }
  .info-one-legalPerson {
    width: 100%;
    height: auto;
    // background-color: burlywood;
    font-size: 14px;
    border-bottom: 1px solid #f5f5f5;
    .legalPerson-title {
      display: flex;
      width: 100%;
      height: 30px;
      color: #8c8c8c;
      // line-height: 30px;
      align-items: flex-end;
    }
    .legalPerson-name {
      display: flex;
      width: 100%;
      height: 30px;
      color: #54c1f0;
      // line-height: 30px;
      align-items: flex-start;
    }
  }
  .info-one-part {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
  }
}
.part__block {
  width: 48%;
  height: auto;
  font-size: 14px;
  margin: 10px 0px;
  // background-color: cadetblue;
}
.part__block:nth-child(even) {
  width: 52%;
  // background-color: darksalmon;
  padding-left: 4%;
  box-sizing: border-box;
  border-left: 1px solid #f5f5f5;
}
.part__block-title {
  display: flex;
  width: 100%;
  height: 30px;
  color: #8c8c8c;
  align-items: center;
}
.part__block-text {
  display: flex;
  width: 100%;
  height: 30px;
  color: #333;
  align-items: center;
}
.business-info-two,
.business-info-three,
.business-info-four,
.business-info-five,
.business-info-six {
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
}
.part__inline-block {
  width: 100%;
  height: auto;
  font-size: 14px;
  // background-color:burlywood;
}
.part__inline-block-title {
  display: flex;
  width: 100%;
  height: 30px;
  color: #8c8c8c;
  align-items: center;
}
.part__inline-block-text {
  display: flex;
  width: 100%;
  height: 30px;
  color: #333;
  align-items: center;
}
.part-textarea {
  height: auto;
  text-align: justify;
  letter-spacing: 2px;
  font-size: 12px;
}
.six-part-text {
  color: #54c1f0;
  font-size: 18px;
}
.six-text {
  font-size: 14px;
  margin-left: 5px;
}
</style>