<template>
  <div id="bossadd">
    <div class="badd_topnav">
      <el-button
        type="primary"
        style="width: 80px; margin-top: 15px; margin-left: 90%"
        @click="handlerSave"
        >保存</el-button
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
          :on-change="fileChange"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="badd_con_basic">
        <div class="badd_cb_wk">
          <div class="badd_cb_left">老&nbsp;板&nbsp;姓&nbsp;名&nbsp;:</div>
          <div class="badd_cb_right">
            <el-input
              placeholder="请输入姓名"
              v-model="bossInformation.bossName"
              clearable
              style="width: 250px"
            >
            </el-input>
          </div>
        </div>
        <div class="badd_cb_wk">
          <div class="badd_cb_left">出&nbsp;生&nbsp;年&nbsp;月&nbsp;:</div>
          <div class="badd_cb_right">
            <el-date-picker
              v-model="bossInformation.birthDate"
              type="month"
              value-format="yyyy-MM"
              placeholder="请选择出生日期"
              style="width: 250px"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="badd_cb_wk">
          <div class="badd_cb_left">毕&nbsp;业&nbsp;院&nbsp;校&nbsp;:</div>
          <div class="badd_cb_right">
            <el-input
              placeholder="请输入毕业院校"
              v-model="bossInformation.graduateSchool"
              clearable
            >
            </el-input>
          </div>
        </div>
        <div class="badd_cb_wk">
          <div class="badd_cb_left">所&nbsp;学&nbsp;专&nbsp;业&nbsp;:</div>
          <div class="badd_cb_right">
            <el-input
              placeholder="请输入所学专业"
              v-model="bossInformation.professional"
              clearable
            >
            </el-input>
          </div>
        </div>
        <div class="badd_cb_wk">
          <div class="badd_cb_left">最&nbsp;高&nbsp;学&nbsp;历&nbsp;:</div>
          <div class="badd_cb_right">
            <el-input
              placeholder="请输入最高学历"
              v-model="bossInformation.recordSchool"
              clearable
            >
            </el-input>
          </div>
        </div>
        <div class="badd_cb_wk">
          <div class="badd_cb_left">任&nbsp;职&nbsp;企&nbsp;业&nbsp;:</div>
          <div class="badd_cb_right">
            <el-input
              placeholder="请输入任职企业"
              v-model="bossInformation.enterprise"
              clearable
            >
            </el-input>
          </div>
        </div>
        <div class="badd_cb_wk">
          <div class="badd_cb_left">职&emsp;&emsp;&emsp;务&nbsp;:</div>
          <div class="badd_cb_right">
            <el-input
              placeholder="请输入职务"
              v-model="bossInformation.position"
              clearable
            >
            </el-input>
          </div>
        </div>
      </div>
      <div class="badd_con_specific">
        <div class="badd_cb_wk">
          <div class="badd_cb_left b_left">
            人&nbsp;物&nbsp;标&nbsp;签&nbsp;:
            <div class="badd_cb_left_operation">
              <el-button
                type="primary"
                icon="el-icon-circle-plus-outline"
                style="
                  width: 60px;
                  height: 35px;
                  float: right;
                  margin-right: 10px;
                "
                @click="addHandler(1)"
              ></el-button>
              <!-- <el-button
                type="primary"
                icon="el-icon-delete"
                style="width: 60px; height: 35px"
                @click="delHandler(1)"
              ></el-button> -->
            </div>
          </div>
          <div class="badd_cb_right b_right">
            <!-- <div
              class="badd_cb_plabel"
              v-for="(item, index) in plabel"
              :key="index"
            >
              {{ item.pcontent }}
            </div> -->
            <div
              class="badd_cb_plabel"
              v-for="(item, index) in array"
              :key="index"
            >
              <span class="parsonLable"
                >{{ item.label }}&nbsp;<i
                  class="el-icon-circle-close"
                  @click="delnabel(item, index)"
                ></i
              ></span>
            </div>
          </div>
        </div>
        <div class="badd_cb_wk">
          <div class="badd_cb_left b_left">
            教&nbsp;育&nbsp;经&nbsp;历&nbsp;:
            <div class="badd_cb_left_operation">
              <el-button
                type="primary"
                icon="el-icon-circle-plus-outline"
                style="width: 60px; height: 35px"
                @click="addHandler(2)"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-delete"
                style="width: 60px; height: 35px"
                @click="delHandler(2)"
              ></el-button>
            </div>
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
            <div class="badd_cb_left_operation">
              <el-button
                type="primary"
                icon="el-icon-circle-plus-outline"
                style="width: 60px; height: 35px"
                @click="addHandler(3)"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-delete"
                style="width: 60px; height: 35px"
                @click="delHandler(3)"
              ></el-button>
            </div>
            <div class="badd_cb_left_prompt">
              <span>例：</span><span>企业搜索技术有限公司——总经理——（1963年——1967年）</span>
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
            style="width: 70px; margin-top: 5px; margin-left: 15px"
            @click="addHandler(4)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-delete"
            style="width: 70px; margin-left: 30px"
            @click="delHandler(4)"
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
      <!-- <el-button
        type="primary"
        style="width: 200px; margin: 15px 40%"
        @click="handlerSave"
        >保存</el-button
      > -->
      <el-button
        type="primary"
        style="
          width: 100px;
          margin-top: 15px;
          margin-left: 40%;
          background-color: #c1c1c1;
          color: #ffffff;
          border: 0px;
        "
        @click="toback"
        >返回</el-button
      >
      <el-button type="primary" style="width: 100px" @click="handlerSave"
        >保存</el-button
      >
    </div>

    <el-dialog
      :title="status"
      :visible.sync="dialogVisible"
      :width="
        status === '请选择你所需要添加的新闻:'
          ? '60%'
          : status === '请输入你所需要添加的标签:'
          ? '1015px'
          : '30%'
      "
      :before-close="handleClose"
    >
      <div v-if="status === '请输入你所需要添加的标签:'">
        <el-cascader-panel
          :value="plabel"
          :options="options"
          ref="region"
          :show-all-levels="false"
          :props="props"
          @change="plabelChange"
        ></el-cascader-panel>
      </div>

      <div
        v-if="
          status !== '请选择你所需要添加的新闻:' &&
          status !== '请输入你所需要添加的标签:'
        "
      >
        标签内容：<el-input
          id="content"
          v-model="content"
          aria-placeholder="请输入标签内容"
          style="margin-bottom: 30px"
        ></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="close" style="margin: 0px 20px">取 消</el-button>
          <el-button
            type="primary"
            @click="baseHandler"
            style="margin: 0px 20px"
            >确 定</el-button
          >
        </span>
      </div>

      <div v-if="status === '请选择你所需要添加的新闻:'">
        <div>
          <!-- <el-input
            class="einput"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="input"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="select"
            ></el-button>
          </el-input> -->
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="100px"
            :inline="true"
          >
            <el-form-item label="标题：" prop="name">
              <el-input
                v-model="ruleForm.name"
                placeholder="请输入标题"
              ></el-input>
            </el-form-item>
            <el-form-item label="来源：" prop="source">
              <el-input
                v-model="ruleForm.source"
                placeholder="请输入来源"
              ></el-input>
            </el-form-item>
            <el-form-item label="发布时间：" prop="datetime">
              <el-date-picker
                v-model="ruleForm.datetime"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="类型标签：" prop="nlabel">
              <el-cascader
                v-model="ruleForm.nlabel"
                :options="options"
                ref="nlabelRegion"
                :show-all-levels="false"
                :props="props"
                @change="nlabelchange"
              ></el-cascader>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="select()">搜索</el-button>
              <el-button @click="resetForm('ruleForm', 1)">重置</el-button>
            </el-form-item>
            <el-form-item style="float: right">
              <el-button type="primary" @click="clickfn('/newsadd')"
                >新增记录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <el-table
          :data="
            tableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          max-height="450"
        >
          <el-table-column
            property="kjwl_n_name"
            label="标题"
          ></el-table-column>
          <el-table-column
            property="kjwl_n_source"
            label="来源"
          ></el-table-column>
          <el-table-column
            property="kjwl_n_rdatetime"
            label="时间"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                slot="reference"
                @click="personAdd(scope.$index, scope.row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="PagingToolbar">
          <el-pagination
            background
            :hide-on-single-page="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length"
          >
          </el-pagination>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      :title="status1"
      :visible.sync="dialogVisible1"
      :before-close="handleClose1"
      :width="status1 === '相关新闻:' ? '60%' : '30%'"
    >
      <div v-if="status1 !== '相关新闻:'">
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
      </div>

      <div v-if="status1 === '相关新闻:'">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          :inline="true"
        >
          <el-form-item label="标题：" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="来源：" prop="source">
            <el-input
              v-model="ruleForm.source"
              placeholder="请输入来源"
            ></el-input>
          </el-form-item>
          <el-form-item label="发布时间：" prop="datetime">
            <el-date-picker
              v-model="ruleForm.datetime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="类型标签：" prop="nlabel">
            <el-cascader
              v-model="ruleForm.nlabel"
              :options="options"
              ref="nlabelRegionDel"
              :show-all-levels="false"
              :props="props"
              @change="nlabelDel"
            ></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="selectdata()">搜索</el-button>
            <el-button @click="resetForm('ruleForm', 2)">重置</el-button>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button type="primary" @click="clickfn('/newsadd')"
              >新增记录</el-button
            >
          </el-form-item>
        </el-form>
        <el-table
          :data="
            data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
          "
          max-height="450"
        >
          <el-table-column
            property="kjwl_n_name"
            label="标题"
          ></el-table-column>
          <el-table-column
            property="kjwl_n_source"
            label="来源"
          ></el-table-column>
          <el-table-column
            property="kjwl_n_rdatetime"
            label="时间"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-popconfirm
                style="margin-left: 10px"
                confirm-button-text="确定"
                @confirm="handleDelete(scope.$index, scope.row, 4)"
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
        <div class="PagingToolbar">
          <el-pagination
            background
            :hide-on-single-page="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="data.length"
          >
          </el-pagination>
        </div>
      </div>
    </el-dialog>
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
      bossId: "",
      tableData: [],
      input: "",
      currentPage: 1,
      pageSize: 8,
      pageSizes: [2, 4, 8, 12, 16],
      props: {
        multiple: true,
        value: "qyss_l_id",
        label: "qyss_l_name",
        children: "children",
      },
      options: [],
      array: [],
      ruleForm: {
        name: "",
        source: "",
        datetime: "",
        nlabel: "",
        array: [],
      },

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
    async selectCascader() {
      let res = await this.$axios.get("/api/admin/news/selectCascader");
      console.log(res.data);
      if (res.data) this.options = res.data;
    },
    async refresh() {
      this.selectCascader();
      let obj = cookiefn.getCookie();
      this.bossId = obj.bossId;
      console.log(this.bossId);

      let res = await this.$axios.get(`/api/admin/bossdetails/${this.bossId}`);
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
          qyss_p_labelName, //标签名称
          qyss_p_labelPath, //标签回显路径value值
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
        this.plabel = JSON.parse(qyss_p_labelPath);
        this.array = JSON.parse(qyss_p_labelName);

        if (kjwl_p_birthdate !== "-") {
          this.bossInformation.birthDate =
            dateTimeFn.showDate(kjwl_p_birthdate);
        } else {
          this.bossInformation.birthDate = "";
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
    handleClose(done) {
      // this.$confirm("确认关闭？").then((_) => {
      //   if (_) done();
      //   this.content = "";
      //   this.currentPage = 1;
      // });
      if (this.status === "请选择你所需要添加的新闻:") {
        this.$refs.ruleForm.resetFields();
      }
      this.content = "";
      done();
    },
    handleClose1(done) {
      // this.$confirm("确认关闭？").then((_) => {
      //   if (_) done();
      //   this.currentPage = 1;
      // });
      if (this.status1 === "相关新闻:") {
        this.$refs.ruleForm.resetFields();
      }
      done();
    },
    close() {
      this.dialogVisible = false;
      this.content = "";
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
      var str = await this.$axios.post("/api/admin/imguplond", formData);
      console.log("str:", str.data);
      this.imageUrl = str.data;
    },

    async addHandler(val) {
      if (val === 1) {
        this.status = "请输入你所需要添加的标签:";
      } else if (val === 2) {
        this.status = "请输入你所需要添加的教育经历:";
      } else if (val === 3) {
        this.status = "请输入你所需要添加的任职履历:";
      } else if (val === 4) {
        this.status = "请选择你所需要添加的新闻:";
        var res = await this.$axios.get("/api/admin/newssel");
        console.log(res.data);
        if (res.data) {
          res.data.forEach((item) => {
            item.kjwl_n_rdatetime = dateTimeFn.showTime(item.kjwl_n_rdatetime);
          });
          this.tableData = res.data;
        }
      }
      this.currentPage = 1;
      this.dialogVisible = true;
    },
    delHandler(val) {
      // if (val === 1) {
      //   this.status1 = "标签:";
      //   this.data = this.plabel;
      //   this.content1 = "pcontent";
      //   this.content2 = "标签内容";
      // } else
      if (val === 2) {
        this.status1 = "教育经历:";
        this.data = this.experience;
        this.content1 = "scontent";
        this.content2 = "教育经历";
      } else if (val === 3) {
        this.status1 = "任职履历:";
        this.data = this.record;
        this.content1 = "rcontent";
        this.content2 = "任职履历";
      } else if (val === 4) {
        this.status1 = "相关新闻:";
        this.data = this.newsInformation;
      }
      this.currentPage = 1;
      this.dialogVisible1 = true;
    },
    async baseHandler() {
      console.log(this.status);
      // if (this.status === "请输入你所需要添加的标签:") {
      //   this.plabel.push({ pcontent: this.content });
      //   console.log(this.plabel);
      // } else
      if (this.status === "请输入你所需要添加的教育经历:") {
        this.experience.push({ scontent: this.content });
        console.log(this.experience);
      } else if (this.status === "请输入你所需要添加的任职履历:") {
        this.record.push({ rcontent: this.content });
        console.log(this.record);
      }
      this.content = "";
      this.dialogVisible = false;
    },
    handleDelete(index, row, val) {
      console.log(index, row, val);
      let arr = [];
      //校验row和index的类型,避免错误
      if (typeof row !== "object") {
        return;
      }
      if (typeof index !== "number") {
        return;
      }
      //对参数进行跟踪，判断参数的长度
      if (arguments.length > 1 && arguments.length < 4) {
        // if (val === "标签:") {
        //   arr = this.plabel;
        // } else
        if (val === "教育经历:") {
          arr = this.experience;
        } else if (val === "任职履历:") {
          arr = this.record;
        } else if (val === 4) {
          arr = this.newsInformation;
        }
        if (arr.length > 0) {
          console.log(arr);
          arr.forEach((i, k) => {
            console.log(i, k);
            if (k === index) {
              let str = arr[k];
              console.log(str);
              arr.splice(index, 1);
              this.data = arr;
              console.log("112:", this.data);
            }
          });
        }
      }
    },
    personAdd(index, row) {
      this.newsInformation.push(row);
      this.newsInformation = this.unique(this.newsInformation);
      console.log("newsInformation:", this.newsInformation);
      if ((index, row)) return;
    },
    unique(arr) {
      var hash = {};
      arr = arr.reduce(function (item, next) {
        console.log(item, next);
        hash[next.kjwl_n_id]
          ? ""
          : (hash[next.kjwl_n_id] = true && item.push(next));
        return item;
      }, []);
      return arr;
    },
    async select() {
      // console.log("input:", this.input);
      // if (this.input === "") {
      //   var res = await this.$axios.get("/api/admin/newssel");
      // } else {
      //   res = await this.$axios.get(`/api/admin/news/select/${this.input}`);
      // }
      // if (res.data) {
      //   res.data.forEach((item) => {
      //     item.kjwl_n_rdatetime = dateTimeFn.showTime(item.kjwl_n_rdatetime);
      //   });
      //   this.tableData = res.data;
      //   this.currentPage = 1;
      // }
      let params = { ...this.ruleForm };
      console.log("params:", params);
      let res = await this.$axios.post(`/api/admin/news/select`, params);
      if (res.data) {
        this.currentPage = 1;
        this.tableData = res.data;
      }
    },
    selectdata() {
      let list = [];
      console.log("ruleForm1:", this.ruleForm, this.newsInformation);
      const name = new RegExp(`(${this.ruleForm.name})`);
      const datetime = new RegExp(`(${this.ruleForm.datetime})`);
      const source = new RegExp(`(${this.ruleForm.source})`);
      const reg = new RegExp(`${this.ruleForm.array}`);
      // const reg = new RegExp(`(农业)|(酒)`)
      // console.log("reg:", name, position, enterprise, reg);
      this.newsInformation.forEach((item) => {
        // console.log(
        //   "val:",
        //   name.test(item.kjwl_p_name),
        //   position.test(item.kjwl_p_position),
        //   enterprise.test(item.kjwl_p_enterprise),
        //   reg.test(item.qyss_p_labelName)
        // );
        if (
          name.test(item.kjwl_n_name) &&
          datetime.test(item.kjwl_n_rdatetime) &&
          source.test(item.kjwl_n_source) &&
          reg.test(item.qyss_n_labelName)
        ) {
          list.push(item);
        }
      });
      this.data = list;
      // console.log("list:", list);
    },
    resetForm(formName, num) {
      this.$refs[formName].resetFields();
      this.ruleForm.nlabel = "";
      this.ruleForm.array = "";
      if (num === 1) this.select();
      if (num === 2) this.selectdata();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    toback() {
      this.$router.push({ path: "/boss" });
    },
    plabelChange(val) {
      console.log("val:", val);
      this.handlechange(val,'region', 1);
    },
    nlabelchange(val) {
      console.log("val:", val);
      this.handlechange(val,'nlabelRegion', 2);
    },
    nlabelDel(val) {
      console.log("val:", val);
      this.handlechange(val,'nlabelRegionDel', 3);
    },
    handlechange(val,cascaderName, num) {
      let array = [];
      console.log("val:", val, num);
      let label = val;
      let CheckedNodes = this.$refs[cascaderName].getCheckedNodes();
      console.log("data1:", CheckedNodes);

      //当子类全部被选择时，过滤出他们的父类；若子类没有被全部选中，则只过滤被选中的子类
      // CheckedNodes = CheckedNodes.filter(option => !(option.parent && option.parent.checked));
      // console.log('data2:', CheckedNodes);
      setTimeout(() => {
        CheckedNodes.forEach((i, k) => {
          if (!i.hasChildren) {
            if (i.checked) {
              console.log("123:", !i.hasChildren, i);
              if (num === 1) {
                array.push({ value: i.value, label: i.label });
              }
              if (num === 2) {
                array.push(i.label);
              }
              if (num === 3) {
                array.push(`(${i.label})`);
              }
            }
          }
          if ((i, k)) return;
        });
        console.log("array:", array);
        console.log("plabel:", label);
        if (num === 1) {
          this.array = array;
          this.plabel = label;
        }
        if (num === 2) {
          this.ruleForm.array = array.join("%");
          this.ruleForm.nlabel = label;
        }
        if (num === 3) {
          this.ruleForm.array = array.join("|");
          this.ruleForm.nlabel = label;
        }
      });
    },
    delnabel(item, index) {
      // console.log("item,index:", item, index);
      this.array.splice(index, 1);
      this.plabel.splice(index, 1);
      this.$refs.region.clearCheckedNodes(item);
      // console.log('array:',this.array);
      // console.log('plabel:', this.plabel);
    },

    async handlerSave() {
      if (this.bossInformation.bossName === "") {
        this.$message({
          message: "警告！人物姓名不能为空，请输入数据",
          type: "warning",
        });
        return;
      } else {
        let str1 = JSON.stringify(this.editor1.txt.html());
        let str2 = JSON.stringify(this.editor2.txt.html());

        if (str1 === '""') str1 = '"-"';
        if (str2 === '""') str2 = '"-"';

        // if (this.plabel.length <= 0) this.plabel.push({ pcontent: "-" });
        let plabel = JSON.stringify(this.plabel);
        let array = JSON.stringify(this.array);

        console.log("label:", plabel, array);

        if (this.experience.length <= 0)
          this.experience.push({ scontent: "-" });
        if (this.record.length <= 0) this.record.push({ rcontent: "-" });

        let experience = JSON.stringify(this.experience);
        let record = JSON.stringify(this.record);

        for (let i in this.bossInformation) {
          if (this.bossInformation[i] === "") {
            this.bossInformation[i] = "-";
          }
        }

        console.log("imageUrl:", this.imageUrl);

        console.log(
          "bossdata:",
          this.bossInformation,
          this.plabel,
          this.newsInformation,
          experience,
          record,
          str1,
          str2
        );

        var res = await this.$axios.post("/api/admin/bosseditor", {
          bossInformation: this.bossInformation,
          plabel: plabel,
          array: array,
          newsInformation: this.newsInformation,
          experience: experience,
          record: record,
          str1: str1,
          str2: str2,
          imageUrl: this.imageUrl,
          id: this.bossId,
        });
        console.log("res:", res);
        if (res) this.$router.push("/boss");
      }
    },
  },
};
</script>

<style scoped>
@import "../../css/bossdetails.css";
::v-deep.el-cascader-panel .el-cascader-menu .el-cascader-menu__wrap {
  height: 100%;
}
::v-deep.el-cascader-panel .el-scrollbar .el-scrollbar__wrap {
  /* overflow: scroll; */
  /* height: 100%; */
  padding: 0px 10px 15px 0px;
}
.badd_cb_left_prompt {
  width: 100%;
  height: auto;
  /* background-color:cadetblue; */
  font-size:12px;
  color:#BFBFBF;
}
</style>