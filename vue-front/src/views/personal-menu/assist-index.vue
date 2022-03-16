<template>
  <div class="assist">
    <van-sticky :offset-top="0">
      <van-nav-bar
        left-this.telErrorMessage="返回"
        left-arrow
        @click-left="onClickLeft"
      >
        <template #title>
          <span>用户帮助</span>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="assist__block">
      <div class="problem-ilst">
        <div class="problem-ilst-title">
          <span>常见问题列表</span>
        </div>
        <div
          class="problem__block"
          v-for="(item, index) in dataList"
          :key="index"
        >
          <div class="problem-title">
            <span>{{ index + 1 }}{{ "." }}{{ item.title }}</span>
          </div>
          <div
            class="problem-content"
            v-for="(value, keyword) in item.content"
            :key="keyword"
          >
            <span> {{ value.details }} </span>
          </div>
        </div>
      </div>
      <div class="feedback__block">
        <div class="feedback__block-title">
          <span>意见反馈</span>
        </div>
        <div class="feedback-path">
          <div class="feedback-path-title">
            <span>您可以通过以下途径向我们反馈您的意见与建议：</span>
          </div>
          <div
            class="feedback-path-list"
            v-for="(item, index) in pathList"
            :key="index"
          >
            <van-icon :name="item.icon" color='#BFBFBF'/>
            <div class="path-content">
              <span class="path-text"
                >{{ item.type
                }}<span class="path-details">{{ item.details }}</span></span
              >
              <van-icon name="arrow" color='#BFBFBF'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [
        {
          id: 1,
          title: "企业搜索的数据来源有哪些？",
          content: [
            {
              id: 1,
              details:
                "企业搜索的企业数据来源于全国企业信用信息公示系统、中国法院裁判文书网、中国执行信息公开网等100多家官方网站，并将各类信息统一处理、分类",
            },
          ],
        },
        {
          id: 2,
          title: "企业信息不是最新怎么办？",
          content: [
            {
              id: 1,
              details:
                "进入到你所查询的企业页面，点击公司名称下方的更新按钮，即可将数据更新至最新",
            },
          ],
        },
        {
          id: 3,
          title: "报告已支付成功但未收到？",
          content: [
            {
              id: 1,
              details:
                "在支付成功后，生成完整的报告需要一定的时间，请耐心等待，待状态显示为报告已发送，便可去所填写的邮箱去查看",
            },
          ],
        },
        {
          id: 4,
          title: "企业电话、地址等信息不对，如何纠错？",
          content: [
            {
              id: 1,
              details:
                "进入到你所查询的企业页面，点击右上角的纠错按钮，填写需要纠错的信息，提交后台审核，待后台审核通过即可显示您所填写的信息",
            },
          ],
        },
        {
          id: 5,
          title: "可以上传企业logo、企业简介等信息吗？",
          content: [
            {
              id: 1,
              details:
                "进入到你所查询的企业页面，点击右上角的认证按钮，在验证完企业身份信息后，便可上传企业logo、产品、企业介绍等信息",
            },
          ],
        },
        {
          id: 6,
          title: "支付成功后如何去开发票？",
          content: [
            {
              id: 1,
              details:
                "单个登录账号消费满两百元，即可至个人中心>订单列表申请开票",
            },
          ],
        },
        {
          id: 7,
          title: "积分有什么作用，及如何赚取积分？",
          content: [
            {
              id: 1,
              details:
                "积分可以累积抵现，用来购买报告，分享app内的功能或页面至微信、朋友圈、QQ、QQ空间即可获取积分",
            },
          ],
        },
        {
          id: 8,
          title: "开发票时，有哪些注意事项？",
          content: [
            {
              id: 1,
              details:
                "(1) 若因发票抬头、税号、地址电话、银行信息等错误可以退回重开；",
            },
            {
              id: 2,
              details:
                "(2) 发票金额不对不予以退回重开（开票金额以系统数据为准）；",
            },
            { id: 3, details: "(3) 专票要求换开普票不予以退回重开；" },
            { id: 4, details: "(4) 普票要求开具专票（跨月不予以重开）；" },
            {
              id: 5,
              details: "(5) 发票遗失抵扣联不予以重开，如需重开请按要求提供证明",
            },
          ],
        },
      ],
      pathList: [
        { id: 1, icon: "phone-o", type: "电话：", details: "400-928-2212" },
        { id: 2, icon: "envelop-o", type: "邮箱：", details: "kefu@qyss.com" },
      ],
    };
  },
  methods: {
    onClickLeft() {
      // Toast("返回");
      this.$router.push("/personal-center");
    },
  },
};
</script>

<style lang="less" scoped>
.assist__block {
  width: 100%;
  height: auto;
  // background-color: darksalmon;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
}
.problem-ilst {
  width: 100%;
  height: auto;
  // background-color: burlywood;
  .problem-ilst-title {
    width: 100%;
    height: 30px;
    // background-color: cadetblue;
    font-size: 15px;
    font-weight: bold;
    display: flex;
    align-items: center;
    border-bottom: 1px solid#F1F1F1;
  }
  .problem__block {
    width: 100%;
    height: auto;
    // background-color: cornflowerblue;
    .problem-title {
      width: 100%;
      height: auto;
      // background-color: darkseagreen;
      font-size: 14px;
      color: #60c5f1;
      padding: 10px 0px 5px 0px;
      box-sizing: border-box;
    }
    .problem-content {
      width: 100%;
      height: auto;
      // background-color: coral;
      color: #bfbfbf;
      font-size: 12px;
      line-height: 20px;
      padding: 3px 0px 8px 0px;
      box-sizing: border-box;
      text-align: justify;
      border-bottom: 1px solid#F1F1F1;
    }
  }
}
.feedback__block {
  width: 100%;
  height: 140px;
  // background-color: cadetblue;
  .feedback__block-title {
    width: 100%;
    height: 30px;
    // background-color: burlywood;
    font-size: 15px;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  .feedback-path {
    width: 100%;
    height: auto;
    .feedback-path-title {
      width: 100%;
      height: auto;
      // background-color: darkseagreen;
      font-size: 14px;
      color: #60c5f1;
      padding: 10px 0px 10px 0px;
      box-sizing: border-box;
      border-top: 1px solid #f1f1f1;
      border-bottom: 1px solid #f1f1f1;
    }
    .feedback-path-list {
      width: 100%;
      height: 35px;
      // background-color: coral;
      font-size: 20px;
      display: flex;
      align-items: center;
      .path-content {
        width: 100%;
        padding-left: 5px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .path-text {
          font-size: 13px;
          color: #333;
        }
        .path-details{
          color: #60c5f1;
        }
      }
    }
  }
}
</style>