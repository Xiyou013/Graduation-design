<template>
  <div id="adminindex">
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
        <el-form-item label="身份：" prop="identity">
          <el-select v-model="ruleForm.identity" placeholder="请选择">
            <el-option
              v-for="item in identityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="select()">搜索</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" @click="clickfn('/adminadd')"
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
        <el-table-column prop="kjwl_u_account" label="账号" width="180">
        </el-table-column>
        <el-table-column prop="kjwl_u_name" label="昵称" width="180">
        </el-table-column>
        <el-table-column
          prop="kjwl_u_identity"
          label="身份"
          :formatter="identityFormatter"
        >
        </el-table-column>
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
              title="确定删除该管理员的信息吗？"
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
import { cookiefn } from "@/utils/cookiefn";
const identityTypeEnum = {
  // 管理员
  admin: 1,
  // 超级管理员
  administrator: 2,
};
export default {
  name: "adminindex",
  data() {
    return {
      input: "",
      adnminId: "",
      id: "",
      tableData: [],
      visible: false,
      currentPage: 1,
      pageSize: 6,
      pageSizes: [4, 8, 12, 16],
      ruleForm: {
        name: "",
        identity: "",
      },
      // 管理员身份范围选项
      identityOptions: [
        { value: identityTypeEnum.admin, label: '管理员' },
        { value: identityTypeEnum.administrator, label: '超级管理员' },
      ],
    };
  },

  async mounted() {
    this.refresh();
  },

  methods: {
    //获取管理员信息总览
    async refresh() {
      var res = await this.$axios.get("/api/admin/sel");
      if (res) {
        this.tableData = res.data;
      }
    },
    //搜索管理员信息
    async select() {
      let params = { ...this.ruleForm };
      console.log("params:", params);
      // if (this.input === "") {
      //   var res = await this.$axios.get("/api/admin/sel");
      //   console.log(333);
      // } else {
      let res = await this.$axios.post(`/api/admin/select`, params);
      // }

      if (res) {
        this.tableData = res.data;
      }
    },
    //搜索信息重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.select();
    },
    //跳转
    clickfn(val) {
      console.log(val);
      this.$router.push({
        path: val,
      });
    },
    // del() {
    //   this.visible = true;
    // },
    //管理员身份格式化
    identityFormatter(row, column, cellValue, index) {
      if (row.kjwl_u_identity === 1) return "管理员";
      if (row.kjwl_u_identity === 2) return "超级管理员";
      if ((row, column, cellValue, index)) return;
    },
    //删除管理员身份
    async handleDelete(index, row) {
      console.log(index, row);
      this.id = row.kjwl_u_id;
      console.log(this.id);
      var res = await this.$axios.get(`/api/admin/admindelete/${this.id}`);
      if (res) {
        console.log(res);
      }
      this.refresh();
    },
    //查看管理员详情
    detailsHandler(row, index) {
      this.adnminId = row.kjwl_u_id;
      console.log(this.adnminId);
      // localStorage.setItem('accountdetails',this.account);
      // this.$store.commit('ACCOUNT',this.account);

      cookiefn.setCookie("adnminId", this.adnminId, 1);

      this.$router.push({ name: "admindetails" });
      if ((row, index)) {
        return;
      }
    },
    //管理员信息编辑
    editorHandler(row, index) {
      this.adnminId = row.kjwl_u_id;
      console.log(this.adnminId);
      // localStorage.setItem('accountdetails',this.account);
      // this.$store.commit('ACCOUNT',this.account);

      cookiefn.setCookie("adnminId", this.adnminId, 1);

      this.$router.push({ name: "admineditor" });
      if ((row, index)) {
        return;
      }
    },
    //翻页
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


<style  scoped>
@import "../../css/adminindex.css";
</style>