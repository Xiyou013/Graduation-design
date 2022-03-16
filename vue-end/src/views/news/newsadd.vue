<template>
  <div id="newsadd">
    <div class="nadd_topnav">
      <el-button
        type="primary"
        style="width: 80px; margin-top: 15px; margin-left: 90%"
        @click="newInfSave"
        >保存</el-button
      >
    </div>
    <div class="nadd_con">
      <div class="nadd_cn_top">
        <span class="newTitle">新闻标题：</span>
        <el-input
          placeholder="请输入新闻标题"
          v-model="newInformation.newTitle"
          clearable
          style="width: 300px"
        >
        </el-input>
      </div>
      <div class="nadd_cn_positive">
        <span class="newTitle">新闻状态：</span>
        <el-radio-group v-model="radio">
          <el-radio :label="-1">消极</el-radio>
          <el-radio :label="0">中立</el-radio>
          <el-radio :label="1">积极</el-radio>
        </el-radio-group>
      </div>
      <div class="nadd_cn_label">
        <div class="newTitle">新闻标签：</div>
        <!-- <div class="nadd_cnl_con" v-for="(item, index) in nlabel" :key="index">
          <span class="newLable"
            >{{ item[item.length - 1] }}&nbsp;<i
              class="el-icon-circle-close"
              @click="delnabel(item, index)"
            ></i
          ></span>
        </div> -->
        <div class="nadd_cnl_con" v-for="(item, index) in array" :key="index">
          <span class="newLable"
            >{{ item.label }}&nbsp;<i
              class="el-icon-circle-close"
              @click="delnabel(item, index)"
            ></i
          ></span>
        </div>
        <!-- <div class="nadd_cnl_con" v-for="(item, index) in array" :key="index">
          <span class="newLable"
            >{{ item.label }}&nbsp;<i
              class="el-icon-circle-close"
              @click="delnabel(item, index)"
            ></i
          ></span>
        </div> -->
        <div class="nadd_cnl_operation">
          <el-button type="primary" @click="addHandler(1)">选择标签</el-button>
          <!-- <el-button type="text" @click="delHandler(1)"
            ><i class="el-icon-delete"></i
          ></el-button> -->
        </div>
      </div>
      <div class="nadd_cn_from">
        <div class="nadd_cnf_url">
          <div class="nadd_cnfu_left">来&emsp;&emsp;源：</div>
          <el-input
            placeholder="请输入新闻来源"
            v-model="newInformation.newUrl"
            clearable
            style="width: 300px"
          ></el-input>
        </div>
        <div class="nadd_cnf_url time1">
          <div class="nadd_cnfu_left">时&emsp;&emsp;间：</div>
          <el-date-picker
            v-model="newInformation.newDate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择新闻的日期时间"
            style="width: 300px"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="nadd_cn_content">
        <div class="nadd_cnc_top">
          <span style="padding-left: 15px; font-weight: bold"
            >内&emsp;&emsp;容：</span
          >
        </div>
        <div class="nadd_cnc_con">
          <div id="div1"></div>
        </div>
      </div>
      <div class="nadd_cn_link">
        <div class="nadd_cnl_left">新闻链接：</div>
        <el-input
          placeholder="请输入新闻链接·"
          v-model="newInformation.newLink"
          clearable
          style="width: 300px"
        ></el-input>
      </div>
    </div>

    <div class="nadd_newsrel">
      <div class="nadd_nr_top">
        <div class="nadd_nrt_left">相关企业：</div>
        <div class="nadd_nrt_right">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            style="width: 70px; margin-top: 5px"
            @click="addHandler(3)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-delete"
            style="width: 70px; margin-top: 5px; margin-left: 40px"
            @click="delHandler(3)"
          ></el-button>
        </div>
      </div>
      <div
        class="nadd_nr_con nadd_cpck_con_enterprise"
        v-for="(item, index) in enterpriseInfromation"
        :key="index"
      >
        <div class="eadd_cpck_con_tu">
          <img
            :src="item.kjwl_e_portrait"
            alt=""
            style="width: 120px; height: 160px; object-fit: contain"
          />
        </div>
        <div class="eadd_cpck_con_ename">{{ item.kjwl_e_name }}</div>
        <div class="eadd_cpck_con_elrpeople">{{ item.kjwl_e_lrpeople }}</div>
        <div class="eadd_cpck_con_esetdate">{{ item.kjwl_e_setdate }}</div>
        <div class="eadd_cpck_con_ephone">{{ item.kjwl_e_phone }}</div>
        <div class="eadd_cpck_con_eaddress">{{ item.kjwl_e_address }}</div>
      </div>
    </div>
    <div class="nadd_newsrel">
      <div class="nadd_nr_top">
        <div class="nadd_nrt_left">相关人员：</div>
        <div class="nadd_nrt_right">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            style="width: 70px; margin-top: 5px"
            @click="addHandler(2)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-delete"
            style="width: 70px; margin-top: 5px; margin-left: 40px"
            @click="delHandler(2)"
          ></el-button>
        </div>
      </div>
      <div
        class="nadd_nr_con"
        v-for="(item, index) in personInfromation"
        :key="index"
      >
        <div class="nadd_cpck_con_tu">
          <img
            :src="item.kjwl_p_portrait"
            alt=""
            style="width: 120px; height: 160px; object-fit: contain"
          />
        </div>
        <div class="nadd_cpck_con_name">{{ item.kjwl_p_name }}</div>
        <div class="nadd_cpck_con_birthdate">
          {{ item.kjwl_p_birthdate }}
        </div>
        <div class="nadd_cpck_con_position">{{ item.kjwl_p_position }}</div>
        <div class="nadd_cpck_con_penterprise">
          {{ item.kjwl_p_enterprise }}
        </div>
      </div>
    </div>

    <div class="nadd_topnav">
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
      <el-button type="primary" style="width: 100px" @click="newInfSave"
        >保存</el-button
      >
    </div>

    <el-dialog
      :title="status"
      :visible.sync="dialogVisible"
      :width="status === '请输入你所需要添加的标签:' ? '1015px' : '60%'"
      :before-close="handleClose"
    >
      <div v-if="status === '请输入你所需要添加的标签:'">
        <!-- 标签内容：<el-input
          id="ncontent"
          v-model="ncontent"
          aria-placeholder="请输入标签内容"
          style="margin-bottom: 30px"
        ></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="close" style="margin: 0px 20px">取 消</el-button>
          <el-button
            type="primary"
            @click="baseHandler()"
            style="margin: 0px 20px"
            >确 定</el-button
          >
        </span> -->
        <el-cascader-panel
          :value="nlabel"
          :options="options"
          ref="region"
          :show-all-levels="false"
          :props="props"
          @change="nlabelchange"
        ></el-cascader-panel>
      </div>

      <div v-if="status === '请选择你所需要添加的人员:'">
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
              @click="select(1)"
            ></el-button>
          </el-input> -->
          <el-form
            :model="ruleForm1"
            ref="ruleForm1"
            label-width="100px"
            :inline="true"
          >
            <el-form-item label="人物姓名：" prop="name">
              <el-input
                v-model="ruleForm1.name"
                placeholder="请输入人物姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="职务：" prop="position">
              <el-input
                v-model="ruleForm1.position"
                placeholder="请输入职务"
              ></el-input>
            </el-form-item>
            <el-form-item label="任职企业：" prop="enterprise">
              <el-input
                v-model="ruleForm1.enterprise"
                placeholder="请输入任职企业"
              ></el-input>
            </el-form-item>
            <el-form-item label="类型标签：" prop="plabel">
              <el-cascader
                v-model="ruleForm1.plabel"
                :options="options"
                ref="plabelRegion"
                :show-all-levels="false"
                :props="props"
                @change="plabelChange"
              ></el-cascader>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="select(1)">搜索</el-button>
              <el-button @click="resetForm('ruleForm1', 1)">重置</el-button>
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
          <el-table-column label="图片" width="120px">
            <template slot-scope="scope">
              <img
                :src="scope.row.kjwl_p_portrait"
                style="width: 90px; height: 120px; object-fit: contain"
              />
            </template>
          </el-table-column>
          <el-table-column
            property="kjwl_p_name"
            label="姓名"
          ></el-table-column>
          <el-table-column
            property="kjwl_p_position"
            label="职务"
          ></el-table-column>
          <el-table-column
            property="kjwl_p_enterprise"
            label="任职企业"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                slot="reference"
                @click="personAdd(scope.$index, scope.row, 1)"
                >添加</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="PagingToolbar">
          <el-pagination
            :hide-on-single-page="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length"
          >
          </el-pagination>
        </div>
      </div>

      <div v-if="status === '请选择你所需要添加的企业:'">
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
              @click="select(2)"
            ></el-button>
          </el-input> -->
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="100px"
            :inline="true"
          >
            <el-form-item label="公司名称：" prop="name">
              <el-input
                v-model="ruleForm.name"
                placeholder="请输入公司名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="法定代表人：" prop="penson">
              <el-input
                v-model="ruleForm.penson"
                placeholder="请输入法定代表人"
              ></el-input>
            </el-form-item>
            <el-form-item label="成立日期：" prop="datetime">
              <el-date-picker
                v-model="ruleForm.datetime"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="类型标签：" prop="elabel">
              <el-cascader
                :value="ruleForm.elabel"
                :options="options"
                ref="elabelRegion"
                :show-all-levels="false"
                :props="props"
                @change="elabelChange"
              ></el-cascader>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="select(2)">搜索</el-button>
              <el-button @click="resetForm('ruleForm', 2)">重置</el-button>
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
          <el-table-column label="图片" width="120px">
            <template slot-scope="scope">
              <img
                :src="scope.row.kjwl_e_portrait"
                style="width: 90px; height: 120px; object-fit: contain"
              />
            </template>
          </el-table-column>
          <el-table-column
            property="kjwl_e_name"
            label="名称"
          ></el-table-column>
          <el-table-column
            property="kjwl_e_lrpeople"
            label="法定代表人"
          ></el-table-column>
          <el-table-column
            property="kjwl_e_setdate"
            label="成立日期"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                slot="reference"
                @click="personAdd(scope.$index, scope.row, 2)"
                >添加</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="PagingToolbar">
          <el-pagination
            :hide-on-single-page="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
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
      :width="status1 === '标签:' ? '30%' : '60%'"
      :before-close="handleClose1"
    >
      <!-- <div v-if="status1 === '标签:'">
        <el-table :data="data">
          <el-table-column
            property="ncontent"
            label="标签内容"
            width="180"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-popconfirm
                style="margin-left: 10px"
                confirm-button-text="确定"
                @confirm="handleDelete(scope.$index, scope.row, 1)"
                cancel-button-text="不用了"
                icon="el-icon-info"
                icon-color="red"
                title="确定删除该条标签信息吗？"
              >
                <el-button size="mini" type="danger" slot="reference"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div> -->

      <div v-if="status1 === '相关人员:'">
        <el-form
          :model="ruleForm1"
          ref="ruleForm1"
          label-width="100px"
          :inline="true"
        >
          <el-form-item label="人物姓名：" prop="name">
            <el-input
              v-model="ruleForm1.name"
              placeholder="请输入人物姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="职务：" prop="position">
            <el-input
              v-model="ruleForm1.position"
              placeholder="请输入职务"
            ></el-input>
          </el-form-item>
          <el-form-item label="任职企业：" prop="enterprise">
            <el-input
              v-model="ruleForm1.enterprise"
              placeholder="请输入任职企业"
            ></el-input>
          </el-form-item>
          <el-form-item label="类型标签：" prop="plabel">
            <el-cascader
              v-model="ruleForm1.plabel"
              :options="options"
              ref="plabelRegionDel"
              :show-all-levels="false"
              :props="props"
              @change="plabelDel"
            ></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="selectdata(1)">搜索</el-button>
            <el-button @click="resetForm('ruleForm1', 1)">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="
            data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
          "
          max-height="450"
        >
          <el-table-column label="图片" width="120px">
            <template slot-scope="scope">
              <img
                :src="scope.row.kjwl_p_portrait"
                style="width: 90px; height: 120px; object-fit: contain"
              />
            </template>
          </el-table-column>
          <el-table-column
            property="kjwl_p_name"
            label="姓名"
          ></el-table-column>
          <el-table-column
            property="kjwl_p_position"
            label="职务"
          ></el-table-column>
          <el-table-column
            property="kjwl_p_enterprise"
            label="任职企业"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-popconfirm
                style="margin-left: 10px"
                confirm-button-text="确定"
                @confirm="handleDelete(scope.$index, scope.row, 2)"
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
            :hide-on-single-page="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="data.length"
          >
          </el-pagination>
        </div>
      </div>

      <div v-if="status1 === '相关企业:'">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          :inline="true"
        >
          <el-form-item label="公司名称：" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入公司名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="法定代表人：" prop="penson">
            <el-input
              v-model="ruleForm.penson"
              placeholder="请输入法定代表人"
            ></el-input>
          </el-form-item>
          <el-form-item label="成立日期：" prop="datetime">
            <el-date-picker
              v-model="ruleForm.datetime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="类型标签：" prop="elabel">
            <el-cascader
              :value="ruleForm.elabel"
              :options="options"
              ref="elabelRegionDel"
              :show-all-levels="false"
              :props="props"
              @change="elabelDel"
            ></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="selectdata(2)">搜索</el-button>
            <el-button @click="resetForm('ruleForm', 2)">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="
            data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
          "
          max-height="450"
        >
          <el-table-column label="图片" width="120px">
            <template slot-scope="scope">
              <img
                :src="scope.row.kjwl_e_portrait"
                style="width: 90px; height: 120px; object-fit: contain"
              />
            </template>
          </el-table-column>
          <el-table-column
            property="kjwl_e_name"
            label="名称"
          ></el-table-column>
          <el-table-column
            property="kjwl_e_lrpeople"
            label="法定代表人"
          ></el-table-column>
          <el-table-column
            property="kjwl_e_setdate"
            label="成立日期"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-popconfirm
                style="margin-left: 10px"
                confirm-button-text="确定"
                @confirm="handleDelete(scope.$index, scope.row, 3)"
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
            :hide-on-single-page="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
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
// import { dateTimeFn } from "@/utils/datetime";
import E from "wangeditor";
export default {
  name: "newsadd",
  data() {
    return {
      status: "",
      status1: "",
      dialogVisible: false,
      dialogVisible1: false,
      // ncontent: "",
      data: "",
      nlabel: [
        // [3, 16, 38],
        // [3, 16, 39],
        // [3, 16, 40],
        // [4, 20, 46],
        // [4, 20, 47],
      ],
      array: [],

      editor: "",
      input: "",
      currentPage: 1,
      pageSize: 5,
      pageSizes: [1, 2, 5, 10, 20],
      tableData: [],
      personInfromation: [],
      enterpriseInfromation: [],
      radio: 0,

      newInformation: {
        newTitle: "",
        newUrl: "",
        newDate: "",
        newLink: "",
      },
      ruleForm: {
        name: "",
        penson: "",
        datetime: "",
        elabel: "",
        array: [],
      },
      ruleForm1: {
        name: "",
        position: "",
        enterprise: "",
        plabel: "",
        array: [],
      },

      props: {
        multiple: true,
        value: "qyss_l_id",
        label: "qyss_l_name",
        children: "children",
      },
      options: [],
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    async refresh() {
      this.editor = new E("#div1");
      this.editor.config.height = 420;
      this.editor.config.zIndex = 1;
      this.editor.create();
      this.selectCascader();
      // var str = await this.$axios.get("/api/admin/newsEditor/3");
      // console.log(str.data[0].content);
      // let data = JSON.parse(str.data[0].content);
      // console.log('data:',data)
      // this.editor.txt.html(data);
    },
    async selectCascader() {
      let res = await this.$axios.get("/api/admin/news/selectCascader");
      console.log(res.data);
      if (res.data) this.options = res.data;
    },
    handleClose(done) {
      // this.$confirm("确认关闭？").then((_) => {
      // if (_) done();

      // this.ncontent = "";
      // this.currentPage = 1;
      // this.ruleForm1 = {};
      // this.ruleForm = {};
      if (this.status === "请选择你所需要添加的人员:") {
        this.$refs.ruleForm1.resetFields();
      }
      if (this.status === "请选择你所需要添加的企业:") {
        this.$refs.ruleForm.resetFields();
      }
      done();
      // });
    },
    handleClose1(done) {
      // this.$confirm("确认关闭？").then((_) => {
      // if (_) done();

      // this.currentPage = 1;
      if (this.status1 === "相关人员:") {
        this.$refs.ruleForm1.resetFields();
      }
      if (this.status1 === "相关企业:") {
        this.$refs.ruleForm.resetFields();
      }
      // this.$refs.ruleForm1.resetFields();
      // this.$refs.ruleForm.resetFields();
      // this.ruleForm1 = {};
      // this.ruleForm = {};
      done();

      // });
    },
    close() {
      this.dialogVisible = false;
      // this.ncontent = "";
    },
    async addHandler(val) {
      let res;
      if (val === 1) this.status = "请输入你所需要添加的标签:";
      if (val === 2) {
        this.status = "请选择你所需要添加的人员:";
        res = await this.$axios.get("/api/admin/bosssel");
        console.log(res);
        if (res.data) this.tableData = res.data;
      }
      if (val === 3) {
        this.status = "请选择你所需要添加的企业:";
        res = await this.$axios.get("/api/admin/enterprisesel");
        console.log(res);
        if (res.data) this.tableData = res.data;
      }
      this.currentPage = 1;
      this.dialogVisible = true;
    },
    delHandler(val) {
      // if (val === 1) {
      //   this.status1 = "标签:";
      //   this.data = this.nlabel;
      // }
      if (val === 2) {
        this.status1 = "相关人员:";
        this.data = this.personInfromation;
        // this.resetForm('ruleForm1', 1)
      }
      if (val === 3) {
        this.status1 = "相关企业:";
        this.data = this.enterpriseInfromation;
        // this.resetForm('ruleForm', 2)
      }
      this.currentPage = 1;
      this.dialogVisible1 = true;
    },
    // async baseHandler() {
    //   if (this.status === "请输入你所需要添加的标签:") {
    //     this.nlabel.push({ ncontent: this.ncontent });
    //   }
    //   console.log(this.nlabel);
    //   this.ncontent = "";
    //   this.dialogVisible = false;
    // },
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
        // if (val === 1) {
        //   arr = this.nlabel;
        // } else
        if (val === 2) {
          arr = this.personInfromation;
        } else if (val === 3) {
          arr = this.enterpriseInfromation;
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

    async select(val) {
      console.log("input:", this.input, val);
      let res;
      if (val === 1) {
        // if (this.input === "") {
        //   res = await this.$axios.get("/api/admin/bosssel");
        // } else {
        //   res = await this.$axios.get(`/api/admin/boss/select/${this.input}`);
        // }
        // if (res.data) {
        //   this.tableData = res.data;
        //   this.currentPage = 1;
        // }

        let params = { ...this.ruleForm1 };
        console.log("params:", params);
        res = await this.$axios.post(`/api/admin/boss/select/`, params);
      }
      if (val === 2) {
        // if (this.input === "") {
        //   res = await this.$axios.get("/api/admin/enterprisesel");
        // } else {
        //   res = await this.$axios.get(
        //     `/api/admin/enterprise/select/${this.input}`
        //   );
        // }
        // if (res.data) {
        //   this.tableData = res.data;
        //   this.currentPage = 1;
        // }

        let params = { ...this.ruleForm };
        console.log("params:", params);
        res = await this.$axios.post(`/api/admin/enterprise/select`, params);
      }
      if (res.data) {
        this.tableData = res.data;
        this.currentPage = 1;
      }
    },
    resetForm(formName, val) {
      this.$refs[formName].resetFields();
      this.ruleForm.array = [];
      this.ruleForm1.array = [];
      if (val === 1) {
        this.select(val);
        this.selectdata(val);
      }
      if (val === 2) {
        this.select(val);
        this.selectdata(val);
      }
    },
    // async select() {
    //   let params = { ...this.ruleForm };
    //   console.log("params:", params);
    //   var res = await this.$axios.post(`/api/admin/enterprise/select`, params);
    //   if (res.data) {
    //     this.tableData = res.data;
    //   }
    // },
    selectdata(val) {
      let arr = [];
      let list = [];
      let nameReg,
        arrayReg,
        strOneReg,
        strTwoReg,
        nameField,
        arrayField,
        strOneField,
        strTwoField;
      if (val === 2) {
        console.log("这是企业的", val);
        arr = this.enterpriseInfromation;
        console.log("ruleForm1:", this.ruleForm, this.enterpriseInfromation);
        nameReg = this.ruleForm.name;
        arrayReg = this.ruleForm.array;
        strOneReg = this.ruleForm.datetime;
        strTwoReg = this.ruleForm.penson;
        nameField = "kjwl_e_name";
        arrayField = "qyss_e_labelName";
        strOneField = "kjwl_e_setdate";
        strTwoField = "kjwl_e_lrpeople";
      }
      if (val === 1) {
        console.log("这是人员的", val);
        arr = this.personInfromation;
        console.log("ruleForm1:", this.ruleForm1, this.personInfromation);
        nameReg = this.ruleForm1.name;
        arrayReg = this.ruleForm1.array;
        strOneReg = this.ruleForm1.position;
        strTwoReg = this.ruleForm1.enterprise;
        nameField = "kjwl_p_name";
        arrayField = "qyss_p_labelName";
        strOneField = "kjwl_p_position";
        strTwoField = "kjwl_p_enterprise";
      }
      const name = new RegExp(`(${nameReg})`);
      const array = new RegExp(`(${arrayReg})`);
      const strOne = new RegExp(`(${strOneReg})`);
      const strTwo = new RegExp(`${strTwoReg}`);
      // console.log("reg:", name, position, enterprise, reg);
      arr.forEach((item) => {
        // console.log(
        //   "val:",
        //   name.test(item.kjwl_p_name),
        //   position.test(item.kjwl_p_position),
        //   enterprise.test(item.kjwl_p_enterprise),
        //   reg.test(item.qyss_p_labelName)
        // );
        if (
          name.test(item[nameField]) &&
          strOne.test(item[strOneField]) &&
          strTwo.test(item[strTwoField]) &&
          array.test(item[arrayField])
        ) {
          list.push(item);
        }
      });
      this.data = list;
      // console.log("list:", list);
    },
    personAdd(index, row, val) {
      if (val === 1) {
        this.personInfromation.push(row);
        this.personInfromation = this.unique(this.personInfromation, 1);
        console.log("personInfromation:", this.personInfromation);
      }
      if (val === 2) {
        this.enterpriseInfromation.push(row);
        this.enterpriseInfromation = this.unique(this.enterpriseInfromation, 2);
        console.log("enterpriseInfromation:", this.enterpriseInfromation);
      }
      if ((index, row, val)) return;
    },
    //去重
    unique(arr, val) {
      var hash = {};
      if (val === 1) {
        arr = arr.reduce(function (item, next) {
          console.log(item, next);
          hash[next.kjwl_p_id]
            ? ""
            : (hash[next.kjwl_p_id] = true && item.push(next));
          return item;
        }, []);
      }
      if (val === 2) {
        arr = arr.reduce(function (item, next) {
          console.log(item, next);
          hash[next.kjwl_e_id]
            ? ""
            : (hash[next.kjwl_e_id] = true && item.push(next));
          return item;
        }, []);
      }
      return arr;
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

    nlabelchange(val) {
      console.log("val:", val);
      this.handlechange(val,'region', 1);
    },
    plabelChange(val) {
      console.log("val:", val);
      this.handlechange(val,'plabelRegion', 2);
    },
    elabelChange(val) {
      console.log("val:", val);
      this.handlechange(val,'elabelRegion', 3);
    },
    plabelDel(val) {
      console.log("val:", val);
      this.handlechange(val,'plabelRegionDel', 4);
    },
    elabelDel(val) {
      console.log("val:", val);
      this.handlechange(val,'elabelRegionDel', 5);
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
              if (num === 2 || num === 3) {
                array.push(i.label);
              }
              if (num === 4 || num === 5) {
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
          this.nlabel = label;
        }
        if (num === 2) {
          this.ruleForm1.array = array.join("%");
          this.ruleForm1.plabel = label;
        }
        if (num === 3) {
          this.ruleForm.array = array.join("%");
          this.ruleForm.elabel = label;
        }
        if (num === 4) {
          this.ruleForm1.array = array.join("|");
          this.ruleForm1.plabel = label;
        }
        if (num === 5) {
          this.ruleForm.array = array.join("|");
          this.ruleForm.elabel = label;
        }
      });
    },
    delnabel(item, index) {
      // console.log("item,index:", item, index);
      this.array.splice(index, 1);
      this.nlabel.splice(index, 1);
      this.$refs.region.clearCheckedNodes(item);
      // console.log('array:',this.array);
      // console.log('nlabel:', this.nlabel);
    },
    toback() {
      this.$router.push({ path: "/news" });
    },

    async newInfSave() {
      console.log("这是保存事件");

      if (
        this.editor.txt.html() === "" ||
        this.newInformation.newTitle === ""
      ) {
        this.$message({
          message: "警告！新闻的标题和内容不能为空，请输入数据",
          type: "warning",
        });
      } else {
        let str = JSON.stringify(this.editor.txt.html());
        console.log(
          "data:",
          this.newInformation,
          this.nlabel,
          this.array,
          str,
          this.personInfromation,
          this.enterpriseInfromation,
          this.radio
        );
        // if (this.nlabel.length <= 0) this.nlabel.push({ ncontent: "-" });

        let nlabel = JSON.stringify(this.nlabel);
        let array = JSON.stringify(this.array);

        console.log("label:", nlabel, array);

        for (let i in this.newInformation) {
          if (this.newInformation[i] === "") {
            this.newInformation[i] = "-";
          }
        }

        var res = await this.$axios.post("/api/admin/newsadd", {
          newInformation: this.newInformation,
          nlabel: nlabel,
          array: array,
          personInfromation: this.personInfromation,
          enterpriseInfromation: this.enterpriseInfromation,
          content: str,
          positive: this.radio,
        });
        console.log(res);
        this.$router.push("/news");
      }
    },
  },
};
</script>

<style scoped>
@import "../../css/newsadd.css";
::v-deep.el-cascader-panel .el-cascader-menu .el-cascader-menu__wrap {
  height: 100%;
}
::v-deep.el-cascader-panel .el-scrollbar .el-scrollbar__wrap {
  /* overflow: scroll; */
  /* height: 100%; */
  padding: 0px 10px 15px 0px;
}
</style>