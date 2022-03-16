<template>
  <el-drawer
    :title="isTitle ? `${username}的纠错反馈` : `${username}的意见反馈`"
    :visible.sync="showDrawer"
    size="600px"
  >
    <div class="feedback_drawer">
      <div v-if="isTitle" class="feedback-title">
        <span>纠错对象：</span>
        <span>{{
          detailData.kjwl_p_id ? detailData.bossData.kjwl_p_name : ""
        }}</span>
        <span>{{
          detailData.kjwl_e_id ? detailData.companyData.kjwl_e_name : ""
        }}</span>
      </div>
      <div class="feedback-content">
        {{ content }}
      </div>
      <div class="feedback-contact">
        <div class="contact-title">
          <span>联系方式：</span>
        </div>
        <div class="contact-div">
          <span>电话：</span
          ><span>{{ phone || "-" }}</span>
        </div>
        <div class="contact-div">
          <span>邮箱：</span
          ><span>{{ email || "-" }}</span>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    detail: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    showDrawer: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
    isTitle() {
      return this.detail.kjwl_p_id || this.detail.kjwl_e_id;
    },
    username() {
      return this.detail.person ? this.detail.person.kjwl_yu_name : "";
    },
    phone() {
      return this.detail.person ? this.detail.person.kjwl_yu_phone : "";
    },
    email() {
      return this.detail.person ? this.detail.person.kjwl_yu_email : "";
    },
    detailData() {
      return this.detail;
    },
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.refresh();
        } else {
          return false;
        }
      },
    },
  },
  data() {
    return {
      content: "",
    };
  },
  methods: {
    refresh() {
      console.log("refresh:", this.showDrawer, this.detailData);

      this.content = "";
      this.content = this.detailData.qyss_uf_content.substring(
        4,
        this.detailData.qyss_uf_content.length - 5
      );
    },
  },
};
</script>

<style scoped>
.feedback_drawer {
  /* background-color: cadetblue; */
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  overflow-y: scroll;
  color: #333;
}
.feedback-title {
  /* background-color: coral; */
  width: 100%;
  height: auto;
  color: #333;
  margin-bottom: 15px;
}
.feedback-content {
  width: 100%;
  height: auto;
  /* background-color: cornflowerblue; */
  text-indent: 2em;
  margin-bottom: 15px;
}
.feedback-contact {
  width: 100%;
  height: auto;
  /* background-color: burlywood; */
}
.contact-div {
  padding-left: 1em;
  box-sizing: border-box;
  margin-top: 8px;
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 6px;
  height: 10px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255);
  border-radius: 10px;
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(194, 193, 193, 0.3);
  background-color: rgb(167, 164, 164);
}
</style>