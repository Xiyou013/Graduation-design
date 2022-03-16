<template>
  <div id="user">
    <div class="topseach">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        :inline="true"
      >
        <el-form-item label="账号/昵称：" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入账号/昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话：" prop="phone">
          <el-input
            v-model="ruleForm.phone"
            placeholder="请输入电话"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="select()">搜索</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
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
        <el-table-column
          prop="kjwl_yu_account"
          label="账号"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="kjwl_yu_name"
          label="昵称"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="kjwl_yu_phone"
          label="电话"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="kjwl_yu_email"
          label="邮箱"
          width="180"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="detailsHandler(scope.row, scope.$index)"
              >详情</el-button
            >
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
import { cookiefn } from "@/utils/cookiefn";
export default {
  name: "user",
  data() {
    return {
      input: "",
      tableData: [],
      currentPage: 1,
      pageSize: 6,
      pageSizes: [4, 8, 12, 16],
      ruleForm: {
        name: "",
        phone: "",
      },
    };
  },

  mounted() {
    this.refresh();
  },
  methods: {
    async refresh() {
      var res = await this.$axios.get("/api/admin/user/sel");
      if (res) {
        console.log(res.data);
        this.tableData = res.data;
        console.log(`当前列表共有${this.tableData.length}条数据`);
      }
    },

    async select() {
      let params = { ...this.ruleForm };
      console.log("params:", params);
      // if (this.input === "") {
      //   var res = await this.$axios.get("/api/admin/user/sel");
      //   console.log(111);
      // } else {
      let res = await this.$axios.post(`/api/admin/usersel`, params);
      // console.log(456);
      // }
      if (res) {
        console.log(res.data);
        this.tableData = res.data;
        console.log(`当前列表共有${this.tableData.length}条数据`);
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.select();
    },
    detailsHandler(row, index) {
      console.log("123:", row, index);
      cookiefn.setCookie("userId", row.kjwl_yu_id, 1);
      this.$router.push({ path: "/usercontent" });
      if ((row, index)) {
        return;
      }
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
    // handleEdit(index, row) {
    //     console.log(index, row);
    // },
    // handledetails(index, row) {
    //     console.log(index, row);
    // },
    // handleDelete(index, row) {
    //     console.log(index, row);
    // }
  },
};
</script>

<style scoped>
@import "../../css/userindex.css";
</style>