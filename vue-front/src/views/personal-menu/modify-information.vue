<template>
  <div class="modify-information" v-loading="loading">
    <van-sticky :offset-top="0">
      <van-nav-bar
        left-this.telErrorMessage="返回"
        left-arrow
        @click-left="onClickLeft"
        ref="select_tab"
      >
        <template #title>
          <span>{{ title }}</span>
        </template>
        <template #right v-if="type !== 1">
          <el-button type="text" @click="inputFn">提交</el-button>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div v-show="type !== 5 && type !== 1" class="modify-information__block">
      <el-input
        placeholder="请输入内容"
        v-model="input"
        clearable
        @change="inputFn"
      >
      </el-input>
    </div>
    <div v-show="type === 5" class="modify-information__block">
      <div id="toolbar-container" class="toolbar"></div>
      <div id="opinion__editor" class="opinion__editor"></div>
    </div>
    <div v-show="type === 1" class="modify-information__block portrait__block">
      <div class="user-portrait">
        <el-upload
          class="avatar-uploader"
          action=""
          accept=".jpg,.png"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="fileChange"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="bottom-btn">
        <van-button type="info" class="logOut" block @click="onSubmit"
          >确定提交</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import E from "wangeditor";
export default {
  watch: {
    screenHight() {
      this.getTopHeight();
    },
  },
  data() {
    return {
      title: "",
      type: "",
      input: "",
      editor: "",
      screenHight: document.body.clientHeight,
      imageUrl: "",
      file: "",
      userdata: "",
      params: {},
      loading: false,
    };
  },
  mounted() {
    console.log("router:", this.$route.params);
    this.title = this.$route.params.title;
    this.type = this.$route.params.type;
    this.params.id = localStorage.userid;
    this.params.account = localStorage.accountdetails;
    this.getUserdata();
    // this.refresh();
    this.getTopHeight();
    const that = this;
    window.addEventListener("resize", function () {
      return (() => {
        that.screenHight = document.body.clientHeight;
      })();
    });
  },
  methods: {
    async refresh() {
      // this.editor = new E("#opinion__editor");
      this.editor = new E("#toolbar-container", "#opinion__editor");
      this.editor.config.height = 300;
      this.editor.config.zIndex = 1;
      this.editor.config.menus = [
        "bold",
        "head",
        "link",
        "italic",
        "underline",
      ];
      this.editor.create();
      let str = '"<p>';
      let str1 = '</p>"';
      let res = str + this.userdata.kjwl_yu_signature + str1;
      let data = JSON.parse(res);
      this.editor.txt.html(data);
    },
    onClickLeft() {
      // Toast("返回");
      this.$router.push("/personal-information");
    },
    async getUserdata() {
      this.loading = true;
      this.userdata = "";
      console.log("params:", this.params);
      try {
        var res = await this.$axios.get(
          `/api/www/getUserdata/${this.params.id}/${this.params.account}`
        );
        if (res) {
          console.log("res:", res);
          this.userdata = res.data;
          this.refresh();
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
    async onSubmit() {
      console.log("这是头像提交", this.imageUrl);
      if (!this.imageUrl) {
        Toast({
          message: "请重新选择要上传的头像",
          position: "bottom",
        });
        return;
      }
      this.loading = true;
      console.log("params:", this.params);
      try {
        var res = await this.$axios.post(
          `/api/www/EditUserPortrait`,
          this.params
        );
        if (res) {
          console.log("res:", res);
          Toast({
            message: res.data.message,
            position: "bottom",
          });
          localStorage.setItem("userportrait", this.params.imageUrl);
          this.$store.commit("SET_PROTRAIT", this.params.imageUrl);
          this.onClickLeft();
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
    inputFn() {
      console.log("这是提交");
      if (this.type !== 5 && this.type !== 1) {
        console.log("input:", this.input, this.type);
        if (this.input === "" || this.input === null) {
          Toast({
            message: "输入为空，请重新输入或返回首页",
            position: "bottom",
          });
        } else {
          if (this.type === 4) this.emailfn(this.input);
          if (this.type === 3) this.phonefn(this.input);
          if (this.type === 2) this.namefn(this.input);
        }
      }
      if (this.type === 5) {
        this.text = this.editor.txt.html();
        console.log("text:", this.text);
        this.params.signature = this.FormatSignature(this.text);
        if (this.text === "" || this.text === null) {
          Toast({
            message: "输入为空，请重新输入或返回首页",
            position: "bottom",
          });
          return;
        }
        this.EditSignature();
      }
    },
    async EditSignature() {
      this.loading = true;
      console.log("params:", this.params);
      try {
        var res = await this.$axios.post(
          `/api/www/EditUserSignature`,
          this.params
        );
        if (res) {
          console.log("res:", res);
          Toast({
            message: res.data.message,
            position: "bottom",
          });
          this.onClickLeft();
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
    async EditEmail() {
      this.loading = true;
      console.log("params:", this.params);
      try {
        var res = await this.$axios.post(`/api/www/EditUserEmail`, this.params);
        if (res) {
          console.log("res:", res);
          Toast({
            message: res.data.message,
            position: "bottom",
          });
          this.onClickLeft();
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
    async EditPhone() {
      this.loading = true;
      console.log("params:", this.params);
      try {
        var res = await this.$axios.post(`/api/www/EditUserPhone`, this.params);
        if (res) {
          console.log("res:", res);
          Toast({
            message: res.data.message,
            position: "bottom",
          });
          this.onClickLeft();
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
    async EditName() {
      this.loading = true;
      console.log("params:", this.params);
      try {
        var res = await this.$axios.post(`/api/www/EditUserName`, this.params);
        if (res) {
          console.log("res:", res);
          Toast({
            message: res.data.message,
            position: "bottom",
          });
          localStorage.setItem("username", this.params.name);
          // this.$store.commit("SET_PROTRAIT", this.params.imageUrl);
          this.onClickLeft();
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
    getTopHeight() {
      console.log("screenHight:", this.screenHight);
      this.$nextTick(() => {
        console.log("123:", this.$refs.select_tab);
      });
      //   this.topHeight = parseInt(this.$refs.select_tab.offsetHeight);
      if (this.screenHight >= 1024) {
        this.$el.style.setProperty(
          "--editor-height",
          this.screenHight - 178 + "px"
        );
      } else {
        this.$el.style.setProperty(
          "--editor-height",
          this.screenHight - 115 + "px"
        );
      }
    },

    async fileChange(file, fileList) {
      console.log("change", file, fileList);
      console.log(file.raw, file.name);
      this.file = file.raw;
      this.fileName = file.name;
      console.log("change2:", this.file, this.fileName);

      const formData = new FormData();
      formData.append("file", this.file);
      console.log("formData:", formData);
      var str = await this.$axios.post(
        "/api/admin/enterprise/imguplond",
        formData
      );
      console.log("str:", str.data);
      this.imageUrl = str.data;
      this.params.imageUrl = this.imageUrl;
    },
    FormatSignature(data) {
      console.log("data:", data);
      let res = data.substring(3, data.length - 4);
      console.log("res:", res);
      return res;
    },
    namefn(value) {
      if (value.length > 7) {
        Toast({
          message: "昵称最大不超过7位，请重新输入或返回首页",
          position: "bottom",
        });
      } else {
        console.log("res", value);
        this.params.name = value;
        this.EditName();
      }
    },
    emailfn(value) {
      var res = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (res.test(value)) {
        console.log("res", value);
        this.params.email = value;
        this.EditEmail();
      } else {
        Toast({
          message: "邮箱格式不正确，请重新输入或返回首页",
          position: "bottom",
        });
      }
    },
    phonefn(value) {
      var res = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
      if (res.test(value)) {
        console.log("res", value);
        this.params.phone = value;
        this.EditPhone();
      } else if (value.length < 0 || value.length > 11) {
        Toast({
          message: "电话长度为11位，请重新输入或返回首页",
          position: "bottom",
        });
      } else {
        Toast({
          message: "电话格式不正确，请重新输入或返回首页",
          position: "bottom",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.modify-information {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.modify-information__block {
  width: 100%;
  height: auto;
  //   background-color: darkseagreen;
  padding: 10px;
  box-sizing: border-box;
}
.toolbar {
  font-size: 15px;
  //   border: 1px solid #333;
}
.opinion__editor {
  height: var(--editor-height);
  border: 1px solid #f9f9f9;
  border-top-color: #fff;
}
.portrait__block {
  width: 100%;
  height: calc(100% - 46px);
  //   background-color: darkseagreen;
  display: flex;
  justify-content: center;
}
.user-portrait {
  width: 150px;
  height: 150px;
  //   background-color: burlywood;
  margin-top: 50px;
}
.bottom-btn {
  width: 100%;
  height: 55px;
  padding: 5px 10px;
  box-sizing: border-box;
  background-color: #fff;
  position: fixed;
  bottom: 0px;
  .logOut {
    // color: #333;
    // background-color: #fff;
    // border-color: #fff;
    font-size: 15px;
    letter-spacing: 2px;
  }
}
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  width: 150px;
  height: 150px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  //   background-color: burlywood;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  line-height: 150px;
  text-align: center;
  //   margin-top: 130px;
  /* border: 1px solid #333; */
}
/deep/.avatar {
  width: 150px;
  height: 150px;
  display: block;
  object-fit: contain;
  //   background-color: cadetblue;
}
</style>