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
        <!-- <el-form-item label="电话：" prop="phone">
          <el-input
            v-model="ruleForm.phone"
            placeholder="请输入电话"
          ></el-input>
        </el-form-item> -->
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
        <el-table-column prop="person" label="账号" width="180">
          <template slot-scope="scope">
            <!-- {{ scope.row.dataSourceName }} -->
            {{ scope.row.person ? scope.row.person.kjwl_yu_account : "-" }}
          </template>
        </el-table-column>
        <el-table-column prop="person" label="昵称" width="180">
          <template slot-scope="scope">
            <!-- {{ scope.row.dataSourceName }} -->
            {{ scope.row.person ? scope.row.person.kjwl_yu_name : "-" }}
          </template>
        </el-table-column>
        <el-table-column prop="companyData" label="反馈公司" width="180">
          <template slot-scope="scope">
            <!-- {{ scope.row.dataSourceName }} -->
            {{
              scope.row.companyData ? scope.row.companyData.kjwl_e_name : "-"
            }}
          </template>
        </el-table-column>
        <el-table-column prop="bossData" label="反馈人物" width="180">
          <template slot-scope="scope">
            <!-- {{ scope.row.dataSourceName }} -->
            {{ scope.row.bossData ? scope.row.bossData.kjwl_p_name : "-" }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="detailsHandler($event, scope.row, scope.$index)"
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

    <feedback-drawer
      :visible.sync="showDrawer"
      :detail="curDimesion"
    ></feedback-drawer>
  </div>
</template>

<script>
import feedbackDrawer from "./components/feedback-drawer.vue";

export default {
  name: "user",
  components: {
    feedbackDrawer,
  },
  data() {
    return {
      input: "",
      tableData: [],
      currentPage: 1,
      pageSize: 6,
      pageSizes: [1, 4, 8, 12, 16],
      ruleForm: {
        name: "",
        // phone: "",
      },
      params: {
        id: "",
      },
      showDrawer: false,
      curDimesion: {},
    };
  },

  mounted() {
    this.refresh();
  },
  methods: {
    async refresh() {
      let params = {
        // ...this.params,
        ...this.ruleForm,
      };
      console.log("params:", params);
      var res = await this.$axios.post("/api/admin/user/feedback/sel", params);
      if (res) {
        console.log(res.data);
        this.tableData = res.data;
        console.log(`当前列表共有${this.tableData.length}条数据`);
      }
    },
    async select() {
      this.refresh();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.select();
    },
    detailsHandler(event, row, index) {
      console.log("row:", row, index);
      let target = event.target;
      if (target.nodeName == "I" || target.nodeName == "SPAN") {
        target = event.target.parentNode;
      }
      target.blur();
      this.curDimesion = row;
      this.showDrawer = true;
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
  },
};
</script>

<style scoped>
@import "../../css/userindex.css";
</style>