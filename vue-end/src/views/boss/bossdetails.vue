<template>
  <div id="bossadd">
    <div class="badd_topnav">
      <el-button
        type="primary"
        style="width: 80px; margin-top: 15px; margin-left: 90%"
        @click="clickfn('/boss')"
        >返回</el-button
      >
    </div>
    <!-- action="/api/admin/imguplond" -->
    <div class="badd_con">
      <div class="badd_con_tu">
        <el-upload
          class="avatar-uploader"
          action=""
          accept="jpg,png"
          :show-file-list="false"
          :auto-upload="false"
          disabled
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="badd_con_basic">
        <div class="badd_cb_wk">
          <div class="badd_cb_left">老&nbsp;板&nbsp;姓&nbsp;名&nbsp;:</div>
          <div class="badd_cb_right">
            <div class="badd_cb_right_text">
              {{ this.bossInformation.bossName }}
            </div>
          </div>
        </div>
        <div class="badd_cb_wk">
          <div class="badd_cb_left">出&nbsp;生&nbsp;年&nbsp;月&nbsp;:</div>
          <div class="badd_cb_right">
            <div class="badd_cb_right_text">
              {{ this.bossInformation.birthDate }}
            </div>
          </div>
        </div>
        <div class="badd_cb_wk">
          <div class="badd_cb_left">毕&nbsp;业&nbsp;院&nbsp;校&nbsp;:</div>
          <div class="badd_cb_right">
            <div class="badd_cb_right_text">
              {{ this.bossInformation.graduateSchool }}
            </div>
          </div>
        </div>
        <div class="badd_cb_wk">
          <div class="badd_cb_left">所&nbsp;学&nbsp;专&nbsp;业&nbsp;:</div>
          <div class="badd_cb_right">
            <div class="badd_cb_right_text">
              {{ this.bossInformation.professional }}
            </div>
          </div>
        </div>
        <div class="badd_cb_wk">
          <div class="badd_cb_left">最&nbsp;高&nbsp;学&nbsp;历&nbsp;:</div>
          <div class="badd_cb_right">
            <div class="badd_cb_right_text">
              {{ this.bossInformation.recordSchool }}
            </div>
          </div>
        </div>
        <div class="badd_cb_wk">
          <div class="badd_cb_left">任&nbsp;职&nbsp;企&nbsp;业&nbsp;:</div>
          <div class="badd_cb_right">
            <div class="badd_cb_right_text">
              {{ this.bossInformation.enterprise }}
            </div>
          </div>
        </div>
        <div class="badd_cb_wk">
          <div class="badd_cb_left">职&emsp;&emsp;&emsp;务&nbsp;:</div>
          <div class="badd_cb_right">
            <div class="badd_cb_right_text">
              {{ this.bossInformation.position }}
            </div>
          </div>
        </div>
      </div>
      <div class="badd_con_specific">
        <div class="badd_cb_wk">
          <div class="badd_cb_left b_left">
            人&nbsp;物&nbsp;标&nbsp;签&nbsp;:
            <!-- <div class="badd_cb_left_operation">
              <el-button
                type="primary"
                icon="el-icon-circle-plus-outline"
                style="width: 60px; height: 35px"
                @click="addHandler(1)"
                disabled
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-delete"
                style="width: 60px; height: 35px"
                @click="delHandler(1)"
                disabled
              ></el-button>
            </div> -->
          </div>
          <div class="badd_cb_right b_right">
            <div
              class="badd_cb_plabel"
              v-for="(item, index) in plabel"
              :key="index"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="badd_cb_wk">
          <div class="badd_cb_left b_left">
            教&nbsp;育&nbsp;经&nbsp;历&nbsp;:
            <!-- <div class="badd_cb_left_operation">
              <el-button
                type="primary"
                icon="el-icon-circle-plus-outline"
                style="width: 60px; height: 35px"
                @click="addHandler(2)"
                disabled
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-delete"
                style="width: 60px; height: 35px"
                @click="delHandler(2)"
                disabled
              ></el-button>
            </div> -->
            <div class="badd_cb_left_prompt">
              <span>例：</span><span>重庆大学——本科——（1963年——1967年）</span>
            </div>
          </div>
          <div class="badd_cb_right b_right">
            <div
              class="badd_cb_pcon"
              v-for="(item, index) in experience"
              :key="index"
            >
              {{ item.scontent }}
            </div>
          </div>
        </div>
        <div class="badd_cb_wk">
          <div class="badd_cb_left b_left">
            任&nbsp;职&nbsp;履&nbsp;历&nbsp;:
            <!-- <div class="badd_cb_left_operation">
              <el-button
                type="primary"
                icon="el-icon-circle-plus-outline"
                style="width: 60px; height: 35px"
                @click="addHandler(3)"
                disabled
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-delete"
                style="width: 60px; height: 35px"
                @click="delHandler(3)"
                disabled
              ></el-button>
            </div> -->
            <div class="badd_cb_left_prompt">
              <span>例：</span
              ><span>企业搜索技术有限公司——总经理——（1963年——1967年）</span>
            </div>
          </div>
          <div class="badd_cb_right b_right">
            <div
              class="badd_cb_pcon"
              v-for="(item, index) in record"
              :key="index"
            >
              {{ item.rcontent }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="badd_con_cr">
      <div class="badd_con_resume">
        <div class="badd_cr_top">简介:</div>
        <div class="badd_cr_con">
          <div id="div1"></div>
        </div>
      </div>
      <div class="badd_con_resume">
        <div class="badd_cr_top">重要事件:</div>
        <div class="badd_cr_con">
          <div id="div2"></div>
        </div>
      </div>
    </div>
    <div class="badd_con_news">
      <div class="badd_cn_top">
        <div class="badd_cnt_left">相关新闻：</div>
        <div class="badd_cnt_right">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            style="width: 70px; margin-top: 5px; margin-left: 30px"
            disabled
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-delete"
            style="width: 70px"
            disabled
          ></el-button>
        </div>
      </div>
      <div
        class="badd_cn_con"
        v-for="(item, index) in newsInformation"
        :key="index"
      >
        <div class="badd_cn_con_title">{{ item.kjwl_n_name }}</div>
        <div class="badd_cn_con_time">{{ item.kjwl_n_rdatetime }}</div>
        <div class="badd_cn_con_url">{{ item.kjwl_n_source }}</div>
      </div>
    </div>

    <div class="badd_topnav">
      <el-button
        type="primary"
        style="width: 200px; margin: 15px 40%"
        @click="clickfn('/boss')"
        >返回</el-button
      >
    </div>

    <!-- <el-dialog
      :title="status"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      标签内容：<el-input
        id="content"
        v-model="content"
        aria-placeholder="请输入标签内容"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="baseHandler()">确 定</el-button>
      </span>
    </el-dialog> -->

    <!-- <el-dialog :title="status1" :visible.sync="dialogVisible1" width="30%">
      <el-table :data="data">
        <el-table-column
          :property="content1"
          :label="content2"
          width="200"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-popconfirm
              style="margin-left: 10px"
              confirm-button-text="确定"
              @confirm="handleDelete(scope.$index, scope.row, status1)"
              cancel-button-text="不用了"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除该条信息吗？"
            >
              <el-button size="mini" type="danger" slot="reference"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog> -->
  </div>
</template>

<script>
import { cookiefn } from "@/utils/cookiefn";
import { dateTimeFn } from "@/utils/datetime";
import E from "wangeditor";
export default {
  name: "bossdetails",
  data() {
    return {
      status: "",
      status1: "",
      data: "",
      dialogVisible: false,
      dialogVisible1: false,
      content: "",
      content1: "",
      content2: "",
      plabel: [],
      experience: [],
      record: [],

      editor1: "",
      editor2: "",
      imageUrl: "",

      newsInformation: [],

      bossInformation: {
        bossName: "", //姓名
        birthDate: "", //出生日期
        graduateSchool: "", //毕业院校
        professional: "", //所学专业
        recordSchool: "", //最高学历
        enterprise: "", //任职企业
        position: "", //职务
      },
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    clickfn(val) {
      this.$router.push({
        path: val,
      });
    },
    async refresh() {
      let obj = cookiefn.getCookie();
      let bossId = obj.bossId;
      console.log(bossId);

      let res = await this.$axios.get(`/api/admin/bossdetails/${bossId}`);
      console.log("res: ", res.data);
      if (res.data) {
        const { pdata, psdata, pndata } = res.data;
        this.getPerson(pndata);
        const {
          kjwl_p_name,
          kjwl_p_portrait,
          kjwl_p_position,
          kjwl_p_birthdate,
          kjwl_p_enterprise,
          kjwl_p_record,
          qyss_p_labelName,
        } = pdata;

        const {
          kjwl_p_event,
          kjwl_p_experience,
          kjwl_p_graduateschool,
          kjwl_p_professional,
          kjwl_p_recordschool,
          kjwl_p_resume,
        } = psdata;

        // ldata.forEach((item) => {
        //   this.plabel.push({ pcontent: item.kjwl_pl_name });
        // });
        this.plabel = JSON.parse(qyss_p_labelName);

        if (kjwl_p_birthdate !== "-") {
          this.bossInformation.birthDate =
            dateTimeFn.showMonth(kjwl_p_birthdate);
        } else {
          this.bossInformation.birthDate = kjwl_p_birthdate;
        }

        this.bossInformation.bossName = kjwl_p_name;
        this.bossInformation.graduateSchool = kjwl_p_graduateschool;
        this.bossInformation.professional = kjwl_p_professional;
        this.bossInformation.recordSchool = kjwl_p_recordschool;
        this.bossInformation.enterprise = kjwl_p_enterprise;
        this.bossInformation.position = kjwl_p_position;
        this.imageUrl = kjwl_p_portrait;
        this.record = JSON.parse(kjwl_p_record);
        this.experience = JSON.parse(kjwl_p_experience);

        this.editor1 = new E("#div1");
        this.editor2 = new E("#div2");

        this.editor1.config.height = 350;
        this.editor1.config.zIndex = 1;
        this.editor2.config.height = 350;
        this.editor2.config.zIndex = 1;
        this.editor1.create();
        this.editor2.create();

        this.editor1.txt.html(JSON.parse(kjwl_p_resume));
        this.editor2.txt.html(JSON.parse(kjwl_p_event));
        this.editor1.$textElem.attr("contenteditable", false);
        this.editor2.$textElem.attr("contenteditable", false);
      }
    },
    getPerson(data) {
      console.log("data:", data);
      data.forEach(async (item) => {
        console.log("item:", item);
        let res = await this.$axios.get(
          `/api/admin/news/selectId/${item.kjwl_n_id}`
        );
        console.log("res:", res.data);
        this.newsInformation.push(res.data[0]);
      });
      console.log("newsInformation:", this.newsInformation);
    },
    // handleClose(done) {
    //   this.$confirm("确认关闭？").then((_) => {
    //     if (_) done();
    //     this.content = "";
    //   });
    // },
    // close() {
    //   this.dialogVisible = false;
    //   this.content = "";
    // },
    // async fileChange(file, fileList) {
    //   console.log("change", file, fileList);
    //   console.log(file.raw, file.name);
    //   this.file = file.raw;
    //   this.fileName = file.name;
    //   console.log("change2:", this.file, this.fileName);

    //   const formData = new FormData();
    //   formData.append("file", this.file);
    //   console.log("formData:", formData);
    //   var str = await this.$axios.post("/api/admin/imguplond", formData);
    //   console.log("str:", str.data);
    //   this.imageUrl = str.data;
    // },

    // addHandler(val) {
    //   if (val === 1) {
    //     this.status = "请输入你所需要添加的标签:";
    //   } else if (val === 2) {
    //     this.status = "请输入你所需要添加的教育经历:";
    //   } else if (val === 3) {
    //     this.status = "请输入你所需要添加的任职履历:";
    //   }
    //   this.dialogVisible = true;
    // },
    // delHandler(val) {
    //   if (val === 1) {
    //     this.status1 = "标签:";
    //     this.data = this.plabel;
    //     this.content1 = "pcontent";
    //     this.content2 = "标签内容";
    //   } else if (val === 2) {
    //     this.status1 = "教育经历:";
    //     this.data = this.experience;
    //     this.content1 = "scontent";
    //     this.content2 = "教育经历";
    //   } else if (val === 3) {
    //     this.status1 = "任职履历:";
    //     this.data = this.record;
    //     this.content1 = "rcontent";
    //     this.content2 = "任职履历";
    //   }
    //   this.dialogVisible1 = true;
    // },
    // async baseHandler() {
    //   console.log(this.status);
    //   if (this.status === "请输入你所需要添加的标签:") {
    //     this.plabel.push({ pcontent: this.content });
    //     console.log(this.plabel);
    //   } else if (this.status === "请输入你所需要添加的教育经历:") {
    //     this.experience.push({ scontent: this.content });
    //     console.log(this.experience);
    //   } else if (this.status === "请输入你所需要添加的任职履历:") {
    //     this.record.push({ rcontent: this.content });
    //     console.log(this.record);
    //   }
    //   this.content = "";
    //   this.dialogVisible = false;
    // },
    // handleDelete(index, row, val) {
    //   console.log(index, row, val);
    //   let arr = [];
    //   //校验row和index的类型,避免错误
    //   if (typeof row !== "object") {
    //     return;
    //   }
    //   if (typeof index !== "number") {
    //     return;
    //   }
    //   //对参数进行跟踪，判断参数的长度
    //   if (arguments.length > 1 && arguments.length < 4) {
    //     if (val === "标签:") {
    //       arr = this.plabel;
    //     } else if (val === "教育经历:") {
    //       arr = this.experience;
    //     } else if (val === "任职履历:") {
    //       arr = this.record;
    //     }
    //     if (arr.length > 0) {
    //       console.log(arr);
    //       arr.forEach((i, k) => {
    //         console.log(i, k);
    //         if (k === index) {
    //           let str = arr[k];
    //           console.log(str);
    //           arr.splice(index, 1);
    //           this.data = arr;
    //           console.log("112:", this.data);
    //         }
    //       });
    //     }
    //   }
    // },

    // async handlerSave() {
    //   if (
    //     this.editor1.txt.html() === "" ||
    //     this.editor2.txt.html() === "" ||
    //     this.experience.length <= 0 ||
    //     this.record.length <= 0 ||
    //     this.bossInformation.bossName === "" ||
    //     this.bossInformation.birthDate === "" ||
    //     this.bossInformation.enterprise === "" ||
    //     this.bossInformation.graduateSchool === "" ||
    //     this.bossInformation.position === "" ||
    //     this.bossInformation.professional === "" ||
    //     this.bossInformation.recordSchool === "" ||
    //     this.plabel.length <= 0
    //   ) {
    //     this.$message({
    //       message: "警告！人物信息数据为空，请输入数据",
    //       type: "warning",
    //     });
    //   } else {
    //     let str1 = JSON.stringify(this.editor1.txt.html());
    //     let str2 = JSON.stringify(this.editor2.txt.html());

    //     let experience = JSON.stringify(this.experience);
    //     let record = JSON.stringify(this.record);

    //    console.log('imageUrl:',this.imageUrl);

    //     console.log(
    //       "bossdata:",
    //       this.bossInformation,
    //       this.plabel,
    //       experience,
    //       record,
    //       str1,
    //       str2
    //     );

    //     var res = await this.$axios.post("/api/admin/bossadd", {
    //       bossInformation: this.bossInformation,
    //       plabel: this.plabel,
    //       experience: experience,
    //       record: record,
    //       str1: str1,
    //       str2: str2,
    //       imageUrl : this.imageUrl,
    //     });
    //     console.log("res:", res);
    //   }
    // },
  },
};
</script>

<style scoped>
@import "../../css/bossdetails.css";
.badd_cb_left_prompt {
  width: 100%;
  height: auto;
  /* background-color:cadetblue; */
  font-size: 12px;
  color: #bfbfbf;
}
</style>