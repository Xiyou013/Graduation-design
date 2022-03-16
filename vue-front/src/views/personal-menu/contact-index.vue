<template>
  <div class="contact">
    <van-sticky :offset-top="0">
      <van-nav-bar
        left-this.telErrorMessage="返回"
        left-arrow
        @click-left="onClickLeft"
      >
        <template #title>
          <span>联系我们</span>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="contact-block">
      <div class="company-logo">
        <img :src="require('@/assets/qichacha.jpg')" alt="企业搜索" class="logo-image" />
        <div class='company-introduce'> 
          <span>
            企业信息搜索-企业信用信息查询V15.0.2
          </span>
        </div>
      </div>
      <div class="contact-list" v-for="(item,index) in dataLists" :key="index">
        <div class='company-menu'>
          <span>{{item.title}}</span>
          <span style='color:#B9B9B9'>{{item.content}}</span>
        </div>
        <van-icon name="arrow" color="#B9B9B9" class="company-arrow" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataLists: [
        {id:1, title: "客服电话",content: "4009282212"},
        {id:2, title: "发送邮件",content: "kefu@qiyesousuo.com"},
        {id:3, title: "打开官网",content: "www.qqss.com"},
        {id:4, title: "工作时间",content: "周一至周五 09:00:00 - 20:00:00"},
      ]
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
.contact-block {
  width: 100%;
  height: auto;
  color: #333;
  .company-logo {
    width: 100%;
    height: auto;
    // background-color: tan;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 40px 0px 20px 0px;
    box-sizing: border-box;
    .logo-image {
      width: 60px;
      height: 60px;
      border-radius: 10px;
    }
    .company-introduce{
      width: 100%;
      height:25px;
      // background-color: cadetblue;
      margin-top: 10px;
      text-align: center;
      font-size:15px;
      font-weight: bold;
      color:#333;
    }
  }
  .contact-list{
    width: 100%;
    height: 50px;
    // background-color:cadetblue;
    background-color: #fff;
    font-size:20px;
    display: flex;
    align-items: center;
    padding: 0px 10px 0px 15px;
    box-sizing: border-box;
    border-bottom: 1px solid #F2F2F2;
    .company-menu{
      width: 100%;
      height: 40px;
      // background-color:darksalmon;
      font-size:14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>