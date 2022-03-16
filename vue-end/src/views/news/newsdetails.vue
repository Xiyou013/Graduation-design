<template>
  <div id="newsdetails">
    <div class="nadd_topnav">
      <el-button
        type="primary"
        style="width: 80px; margin-top: 15px; margin-left: 90%"
        @click="clickfn('/news')"
        >返回</el-button
      >
    </div>
    <div class="nadd_con">
      <div class="nadd_cn_top">
        <span class="newTitle">新闻标题：</span>
        <span class="nadd_con_right_text">
          {{ this.newInformation.newTitle }}
        </span>
      </div>
      <div class="nadd_cn_positive">
        <span class="newTitle">新闻状态：</span>
        <span class="nadd_con_right_text">
          {{ this.newInformation.positive === 0 ? "中立" : this.newInformation.positive === 1 ? "积极" : '消极'}}
        </span>
      </div>
      <div class="nadd_cn_label">
        <div class="newTitle">新闻标签：</div>
        <div class="nadd_cnl_con" v-for="(item, index) in nlabel" :key="index">
          <span class="newLable">{{ item.label }}</span>
        </div>
        <!-- <div class="nadd_cnl_operation">
          <el-button type="text" @click="addHandler()" disabled
            ><i class="el-icon-circle-plus-outline"></i
          ></el-button>
          <el-button type="text" @click="delHandler()" disabled
            ><i class="el-icon-delete"></i
          ></el-button>
        </div> -->
      </div>
      <div class="nadd_cn_from">
        <div class="nadd_cnf_url">
          <div class="nadd_cnfu_left">来&emsp;&emsp;源：</div>
          <span class="nadd_con_right_text">
            {{ this.newInformation.newUrl }}
          </span>
        </div>
        <div class="nadd_cnf_url time1">
          <div class="nadd_cnfu_left">时&emsp;&emsp;间：</div>
          <span class="nadd_con_right_text">
            {{ this.newInformation.newDate }}
          </span>
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
        <span class="nadd_con_right_text">
          {{ this.newInformation.newLink }}
        </span>
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
            disabled
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-delete"
            style="width: 70px; margin-top: 5px; margin-left: 40px"
            @click="delHandler(3)"
            disabled
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
            disabled
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-delete"
            style="width: 70px; margin-top: 5px; margin-left: 40px"
            @click="delHandler(2)"
            disabled
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
        style="width: 200px; margin-top: 15px; margin-left: 40%"
        @click="clickfn('/news')"
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
        id="ncontent"
        v-model="ncontent"
        aria-placeholder="请输入标签内容"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="baseHandler()">确 定</el-button>
      </span>
    </el-dialog> -->

    <!-- <el-dialog :title="status1" :visible.sync="dialogVisible1">
      <el-table :data="nlabel">
        <el-table-column
          property="ncontent"
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
              title="确定删除该条标签信息吗？"
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
import { dateTimeFn } from "@/utils/datetime";
import { cookiefn } from "@/utils/cookiefn";
import E from "wangeditor";
export default {
  name: "newsdetails",
  data() {
    return {
      status: "",
      status1: "",
      dialogVisible: false,
      dialogVisible1: false,
      ncontent: "",
      data: "",
      nlabel: [],

      editor: "",
      personInfromation: [],
      enterpriseInfromation: [],

      newInformation: {
        newTitle: "",
        positive: "",
        newUrl: "",
        newDate: "",
        newLink: "",
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
      let newsId = obj.newsId;
      console.log(newsId);

      let res = await this.$axios.get(`/api/admin/newsdetails/${newsId}`);
      console.log(res.data);
      if (res.data) {
        const {
          kjwl_n_content, //新闻内容
          kjwl_n_rdatetime, //新闻发布时间
          kjwl_n_name, //新闻名称
          kjwl_n_source, //新闻来源
          kjwl_n_url, //新闻链接
          qyss_n_positive, //新闻状态（消极/积极）
          qyss_n_labelName, //新闻标签
          npdata, //新闻所关联人物
          nedata, //新闻所关联公司
        } = res.data;
        this.getdate(npdata, nedata);
        this.nlabel = JSON.parse(qyss_n_labelName);
        // ldata.forEach((item) => {
        //   console.log(item);
        //   this.nlabel.push({ ncontent: item.kjwl_nl_name });
        // });
        console.log(this.nlabel);

        if (kjwl_n_rdatetime !== "-") {
          this.newInformation.newDate = dateTimeFn.showTime(kjwl_n_rdatetime);
        } else {
          this.newInformation.newDate = "-";
        }

        // this.newInformation.newDate = dateTimeFn.showTime(kjwl_n_rdatetime);
        this.newInformation.newTitle = kjwl_n_name;
        this.newInformation.newUrl = kjwl_n_source;
        this.newInformation.newLink = kjwl_n_url;
        this.newInformation.positive = qyss_n_positive;

        this.editor = new E("#div1");
        this.editor.config.height = 420;
        this.editor.config.zIndex = 1;
        this.editor.create();
        // let data = JSON.parse(kjwl_n_content);
        this.editor.txt.html(JSON.parse(kjwl_n_content));
        this.editor.$textElem.attr("contenteditable", false);
      }
    },
    getdate(npdata, nedata) {
      console.log("data:", npdata, nedata);
      npdata.forEach(async (item) => {
        console.log("item:", item);
        let res = await this.$axios.get(
          `/api/admin/boss/selectId/${item.kjwl_p_id}`
        );
        console.log("res:", res.data);
        this.personInfromation.push(res.data[0]);
      });
      nedata.forEach(async (item) => {
        console.log("item:", item);
        let res = await this.$axios.get(
          `/api/admin/enterprise/selectId/${item.kjwl_e_id}`
        );
        console.log("res:", res.data);
        this.enterpriseInfromation.push(res.data[0]);
      });
      console.log("enterpriseInfromation:", this.enterpriseInfromation);
    },
    handleClose(done) {
      this.$confirm("确认关闭？").then((_) => {
        if (_) done();
      });
    },
    // addHandler() {
    //   this.dialogVisible = true;
    //   this.status = "请输入你所需要添加的标签:";
    // },
    // delHandler() {
    //   this.dialogVisible1 = true;
    //   this.status1 = "标签:";
    //   // this.data = this.nlabel;
    // },
    // async baseHandler() {
    //   if (this.status === "请输入你所需要添加的标签:") {
    //     this.nlabel.push({ ncontent: this.ncontent });
    //   }
    //   console.log(this.nlabel);
    //   this.ncontent = "";
    //   this.dialogVisible = false;
    // },
    // handleDelete(index, row) {
    //   console.log(index, row);
    //   //校验row和index的类型,避免错误
    //   if (typeof row !== "object") {
    //     return;
    //   }
    //   if (typeof index !== "number") {
    //     return;
    //   }
    //   //对参数进行跟踪，判断参数的长度
    //   if (arguments.length > 1 && arguments.length < 3) {
    //     if (this.nlabel.length > 0) {
    //       console.log(this.nlabel);
    //       //遍历数组
    //       this.nlabel.forEach((i, k) => {
    //         console.log(i, k);
    //         if (k === index) {
    //           //当要删除的下标和遍历的下标值一致，说明找到了要删除的行数据
    //           //执行splice()从该下标开始，删除1条数据

    //           //获取到要删除的数据信息
    //           let str = this.nlabel[k];
    //           console.log(str);
    //           this.nlabel.splice(index, 1);

    //           console.log("111", this.nlabel);
    //         }
    //       });
    //     }
    //   }
    // },
  },
};
</script>

<style scoped>
@import "../../css/newsdetails.css";
</style>