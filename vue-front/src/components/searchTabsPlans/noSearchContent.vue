<template>
  <div class="noSearchContent">
    <div class="noCon_image">
      <img src="@/assets/暂无数据.png" alt="暂无数据" class="img-cont" />
    </div>
    <div class="noCon-text">
      <div class="noCon-title">
        <ul>
          <li><span>暂时没有找到相关数据</span></li>
          <li><span>您还可以尝试：</span></li>
        </ul>
      </div>
      <div class="noCon-content">
        <ul style="list-style-type: disc">
          <li><span>输入更准确的关键词，重新搜索</span></li>
          <li><span>重新确定内容范围，输入关键词进行搜索</span></li>
          <li><span>更换筛选条件，重新搜索</span></li>
          <li>
            <span>也可以将问题</span>
            <span style="color: #409eff" @click="toFeedback">反馈给客服</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    screenHeight() {
      this.changeVariable();
    },
  },
  data() {
    return {
      screenHeight: document.body.clientHeight,
      screenWidth: document.body.clientWidth,
    };
  },
  mounted() {
    this.changeVariable();
    const that = this;
    window.addEventListener("resize", function () {
      return (() => {
        that.screenHeight = document.body.clientHeight;
        that.screenWidth = document.body.clientWidth;
      })();
    });
  },
  methods: {
    changeVariable() {
      console.log("screenHeight:", this.screenHeight);
      console.log("screenWidth:", this.screenWidth);
      const height =
        this.screenWidth <= 320
          ? this.screenHeight - 85
          : this.screenWidth > 320 && this.screenWidth < 414
          ? this.screenHeight - 100
          : this.screenWidth >= 414 && this.screenWidth < 768
          ? this.screenHeight - 110
          : this.screenWidth >= 768
          ? this.screenHeight - 200
          : this.screenHeight - 100;
      this.$el.style.setProperty("--cont-height", height + "px");

      // this.topHeight = parseInt(this.$refs.select_tab.offsetHeight);
    },
    toFeedback() {
      this.$router.push({
        name: "opinion-index",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.noSearchContent {
  width: 100%;
  height: var(--cont-height) !important;
  padding: 30px 15px 10px 15px;
  box-sizing: border-box;
  background-color: #fff;
  color: #333;
}
.noCon_image {
  width: 100%;
  height: 45%;
  //   background-color: burlywood;
  display: flex;
  justify-content: center;
  .img-cont {
    height: 100%;
    object-fit: contain;
  }
}
.noCon-text {
  width: 100%;
  height: auto;
  font-size: 13px;
  // background-color: cadetblue;
  padding: 10px;
  box-sizing: border-box;
  background-color: #f2f2f2;
  letter-spacing: 1px;
  line-height: 25px;
  .noCon-title {
    border-bottom: 1px solid #bfbfbf;
    padding-bottom: 8px;
    box-sizing: border-box;
  }
  .noCon-content {
    padding-top: 8px;
    padding-left: 15px;
    box-sizing: border-box;
    
  }
}
</style>