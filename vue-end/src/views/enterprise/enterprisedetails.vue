<template>
  <div id="enterpriseadd">
    <div class="enterpriseadd">
      <div class="eadd_topnav">
        <el-button
          type="primary"
          style="width: 80px; margin-top: 15px; margin-left: 900px"
          @click="clickfn('/enterprise')"
          >返回</el-button
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
            disabled
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <!-- <el-avatar shape="square" :size="100" fit="scale-down" v-if="imageUrl" :src="imageUrl" style="width: 100%;height: 100%;" /> -->
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="eadd_con_basic">
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              公&emsp;&nbsp;司&emsp;&nbsp;名&emsp;&nbsp;称:
            </div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.companyName || '-'}}
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              标&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;签:
            </div>
            <div class="r_elabel">
              <div
                class="nadd_cnl_con"
                v-for="(item, index) in elabel"
                :key="index"
              >
                <span class="newLable">{{ item.label }}</span>
              </div>
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              法&ensp;&nbsp;定&ensp;&nbsp;代&ensp;&nbsp;表&ensp;&nbsp;人:
            </div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.lrpeople || '-'}}
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              成&emsp;&nbsp;立&emsp;&nbsp;日&emsp;&nbsp;期:
            </div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.setDate || '-'}}
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              注&emsp;&nbsp;册&emsp;&nbsp;资&emsp;&nbsp;本:
            </div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.regcapital || '-'}} 万元
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              实&emsp;&nbsp;缴&emsp;&nbsp;资&emsp;&nbsp;本:
            </div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.concapital || '-'}} 万元
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              企&emsp;&nbsp;业&emsp;&nbsp;类&emsp;&nbsp;型:
            </div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.companyType || '-'}}
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              参&emsp;&nbsp;保&emsp;&nbsp;人&emsp;&nbsp;数:
            </div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.ginsengnum || '-'}} 人
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              人&emsp;&nbsp;员&emsp;&nbsp;规&emsp;&nbsp;模:
            </div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.staffnum || '-'}}
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left left1">统一社会信用代码:</div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.utscc || '-'}}
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              纳&nbsp;税&ensp;人&ensp;识&ensp;别&nbsp;号:
            </div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.taxpayernum || '-'}}
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              工&ensp;&nbsp;商&ensp;&nbsp;注&ensp;&nbsp;册&ensp;&nbsp;号:
            </div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.bregnum || '-'}}
            </div>
          </div>
        </div>

        <div class="eadd_con_specific">
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              纳&ensp;&nbsp;税&ensp;&nbsp;人&ensp;&nbsp;资&ensp;&nbsp;质:
            </div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.taxpayerqua || '-'}}
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              组&nbsp;织&ensp;机&ensp;构&ensp;代&nbsp;码:
            </div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.orgcode || '-'}}
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">进 出 口 企 业代码:</div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.iaeecode || '-'}}
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              英&emsp;&emsp;&ensp;文&emsp;&emsp;&ensp;名:
            </div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.ename || '-'}}
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              曾&emsp;&emsp;&ensp;用&emsp;&emsp;&ensp;名:
            </div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.fname || '-'}}
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              所&emsp;&nbsp;属&emsp;&nbsp;行&emsp;&nbsp;业:
            </div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.industry || '-'}}
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              营&emsp;&nbsp;业&emsp;&nbsp;期&emsp;&nbsp;限:
            </div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.businessterm || '-'}}
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              登&emsp;&nbsp;记&emsp;&nbsp;机&emsp;&nbsp;关:
            </div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.regauthority || '-'}}
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              校&emsp;&nbsp;准&emsp;&nbsp;日&emsp;&nbsp;期:
            </div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.approvaldate || '-'}}
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              电&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;话:
            </div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.phone || '-'}}
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left left1">
              官&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;网:
            </div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.website || '-'}}
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              邮&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;箱:
            </div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.email || '-'}}
            </div>
          </div>
          <div class="eadd_cb_wk">
            <div class="eadd_cb_left">
              地&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;址:
            </div>
            <div class="eadd_cb_right edetails_cb_right">
              {{ this.companyInformation.address || '-'}}
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
                disabled
                ><i class="el-icon-circle-plus-outline"></i
              ></el-button>
              <el-button
                type="primary"
                size="small"
                style="width: 60px; margin-left: 45px"
                @click="delHandler(2)"
                disabled
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
          <el-button
            type="primary"
            style="width: 200px; margin: 15px 400px"
            @click="clickfn('/enterprise')"
            >返回</el-button
          >
        </div>
      </div>

      <!-- <el-dialog
        :title="status"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        标签内容：<el-input
          id="ename"
          v-model="ename"
          aria-placeholder="请输入标签内容"
        ></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="baseHandler()">确 定</el-button>
        </span>
      </el-dialog> -->

      <!-- <el-dialog :title="status1" :visible.sync="dialogVisible1" width="30%">
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
                @confirm="handleDelete(scope.$index, scope.row)"
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
  </div>
</template>

<script>
import { cookiefn } from "@/utils/cookiefn";
import E from "wangeditor";
export default {
  name: "enterprisedetails",
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

      editor1: "",
      editor2: "",
      imageUrl: "",
      enterpriseId: "",
      personInfromation: [],

      companyInformation: {
        companyName: "", //公司名称
        lrpeople: "", //法定代表人
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
    async refresh() {
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
        this.elabel = JSON.parse(qyss_e_labelName);

        this.imageUrl = kjwl_e_portrait;
        this.companyInformation.companyName = kjwl_e_name;
        this.companyInformation.lrpeople = kjwl_e_lrpeople;
        this.companyInformation.setDate = kjwl_e_setdate;
        this.companyInformation.regcapital = kjwl_e_regcapital;
        this.companyInformation.concapital = kjwl_e_concapital;
        this.companyInformation.companyType = kjwl_e_type;
        this.companyInformation.ginsengnum = kjwl_e_ginsengnum;

        // this.companyInformation.staffnum = kjwl_e_staffnum;
        if (kjwl_e_staffnum <= 20) {
          this.companyInformation.staffnum = "0-20 人";
        } else if (kjwl_e_staffnum > 20 && kjwl_e_staffnum <= 100) {
          this.companyInformation.staffnum = "20-100 人";
        } else if (kjwl_e_staffnum > 100 && kjwl_e_staffnum <= 200) {
          this.companyInformation.staffnum = "100-200 人";
        } else if (kjwl_e_staffnum > 200 && kjwl_e_staffnum <= 500) {
          this.companyInformation.staffnum = "200-500 人";
        } else if (kjwl_e_staffnum > 500) {
          this.companyInformation.staffnum = kjwl_e_staffnum + "人以上";
        }else if (kjwl_e_staffnum === '-'){
          this.companyInformation.staffnum = kjwl_e_staffnum;
        }

        this.companyInformation.utscc = kjwl_e_utscc;
        this.companyInformation.taxpayernum = kjwl_e_taxpayernum;
        this.companyInformation.bregnum = kjwl_e_bregnum;
        this.companyInformation.taxpayerqua = kjwl_e_taxpayerqua;
        this.companyInformation.orgcode = kjwl_e_orgcode;
        this.companyInformation.iaeecode = kjwl_e_iaeecode;
        this.companyInformation.ename = kjwl_e_ename;
        this.companyInformation.fname = kjwl_e_fname;
        this.companyInformation.industry = kjwl_e_industry;
        this.companyInformation.businessterm = kjwl_e_businessterm;
        this.companyInformation.regauthority = kjwl_e_regauthority;
        this.companyInformation.approvaldate = kjwl_e_approvaldate;
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
        this.editor1.$textElem.attr("contenteditable", false);
        this.editor2.$textElem.attr("contenteditable", false);
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
    clickfn(val) {
      this.$router.push({
        path: val,
      });
    },
    // handleClose(done) {
    //   this.$confirm("确认关闭？").then((_) => {
    //     if (_) done();
    //   });
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
    //   var str = await this.$axios.post(
    //     "/api/admin/enterprise/imguplond",
    //     formData
    //   );
    //   console.log("str:", str.data);
    //   this.imageUrl = str.data;
    // },
    // digitalCalibration(val, digital) {
    //   console.log("digitalCalibration:", val, digital);
    //   var reg = /^[0-9]+$/;
    //   if (val !== "" && !reg.test(val)) {
    //     this.$message.error("该项只包含数字，请重新输入");
    //     if (digital === 1) this.companyInformation.regcapital = "";
    //     if (digital === 2) this.companyInformation.concapital = "";
    //     if (digital === 3) this.companyInformation.ginsengnum = "";
    //     if (digital === 4) this.companyInformation.staffnum = "";
    //   }
    // },
    // englishCheck(val) {
    //   console.log("englishCheck:", val);
    //   var reg = /^[a-zA-Z.]+$/;
    //   if (val !== "" && !reg.test(val)) {
    //     this.$message.error("该项只包含英文字母，请重新输入");
    //     this.companyInformation.ename = "";
    //   }
    // },
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
    // phoneCheck(val) {
    //   console.log("phoneCheck:", val);
    //   var reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
    //   if (val !== "" && !reg.test(val)) {
    //     this.$message.error("电话格式错误，请重新输入");
    //     this.companyInformation.phone = "";
    //   }
    // },
    // emailCheck(val) {
    //   console.log("emailCheck:", val);
    //   var reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
    //   if (val !== "" && !reg.test(val)) {
    //     this.$message.error("邮箱格式错误，请重新输入");
    //     this.companyInformation.email = "";
    //   }
    // },
    // siteCheck(val) {
    //   console.log("siteCheck:", val);
    //   const reg =
    //     /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w-]+)+[\w\-_~:/?#[\]@!&',;=.]+$/;
    //   if (val !== "" && !reg.test(val)) {
    //     this.$message.error("网址格式错误，请重新输入");
    //     this.companyInformation.website = "";
    //   }
    // },
    // addHandler() {
    //   this.dialogVisible = true;
    //   this.status = "请输入你所需要添加的标签:";
    // },
    // delHandler() {
    //   this.dialogVisible1 = true;
    //   this.status1 = "标签:";
    //   this.data = this.elabel;
    // },
    // async baseHandler() {
    //   console.log(this.ename);
    //   this.elabel.push({ ename: this.ename });
    //   console.log(this.elabel);
    //   this.ename = "";
    //   this.dialogVisible = false;
    // },
    handleDelete(index, row) {
      console.log(index, row);
      //校验row和index的类型,避免错误
      if (typeof row !== "object") {
        return;
      }
      if (typeof index !== "number") {
        return;
      }
      //对参数进行跟踪，判断参数的长度
      if (arguments.length > 1 && arguments.length < 4) {
        if (this.elabel.length > 0) {
          console.log(this.elabel);
          this.elabel.forEach((i, k) => {
            console.log(i, k);
            if (k === index) {
              let str = this.elabel[k];
              console.log(str);
              this.elabel.splice(index, 1);
              console.log("112:", this.elabel);
            }
          });
        }
      }
    },

    // async handlerSave() {
    //   let str1 = JSON.stringify(this.editor1.txt.html());
    //   let str2 = JSON.stringify(this.editor2.txt.html());

    //   if (this.companyInformation.companyName === "") {
    //     this.$message.error("公司名称不能为空，请重新输入");
    //     return;
    //   } else {
    //     if (str1 === '""') str1 = '"-"';
    //     if (str2 === '""') str2 = '"-"';

    //     if (this.elabel.length <= 0) this.elabel.push({ ename: "-" });

    //     for (let i in this.companyInformation) {
    //       // console.log(i); //对象中key的值
    //       // console.log(this.companyInformation[i]); //对象中key对应的value的值

    //       if (this.companyInformation[i] === "") {
    //         this.companyInformation[i] = "-";
    //       }
    //     }

    //     this.companyInformation.businessterm = this.companyInformation.businessterm.join('至');

    //     console.log(
    //       "data：",
    //       this.imageUrl,
    //       this.companyInformation,
    //       this.elabel,
    //       str1,
    //       str2
    //     );

    //     let res = await this.$axios.post("/api/admin/enterpriseadd", {
    //       companyInformation: this.companyInformation,
    //       imageUrl: this.imageUrl,
    //       elabel: this.elabel,
    //       str1: str1,
    //       str2: str2,
    //     });
    //     console.log("res:", res);
    //     if (res)
    //       this.$router.push('/enterprise');
    //   }
    // },
  },
};
</script>

<style scoped>
@import "../../css/enterprisedetails.css";
</style>