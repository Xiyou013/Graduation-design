<template>
  <div class="nodata">
    <div class="nodata_image">
      <img src="@/assets/暂无数据.png" alt="暂无数据" class="img-cont" />
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
          ? this.screenHeight - 40
          : this.screenWidth > 320 && this.screenWidth < 414
          ? this.screenHeight - 46
          : this.screenWidth >= 414 && this.screenWidth < 768
          ? this.screenHeight - 51
          : this.screenWidth >= 768
          ? this.screenHeight - 92
          : this.screenHeight - 46;
      this.$el.style.setProperty("--cont-height", height + "px");

      // this.topHeight = parseInt(this.$refs.select_tab.offsetHeight);
    },
  },
};
</script>

<style lang="less" scoped>
.nodata {
  width: 100%;
  height: var(--cont-height) !important;
  padding: 30px 15px 10px 15px;
  box-sizing: border-box;
  background-color: #fff;
  color: #333;
}
.nodata_image {
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
</style>