<template>
  <div id="news">
    <div class="topseach">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        :inline="true"
      >
        <el-form-item label="标题：" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入标题"></el-input>
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
            ref="region"
            :show-all-levels="false"
            :props="props"
            @change="handlechange"
          ></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="select()">搜索</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" @click="clickfn('/newsadd')"
            >新增记录</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <div class="contentseach">
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        stripe
        style="width: 100%"
      >
        <el-table-column prop="kjwl_n_name" label="标题" width="180">
        </el-table-column>
        <el-table-column prop="kjwl_n_source" label="来源" width="180">
        </el-table-column>
        <el-table-column
          prop="kjwl_n_rdatetime"
          label="发布时间"
          :formatter="rdatetimeFormatter"
        >
        </el-table-column>
        <el-table-column prop="kjwl_n_url" label="链接"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editorHandler(scope.row, scope.$index)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              @click="detailsHandler(scope.row, scope.$index)"
              >详情</el-button
            >
            <el-popconfirm
              style="margin-left: 10px"
              confirm-button-text="确定"
              @confirm="handleDelete(scope.$index, scope.row)"
              cancel-button-text="不用了"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除该条新闻吗？"
            >
              <el-button size="mini" type="danger" slot="reference"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          background
          :hide-on-single-page="true"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="tableData.length"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { dateTimeFn } from "@/utils/datetime";
import { cookiefn } from "@/utils/cookiefn";
export default {
  name: "news",
  data() {
    return {
      input: "",
      tableData: [],
      currentPage: 1,
      pageSize: 6,
      pageSizes: [4, 8, 12, 16],
      ruleForm: {
        name: "",
        source: "",
        datetime: "",
        nlabel: "",
        array: [],
      },
      props: {
        multiple: true,
        value: "qyss_l_id",
        label: "qyss_l_name",
        children: "children",
      },
      options: [],
      array: [],
      // nlabel:[],
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    async refresh() {
      let res = await this.$axios.get("/api/admin/newssel");
      // console.log("res：", res.data);
      if (res.data) {
        // res.data.forEach((item) => {
        //   if (item.kjwl_n_rdatetime !== "-") {
        //     item.kjwl_n_rdatetime = dateTimeFn.showTime(item.kjwl_n_rdatetime);
        //   } else {
        //     item.kjwl_n_rdatetime = "-";
        //   }
        //   // item.kjwl_n_rdatetime = dateTimeFn.showTime(item.kjwl_n_rdatetime);
        // });
        this.tableData = res.data;
      }
      this.selectCascader();
    },
    async selectCascader() {
      let res = await this.$axios.get("/api/admin/news/selectCascader");
      console.log(res.data);
      if (res.data) this.options = res.data;
    },
    clickfn(val) {
      this.$router.push({
        path: val,
      });
    },
    async select() {
      let params = { ...this.ruleForm };
      console.log("params:", params);
      // if (this.input === "") {
      //   var res = await this.$axios.get("/api/admin/newssel");
      // } else {
      let res = await this.$axios.post(`/api/admin/news/select`, params);
      // }
      if (res.data) {
        // res.data.forEach((item) => {
        //   item.kjwl_n_rdatetime = dateTimeFn.showTime(item.kjwl_n_rdatetime);
        // });
        this.tableData = res.data;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.nlabel = "";
      this.ruleForm.array = "";
      this.select();
    },
    handlechange(val) {
      this.array = [];
      console.log("val:", val);
      // this.nlabel = val;
      let CheckedNodes = this.$refs.region.getCheckedNodes();
      console.log("data1:", CheckedNodes);

      //当子类全部被选择时，过滤出他们的父类；若子类没有被全部选中，则只过滤被选中的子类
      // CheckedNodes = CheckedNodes.filter(option => !(option.parent && option.parent.checked));
      // console.log('data2:', CheckedNodes);
      setTimeout(() => {
        CheckedNodes.forEach((i, k) => {
          if (!i.hasChildren) {
            if (i.checked) {
              console.log("123:", !i.hasChildren, i);
              // let item = { value: i.value, label: i.label }
              this.array.push(i.label);
              // this.array = this.array + JSON.stringify(item);
            }
          }
          if ((i, k)) return;
        });
        this.ruleForm.array = this.array.join("%");
        console.log("array:", this.array);
        // console.log("nlabel:", this.nlabel);
      });
    },
    //时间格式化
    rdatetimeFormatter(row) {
      // if ((row, column, cellValue, index)) return;
      if (row.kjwl_n_rdatetime === "-" || row.kjwl_n_rdatetime === null)
        return "-";
      else return dateTimeFn.showTime(row.kjwl_n_rdatetime);
    },
    editorHandler(row, index) {
      console.log("data:", row, index);
      cookiefn.setCookie("newsId", row.kjwl_n_id, 1);
      this.$router.push({ path: "/newseditor" });
      if ((row, index)) {
        return;
      }
    },
    detailsHandler(row, index) {
      console.log("data:", row, index);
      cookiefn.setCookie("newsId", row.kjwl_n_id, 1);
      this.$router.push({ path: "/newsdetails" });
      if ((row, index)) {
        return;
      }
    },
    async handleDelete(index, row) {
      console.log(index, row);
      var res = await this.$axios.get(`/api/admin/newsdel/${row.kjwl_n_id}`);
      console.log("data:", res);
      this.refresh();
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
  },
};
</script>

<style scoped>
@import "../../css/newsindex.css";
</style>