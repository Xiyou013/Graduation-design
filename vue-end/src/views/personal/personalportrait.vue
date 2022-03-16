<template>
  <div id="portrait">
    <div class="p_portrait">
      <img class="t_img1" :src="circleUrl" />
    </div>
    <div class="p_btn">
      <el-upload
        class="upload-demo"
        action=""
        accept=".jpg,.png"
        :show-file-list="false"
        :auto-upload="false"
        :on-change="fileChange"
      >
        <el-button
          style="width: 180px; height: 45px; margin-left: 80px"
          slot="trigger"
          size="small"
          type="primary"
          >选取文件</el-button
        >
      </el-upload>
    </div>
    <div class="p_btn">
      <el-button
        style="width: 330px; height: 45px"
        type="primary"
        class="preserve"
        @click="startUpload"
        >上传</el-button
      >
    </div>
    <div class="p_btn">
      <el-button
        type="info"
        style="width: 330px; height: 45px"
        @click="clickfn('/personal')"
        >返回</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "portrait",
  data() {
    return {
      circleUrl: require("../../assets/头像.png"),
      id: "",
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
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
        "/api/admin/imguplond",
        formData
      );
      console.log("str:", str.data);
      this.circleUrl = str.data;
      console.log("circleUrl:", this.circleUrl);
    },



    // handleAvatarSuccess(res, file) {
    //     console.log('123',res,file)
    //     // this.uploadId();
    //     this.imageUrl = URL.createObjectURL(file.raw);
    //     console.log('this.imageUrl:',this.imageUrl);
    //     this.refresh();
    // },
    // async uploadId(){
    //     var res = await this.$axios.post('/api/admin/upload',{id:this.id});
    //     console.log(res);
    // },
    async startUpload() {
      // console.log("this.file:", this.file);
      // console.log("this.id:", this.id);
      // const formData = new FormData();
      // formData.append("file", this.file);
      // formData.append("id", this.id);
      // console.log("formData:", formData);
      const formData = {
        id: this.id,
        imageUrl: this.circleUrl,
      }

      let res = await this.$axios.post("/api/admin/upload", formData);
      console.log(res);
      this.getPortrait();
    },
    async getPortrait() {
      let res = await this.$axios.get(`/api/admin/download/${this.id}`);
      console.log(res.data);
      const { kjwl_u_portrait } = res.data[0];
      console.log(kjwl_u_portrait);
      localStorage.setItem("userportrait", kjwl_u_portrait);
      this.$store.commit("SET_PROTRAIT", kjwl_u_portrait);
      console.log("123", this.$store);
      console.log(localStorage);
      this.circleUrl = kjwl_u_portrait;
    },
    refresh() {
      var { userportrait, userid } = localStorage;
      this.circleUrl = userportrait;
      this.id = userid;
      console.log(this.circleUrl, this.id);
    },
    clickfn(val) {
      console.log(val);
      this.$router.push({
        path: val,
      });
    },
  },
};
</script>

<style scoped>
@import "../../css/personalportrait.css";
</style>