<template>
  <div id="enterpriseadd">
    <div class="enterpriseadd">
      <div class="eadd_topnav">
        <el-button
          type="primary"
          style="width: 80px; margin-top: 15px; margin-left: 900px"
          @click="handlerSave"
          >保存</el-button
        >
      </div>
      <div class="eadd_con">
        <div class="eadd_con_tu">
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
        <div class="eadd_con_basic">
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              公&emsp;&nbsp;司&emsp;&nbsp;名&emsp;&nbsp;称:
            </div>
            <div class="eadd_cb_right">
              <el-input
                placeholder="请输入公司名称"
                v-model="companyInformation.companyName"
                clearable
                style="width: 100%; height: 35px"
              >
              </el-input>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              标&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;签:
            </div>
            <div class="r_elabel">
              <div
                class="nadd_cnl_con"
                v-for="(item, index) in array"
                :key="index"
              >
                <span class="newLable"
                  >{{ item.label }}&nbsp;<i
                    class="el-icon-circle-close"
                    @click="delnabel(item, index)"
                  ></i
                ></span>
              </div>
              <div class="eadd_cb_caoz">
                <el-button type="text" @click="addHandler(1)"
                  ><i class="el-icon-circle-plus-outline"></i
                ></el-button>
                <!-- <el-button type="text" @click="delHandler(1)"
                  ><i class="el-icon-delete"></i
                ></el-button> -->
              </div>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              法&ensp;&nbsp;定&ensp;&nbsp;代&ensp;&nbsp;表&ensp;&nbsp;人:
            </div>
            <div class="eadd_cb_right">
              <el-input
                placeholder="请输入法定代表人"
                v-model="companyInformation.lrpeople"
                @focus="lrpeopleDialogOpen"
              >
              </el-input>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              成&emsp;&nbsp;立&emsp;&nbsp;日&emsp;&nbsp;期:
            </div>
            <div class="eadd_cb_right">
              <el-date-picker
                v-model="companyInformation.setDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择成立日期"
                style="width: 100%"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              注&emsp;&nbsp;册&emsp;&nbsp;资&emsp;&nbsp;本:
            </div>
            <div class="eadd_cb_right">
              <el-input
                placeholder="请输入注册资本"
                v-model="companyInformation.regcapital"
                @blur="digitalCalibration(companyInformation.regcapital, 1)"
                clearable
              >
              </el-input>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              实&emsp;&nbsp;缴&emsp;&nbsp;资&emsp;&nbsp;本:
            </div>
            <div class="eadd_cb_right">
              <el-input
                placeholder="请输入实缴资本"
                v-model="companyInformation.concapital"
                @blur="digitalCalibration(companyInformation.concapital, 2)"
                clearable
              >
              </el-input>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              企&emsp;&nbsp;业&emsp;&nbsp;类&emsp;&nbsp;型:
            </div>
            <div class="eadd_cb_right">
              <el-input
                placeholder="请输入企业类型"
                v-model="companyInformation.companyType"
                clearable
              >
              </el-input>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              参&emsp;&nbsp;保&emsp;&nbsp;人&emsp;&nbsp;数:
            </div>
            <div class="eadd_cb_right">
              <el-input
                placeholder="请输入参保人数"
                v-model="companyInformation.ginsengnum"
                @blur="digitalCalibration(companyInformation.ginsengnum, 3)"
                clearable
              >
              </el-input>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              人&emsp;&nbsp;员&emsp;&nbsp;规&emsp;&nbsp;模:
            </div>
            <div class="eadd_cb_right">
              <el-input
                placeholder="请输入人员规模"
                v-model="companyInformation.staffnum"
                @blur="digitalCalibration(companyInformation.staffnum, 4)"
                clearable
              >
              </el-input>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left left1">统一社会信用代码:</div>
            <div class="eadd_cb_right">
              <el-input
                placeholder="请输入统一社会信用代码"
                v-model="companyInformation.utscc"
                clearable
                @blur="alphanumericCheck(companyInformation.utscc, 1)"
              >
              </el-input>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              纳&nbsp;税&ensp;人&ensp;识&ensp;别&nbsp;号:
            </div>
            <div class="eadd_cb_right">
              <el-input
                placeholder="请输入纳税人识别号"
                v-model="companyInformation.taxpayernum"
                clearable
                @blur="alphanumericCheck(companyInformation.taxpayernum, 2)"
              >
              </el-input>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              工&ensp;&nbsp;商&ensp;&nbsp;注&ensp;&nbsp;册&ensp;&nbsp;号:
            </div>
            <div class="eadd_cb_right">
              <el-input
                placeholder="请输入工商注册号"
                v-model="companyInformation.bregnum"
                clearable
                @blur="alphanumericCheck(companyInformation.bregnum, 3)"
              >
              </el-input>
            </div>
          </div>
        </div>

        <div class="eadd_con_specific">
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              纳&ensp;&nbsp;税&ensp;&nbsp;人&ensp;&nbsp;资&ensp;&nbsp;质:
            </div>
            <div class="eadd_cb_right">
              <el-input
                placeholder="请输入纳税人资质"
                v-model="companyInformation.taxpayerqua"
                clearable
              >
              </el-input>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              组&nbsp;织&ensp;机&ensp;构&ensp;代&nbsp;码:
            </div>
            <div class="eadd_cb_right">
              <el-input
                placeholder="请输入组织机构代码"
                v-model="companyInformation.orgcode"
                clearable
                @blur="alphanumericCheck(companyInformation.orgcode, 4)"
              >
              </el-input>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">进 出 口 企 业代码:</div>
            <div class="eadd_cb_right">
              <el-input
                placeholder="请输入进出口企业代码"
                v-model="companyInformation.iaeecode"
                clearable
                @blur="alphanumericCheck(companyInformation.iaeecode, 5)"
              >
              </el-input>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              英&emsp;&emsp;&ensp;文&emsp;&emsp;&ensp;名:
            </div>
            <div class="eadd_cb_right">
              <el-input
                placeholder="请输入英文名"
                v-model="companyInformation.ename"
                @blur="englishCheck(companyInformation.ename)"
                clearable
              >
              </el-input>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              曾&emsp;&emsp;&ensp;用&emsp;&emsp;&ensp;名:
            </div>
            <div class="eadd_cb_right">
              <el-input
                placeholder="请输入曾用名"
                v-model="companyInformation.fname"
                clearable
              >
              </el-input>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              所&emsp;&nbsp;属&emsp;&nbsp;行&emsp;&nbsp;业:
            </div>
            <div class="eadd_cb_right">
              <el-input
                placeholder="请输入所属行业"
                v-model="companyInformation.industry"
                clearable
              >
              </el-input>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              营&emsp;&nbsp;业&emsp;&nbsp;期&emsp;&nbsp;限:
            </div>
            <div class="eadd_cb_right">
              <el-date-picker
                v-model="companyInformation.businessterm"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                style="width: 100%"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              登&emsp;&nbsp;记&emsp;&nbsp;机&emsp;&nbsp;关:
            </div>
            <div class="eadd_cb_right">
              <el-input
                placeholder="请输入登记机关"
                v-model="companyInformation.regauthority"
                clearable
              >
              </el-input>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              校&emsp;&nbsp;准&emsp;&nbsp;日&emsp;&nbsp;期:
            </div>
            <div class="eadd_cb_right">
              <el-date-picker
                v-model="companyInformation.approvaldate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择成立日期"
                style="width: 100%"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              电&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;话:
            </div>
            <div class="eadd_cb_right">
              <el-input
                placeholder="请输入电话"
                v-model="companyInformation.phone"
                clearable
                @blur="phoneCheck(companyInformation.phone)"
              >
              </el-input>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left left1">
              官&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;网:
            </div>
            <div class="eadd_cb_right">
              <el-input
                placeholder="请输入官网"
                v-model="companyInformation.website"
                clearable
                @blur="siteCheck(companyInformation.website)"
              >
              </el-input>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              邮&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;箱:
            </div>
            <div class="eadd_cb_right">
              <el-input
                placeholder="请输入邮箱"
                v-model="companyInformation.email"
                clearable
                @blur="emailCheck(companyInformation.email)"
              >
              </el-input>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              地&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;址:
            </div>
            <div class="eadd_cb_right">
              <el-input
                placeholder="请输入地址"
                v-model="companyInformation.address"
                clearable
              >
              </el-input>
            </div>
          </div>
        </div>

        <div class="eadd_con_businessscope">
          <div class="eadd_cb_topnav">经营范围:</div>
          <div class="eadd_cb_buscon">
            <div id="div1"></div>
          </div>
        </div>
        <div class="eadd_con_businessscope">
          <div class="eadd_cb_topnav">简介:</div>
          <div class="eadd_cb_buscon">
            <div id="div2"></div>
          </div>
        </div>

        <div class="eadd_con_pckuang">
          <div class="eadd_cpck_topnav">
            <div class="eadd_cpck_top_lift">股东信息：</div>
            <div class="eadd_cpck_top_right">
              <el-button
                type="primary"
                size="small"
                style="width: 60px"
                @click="addHandler(2)"
                ><i class="el-icon-circle-plus-outline"></i
              ></el-button>
              <el-button
                type="primary"
                size="small"
                style="width: 60px; margin-left: 45px"
                @click="delHandler(2)"
                ><i class="el-icon-delete"></i
              ></el-button>
            </div>
          </div>
          <div
            class="eadd_cpck_con"
            v-for="(item, index) in personInfromation"
            :key="index"
          >
            <div class="eadd_cpck_con_tu">
              <img
                :src="item.kjwl_p_portrait"
                alt=""
                style="width: 120px; height: 160px; object-fit: contain"
              />
            </div>
            <div class="eadd_cpck_con_name">{{ item.kjwl_p_name }}</div>
            <div class="eadd_cpck_con_birthdate">
              {{ item.kjwl_p_birthdate }}
            </div>
            <div class="eadd_cpck_con_position">{{ item.kjwl_p_position }}</div>
            <div class="eadd_cpck_con_enterprise">
              {{ item.kjwl_p_enterprise }}
            </div>
          </div>
        </div>

        <div class="eadd_topnav">
          <!-- <el-button
            type="primary"
            style="width: 200px; margin: 15px 400px"
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
      </div>
      <lrpeopleDialog
        :visible.sync="showDialog"
        :detail.sync="curDimesion"
        @add="addLrpeopleFn"
      ></lrpeopleDialog>

      <el-dialog
        :title="status"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        :width="status === '请输入你所需要添加的标签:' ? '1015px' : '60%'"
      >
        <div v-if="status === '请输入你所需要添加的标签:'">
          <!-- 标签内容：<el-input
            id="ename"
            v-model="ename"
            aria-placeholder="请输入标签内容"
            style="margin-bottom: 30px"
          ></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="close(1)" style="margin: 0px 20px"
              >取 消</el-button
            >
            <el-button
              type="primary"
              @click="baseHandler(1)"
              style="margin: 0px 20px"
              >确 定</el-button
            >
          </span> -->
          <el-cascader-panel
            :value="elabel"
            :options="options"
            ref="region"
            :show-all-levels="false"
            :props="props"
            @change="elabelChange"
          ></el-cascader-panel>
        </div>

        <div v-if="status === '请选择要添加的人员:'" class="personAdd">
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
                <el-button type="primary" @click="select()">搜索</el-button>
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
        :width="status1 === '标签:' ? '30%' : '60%'"
      >
        <!-- <div v-if="status1 === '标签:'">
          <el-table :data="data">
            <el-table-column
              property="ename"
              label="标签内容"
              width="200"
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
                  title="确定删除该条信息吗？"
                >
                  <el-button size="mini" type="danger" slot="reference"
                    >删除</el-button
                  >
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div> -->

        <div v-if="status1 === '股东信息:'">
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
            <el-form-item label="类型标签：" prop="plable">
              <el-cascader
                v-model="ruleForm1.plabel"
                :options="options"
                ref="plableRegionDel"
                :show-all-levels="false"
                :props="props"
                @change="plabeldel"
              ></el-cascader>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="selectdata()">搜索</el-button>
              <el-button @click="resetForm('ruleForm1', 2)">重置</el-button>
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
  </div>
</template>

<script>
import { cookiefn } from "@/utils/cookiefn";
import { dateTimeFn } from "@/utils/datetime";
import E from "wangeditor";
import lrpeopleDialog from "./lrpeopleDialog.vue";

export default {
  name: "enterpriseeditor",
  components: {
    lrpeopleDialog,
  },
  data() {
    return {
      flag: 0,
      status: "",
      status1: "",
      dialogVisible: false,
      dialogVisible1: false,
      ename: "",
      data: "",
      elabel: [],
      tableData: [],
      showDialog: false,
      curDimesion: [],

      editor1: "",
      editor2: "",
      imageUrl: "",
      input: "",
      currentPage: 1,
      pageSize: 5,
      pageSizes: [4, 8, 12, 16],
      props: {
        multiple: true,
        value: "qyss_l_id",
        label: "qyss_l_name",
        children: "children",
      },
      options: [],
      array: [],
      ruleForm1: {
        name: "",
        position: "",
        enterprise: "",
        plabel: "",
        array: [],
      },

      personInfromation: [],

      companyInformation: {
        companyName: "", //公司名称
        lrpeople: "", //法定代表人
        lrpeopleId: null, //法定代表人Id
        setDate: "", //成立日期
        regcapital: "", //注册资本
        concapital: "", //实缴资本
        companyType: "", //企业类型
        ginsengnum: "", //参保人数
        staffnum: "", //人员规模
        utscc: "", //统一社会信用代码
        taxpayernum: "", //纳税人识别号
        bregnum: "", //工商注册号
        taxpayerqua: "", //纳税人资质
        orgcode: "", //组织机构代码
        iaeecode: "", //进出口企业代码
        ename: "", //英文名
        fname: "", //曾用名
        industry: "", //所属行业
        businessterm: "", //营业期限
        regauthority: "", //登记机关
        approvaldate: "", //校准日期
        phone: "", //电话
        website: "", //官网
        email: "", //邮箱
        address: "", //地址
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
      this.enterpriseId = obj.enterpriseId;
      console.log(this.enterpriseId);

      let res = await this.$axios.get(
        `/api/admin/enterprisedetails/${this.enterpriseId}`
      );
      console.log("res: ", res.data);
      if (res.data) {
        const { edata, esdata, epdata } = res.data;

        this.getPerson(epdata);

        const {
          kjwl_e_address, //地址
          kjwl_e_email, //邮箱
          kjwl_e_lrpeople, //法定代表人
          kjwl_e_name, //公司名称
          kjwl_e_phone, //电话
          kjwl_e_portrait, //图片
          kjwl_e_regcapital, //注册资本
          kjwl_e_setdate, //成立日期
          kjwl_e_website, //网址
          qyss_e_labelName, //标签名称
          qyss_e_labelPath, //标签回显路径value值
        } = edata;
        const {
          kjwl_e_approvaldate, //校验日期
          kjwl_e_bregnum, //工商注册号
          kjwl_e_businessterm, //营业期限
          kjwl_e_concapital, //实缴资本
          kjwl_e_ename, //英文名
          kjwl_e_fname, //曾用名
          kjwl_e_ginsengnum, //参保人数
          kjwl_e_iaeecode, //进出口企业代码
          kjwl_e_industry, //所属行业
          kjwl_e_orgcode, //组织机构代码
          kjwl_e_regauthority, //登记机关
          kjwl_e_staffnum, //人员规模
          kjwl_e_taxpayernum, //纳税人识别号
          kjwl_e_taxpayerqua, //纳税人资质
          kjwl_e_type, //公司类型
          kjwl_e_utscc, //统一社会信用代码
          kjwl_e_businessscope, //经营范围
          kjwl_e_resume, //简介
        } = esdata;

        // ldata.forEach((item) => {
        //   this.elabel.push({ ename: item.kjwl_el_name });
        // });
        this.array = JSON.parse(qyss_e_labelName);
        this.elabel = JSON.parse(qyss_e_labelPath);
        this.imageUrl = kjwl_e_portrait;
        this.companyInformation.companyName = kjwl_e_name;
        this.companyInformation.lrpeople = kjwl_e_lrpeople;
        if (kjwl_e_lrpeople) {
          this.curDimesion.push({ kjwl_p_name: kjwl_e_lrpeople });
        }

        if (kjwl_e_setdate !== "-") {
          this.companyInformation.setDate = dateTimeFn.showDate(kjwl_e_setdate);
        } else {
          this.companyInformation.setDate = "";
        }
        // this.companyInformation.setDate = kjwl_e_setdate;

        this.companyInformation.regcapital = kjwl_e_regcapital;
        this.companyInformation.concapital = kjwl_e_concapital;
        this.companyInformation.companyType = kjwl_e_type;
        this.companyInformation.ginsengnum = kjwl_e_ginsengnum;
        this.companyInformation.staffnum = kjwl_e_staffnum;
        this.companyInformation.utscc = kjwl_e_utscc;
        this.companyInformation.taxpayernum = kjwl_e_taxpayernum;
        this.companyInformation.bregnum = kjwl_e_bregnum;
        this.companyInformation.taxpayerqua = kjwl_e_taxpayerqua;
        this.companyInformation.orgcode = kjwl_e_orgcode;
        this.companyInformation.iaeecode = kjwl_e_iaeecode;
        this.companyInformation.ename = kjwl_e_ename;
        this.companyInformation.fname = kjwl_e_fname;
        this.companyInformation.industry = kjwl_e_industry;

        if (kjwl_e_businessterm !== "-") {
          let arr = kjwl_e_businessterm.split("至");
          arr[0] = dateTimeFn.showDate(arr[0]);
          arr[1] = dateTimeFn.showDate(arr[1]);
          this.companyInformation.businessterm = arr;
          console.log(
            "this.companyInformation.businessterm:",
            this.companyInformation.businessterm
          );
        } else {
          this.companyInformation.businessterm = "";
        }
        // this.companyInformation.businessterm = kjwl_e_businessterm;

        this.companyInformation.regauthority = kjwl_e_regauthority;

        if (kjwl_e_approvaldate !== "-") {
          this.companyInformation.approvaldate =
            dateTimeFn.showDate(kjwl_e_approvaldate);
        } else {
          this.companyInformation.approvaldate = "";
        }
        // this.companyInformation.approvaldate = kjwl_e_approvaldate;

        this.companyInformation.phone = kjwl_e_phone;
        this.companyInformation.website = kjwl_e_website;
        this.companyInformation.email = kjwl_e_email;
        this.companyInformation.address = kjwl_e_address;

        this.editor1 = new E("#div1");
        this.editor2 = new E("#div2");

        this.editor1.config.height = 350;
        this.editor1.config.zIndex = 1;
        this.editor2.config.height = 350;
        this.editor2.config.zIndex = 1;
        this.editor1.create();
        this.editor2.create();

        this.editor1.txt.html(JSON.parse(kjwl_e_businessscope));
        this.editor2.txt.html(JSON.parse(kjwl_e_resume));
      }
    },
    getPerson(data) {
      console.log("data:", data);
      data.forEach(async (item) => {
        console.log("item:", item);
        let res = await this.$axios.get(
          `/api/admin/boss/selectId/${item.kjwl_p_id}`
        );
        console.log("res:", res.data);
        this.personInfromation.push(res.data[0]);
      });
      console.log("personInfromation:", this.personInfromation);
    },
    handleClose(done) {
      // this.$confirm("确认关闭？").then((_) => {
      //   if (_) done();
      //   this.ename = "";
      //   this.currentPage = 1;
      // });
      if (this.status === "请选择要添加的人员:") {
        this.$refs.ruleForm1.resetFields();
      }
      done();
    },
    handleClose1(done) {
      // this.$confirm("确认关闭？").then((_) => {
      //   if (_) done();
      //   this.currentPage = 1;
      // });
      if (this.status1 === "股东信息:") {
        this.$refs.ruleForm1.resetFields();
      }
      done();
    },
    close() {
      // if (val === 1) this.ename = "";
      this.dialogVisible = false;
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
    },
    digitalCalibration(val, digital) {
      console.log("digitalCalibration:", val, digital);
      var reg = /^[0-9.]+$/;
      if (val !== "" && !reg.test(val)) {
        this.$message.error("该项只包含数字，请重新输入");
        if (digital === 1) this.companyInformation.regcapital = "";
        if (digital === 2) this.companyInformation.concapital = "";
        if (digital === 3) this.companyInformation.ginsengnum = "";
        if (digital === 4) this.companyInformation.staffnum = "";
      }
    },
    englishCheck(val) {
      console.log("englishCheck:", val);
      var reg = /^[ a-zA-Z.,]+$/;
      if (val !== "" && !reg.test(val)) {
        this.$message.error(
          "该项包含英文字母、空格以及标点符号',.'，请重新输入"
        );
        this.companyInformation.ename = "";
      }
    },
    // alphanumericCheck(val, digital) {
    //   console.log("alphanumericCheck:", val, digital);
    //   var reg = /^[0-9a-zA-Z-]+$/;
    //   if (val !== "" && !reg.test(val)) {
    //     this.$message.error("该项只包含数字字母和'-'，请重新输入");
    //     if (digital === 1) this.companyInformation.utscc = "";
    //     if (digital === 2) this.companyInformation.taxpayernum = "";
    //     if (digital === 3) this.companyInformation.bregnum = "";
    //     if (digital === 4) this.companyInformation.orgcode = "";
    //     if (digital === 5) this.companyInformation.iaeecode = "";
    //   }
    // },
    async alphanumericCheck(val, digital) {
      console.log("alphanumericCheck:", val, digital);
      var reg = /^[0-9a-zA-Z-]+$/;
      if (val !== "" && !reg.test(val)) {
        this.$message.error("该项只包含数字字母和'-'，请重新输入");
        if (digital === 1) this.companyInformation.utscc = "";
        if (digital === 2) this.companyInformation.taxpayernum = "";
        if (digital === 3) this.companyInformation.bregnum = "";
        if (digital === 4) this.companyInformation.orgcode = "";
        if (digital === 5) this.companyInformation.iaeecode = "";
      } else {
        console.log("这是通过了");
        let params = { value: val, digital: digital };
        console.log("params:", params);
        var res = await this.$axios.post(
          "/api/admin/enterpriseadd/check",
          params
        );
        console.log(res);
        const { num, type } = res.data;
        if (type) {
          this.$message.error("该项与数据库重复，请重新输入");
          if (num === 1) this.companyInformation.utscc = "";
          if (num === 2) this.companyInformation.taxpayernum = "";
          if (num === 3) this.companyInformation.bregnum = "";
          if (num === 4) this.companyInformation.orgcode = "";
          if (num === 5) this.companyInformation.iaeecode = "";
        }
      }
    },

    phoneCheck(val) {
      console.log("phoneCheck:", val);
      var reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
      if (val !== "" && !reg.test(val)) {
        this.$message.error("电话格式错误，请重新输入");
        this.companyInformation.phone = "";
      }
    },
    emailCheck(val) {
      console.log("emailCheck:", val);
      var reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
      if (val !== "" && !reg.test(val)) {
        this.$message.error("邮箱格式错误，请重新输入");
        this.companyInformation.email = "";
      }
    },
    siteCheck(val) {
      console.log("siteCheck:", val);
      const reg =
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w-]+)+[\w\-_~:/?#[\]@!&',;=.]+$/;
      if (val !== "" && !reg.test(val)) {
        this.$message.error("网址格式错误，请重新输入");
        this.companyInformation.website = "";
      }
    },
    async addHandler(val) {
      if (val === 1) this.status = "请输入你所需要添加的标签:";
      if (val === 2) {
        this.status = "请选择要添加的人员:";
        var res = await this.$axios.get("/api/admin/bosssel");
        console.log(res);
        if (res.data) this.tableData = res.data;
      }
      this.currentPage = 1;
      this.dialogVisible = true;
    },
    delHandler(val) {
      // if (val === 1) {
      //   this.status1 = "标签:";
      //   this.data = this.elabel;
      // }
      if (val === 2) {
        this.status1 = "股东信息:";
        this.data = this.personInfromation;
      }
      this.currentPage = 1;
      this.dialogVisible1 = true;
    },
    // baseHandler(val) {
    //   if (val === 1) {
    //     console.log(this.ename);
    //     this.elabel.push({ ename: this.ename });
    //     console.log(this.elabel);
    //     this.ename = "";
    //   }
    //   this.dialogVisible = false;
    // },
    personAdd(index, row) {
      this.personInfromation.push(row);
      this.personInfromation = this.unique(this.personInfromation);
      console.log("personInfromation:", this.personInfromation);
      if ((index, row)) return;
    },
    unique(arr) {
      var hash = {};
      arr = arr.reduce(function (item, next) {
        console.log(item, next);
        hash[next.kjwl_p_id]
          ? ""
          : (hash[next.kjwl_p_id] = true && item.push(next));
        return item;
      }, []);
      return arr;
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
        // if (val === 1) {
        //   arr = this.elabel;
        // } else
        if (val === 2) {
          arr = this.personInfromation;
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

    async select() {
      // console.log("input:", this.input);
      // if (this.input === "") {
      //   var res = await this.$axios.get("/api/admin/bosssel");
      // } else {
      //   res = await this.$axios.get(`/api/admin/boss/select/${this.input}`);
      // }
      // if (res.data) {
      //   this.tableData = res.data;
      //   this.currentPage = 1;
      // }
      let params = { ...this.ruleForm1 };
      console.log("params:", params);
      let res = await this.$axios.post(`/api/admin/boss/select/`, params);
      if (res.data) {
        this.tableData = res.data;
        this.currentPage = 1;
      }
    },
    selectdata() {
      let list = [];
      const name = new RegExp(`(${this.ruleForm1.name})`);
      const position = new RegExp(`(${this.ruleForm1.position})`);
      const enterprise = new RegExp(`(${this.ruleForm1.enterprise})`);
      const reg = new RegExp(`${this.ruleForm1.array}`);
      this.personInfromation.forEach((item) => {
        if (
          name.test(item.kjwl_p_name) &&
          position.test(item.kjwl_p_position) &&
          enterprise.test(item.kjwl_p_enterprise) &&
          reg.test(item.qyss_p_labelName)
        ) {
          list.push(item);
        }
      });
      this.data = list;
    },
    resetForm(formName, num) {
      this.$refs[formName].resetFields();
      this.ruleForm1.plabel = [];
      this.ruleForm1.array = [];
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
      this.$router.push({ path: "/enterprise" });
    },
    elabelChange(val) {
      console.log("val:", val);
      this.handlechange(val, "region", 1);
    },
    plabelChange(val) {
      console.log("val:", val);
      this.handlechange(val, "plabelRegion", 2);
    },
    plabeldel(val) {
      console.log("val:", val);
      this.handlechange(val, "plableRegionDel", 3);
    },
    handlechange(val, cascaderName, num) {
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
        console.log("elabel:", label);
        if (num === 1) {
          this.array = array;
          this.elabel = label;
        }
        if (num === 2) {
          this.ruleForm1.array = array.join("%");
          this.ruleForm1.plabel = label;
        }
        if (num === 3) {
          this.ruleForm1.array = array.join("|");
          this.ruleForm1.plabel = label;
        }
      });
    },
    delnabel(item, index) {
      // console.log("item,index:", item, index);
      this.array.splice(index, 1);
      this.elabel.splice(index, 1);
      this.$refs.region.clearCheckedNodes(item);
      // console.log('array:',this.array);
      // console.log('nlabel:', this.nlabel);
    },
    lrpeopleDialogOpen() {
      this.showDialog = true;
    },
    addLrpeopleFn(val) {
      this.curDimesion = val;
      console.log(111222, val, this.curDimesion);
      this.companyInformation.lrpeople = this.curDimesion[0]
        ? this.curDimesion[0].kjwl_p_name
        : null;
      this.companyInformation.lrpeopleId = this.curDimesion[0]
        ? this.curDimesion[0].kjwl_p_id
        : null;
    },

    async handlerSave() {
      let str1 = JSON.stringify(this.editor1.txt.html());
      let str2 = JSON.stringify(this.editor2.txt.html());

      if (this.companyInformation.companyName === "") {
        this.$message.error("公司名称不能为空，请重新输入");
        return;
      } else {
        if (str1 === '""') str1 = '"-"';
        if (str2 === '""') str2 = '"-"';

        // if (this.elabel.length <= 0) this.elabel.push({ ename: "-" });
        let elabel = JSON.stringify(this.elabel);
        let array = JSON.stringify(this.array);

        console.log("label:", elabel, array);

        if (
          this.companyInformation.businessterm === null ||
          this.companyInformation.businessterm === ""
        )
          this.companyInformation.businessterm = "-";
        else if (this.companyInformation.businessterm !== "-")
          this.companyInformation.businessterm =
            this.companyInformation.businessterm.join("至");

        // for (let i in this.companyInformation) {
        //   //   console.log(i); //对象中key的值
        //   //   console.log(this.companyInformation[i]); //对象中key对应的value的值

        //   if (
        //     this.companyInformation[i] == null ||
        //     this.companyInformation[i] == ""
        //   ) {
        //     console.log(i); //对象中key的值

        //     this.companyInformation[i] = "-";
        //   }
        // }

        // this.companyInformation.businessterm =
        //   this.companyInformation.businessterm.join("至");

        console.log(
          "data：",
          this.imageUrl,
          this.companyInformation,
          this.elabel,
          this.array,
          this.personInfromation,
          str1,
          str2
        );

        let res = await this.$axios.post("/api/admin/enterpriseeditor", {
          companyInformation: this.companyInformation,
          imageUrl: this.imageUrl,
          elabel: elabel,
          array: array,
          personInfromation: this.personInfromation,
          str1: str1,
          str2: str2,
          id: this.enterpriseId,
        });
        console.log("res:", res);
        if (res) this.$router.push("/enterprise");
      }
    },
  },
};
</script>

<style scoped>
@import "../../css/enterpriseeditor.css";
::v-deep.el-cascader-panel .el-cascader-menu .el-cascader-menu__wrap {
  height: 100%;
}
::v-deep.el-cascader-panel .el-scrollbar .el-scrollbar__wrap {
  /* overflow: scroll; */
  /* height: 100%; */
  padding: 0px 10px 15px 0px;
}
</style>