<template>
  <div id="boss">
    <div class="topseach">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        :inline="true"
      >
        <el-form-item label="人物姓名：" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入人物姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="职务：" prop="position">
          <el-input
            v-model="ruleForm.position"
            placeholder="请输入职务"
          ></el-input>
        </el-form-item>
        <el-form-item label="任职企业：" prop="enterprise">
          <el-input
            v-model="ruleForm.enterprise"
            placeholder="请输入任职企业"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型标签：" prop="plable">
          <!-- <el-input v-model="ruleForm.plable" placeholder="请选择标签"></el-input> -->
          <el-cascader
            v-model="ruleForm.plabel"
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
          <el-button type="primary" @click="clickfn('/bossadd')"
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
        <el-table-column prop="kjwl_p_name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="kjwl_p_position" label="职务" width="180">
        </el-table-column>
        <el-table-column prop="kjwl_p_enterprise" label="任职企业">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              @click="handledetails(scope.$index, scope.row)"
              >详情</el-button
            >
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
  name: "boss",
  data() {
    return {
      input: "",
      tableData: [],
      currentPage: 1,
      pageSize: 6,
      pageSizes: [4, 8, 12, 16],
      ruleForm: {
        name: "",
        position: "",
        enterprise: "",
        plable: "",
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
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    async refresh() {
      let res = await this.$axios.get("/api/admin/bosssel");
      // console.log("res:", res.data);
      if (res.data) this.tableData = res.data;
      this.selectCascader();
    },
    async selectCascader() {
      let res = await this.$axios.get("/api/admin/news/selectCascader");
      console.log(res.data);
      if (res.data) this.options = res.data;
    },
    async select() {
      let params = { ...this.ruleForm };
      console.log("params:", params);
      // if (this.input === "") {
      //   var res = await this.$axios.get("/api/admin/bosssel");
      // } else {
      let res = await this.$axios.post(`/api/admin/boss/select/`, params);
      // }
      if (res.data) {
        this.tableData = res.data;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.plabel = [];
      this.ruleForm.array = [];
      this.select();
    },
    clickfn(val) {
      console.log(val);
      this.$router.push({
        path: val,
      });
    },
    handlechange(val) {
      this.array = [];
      console.log("val:", val);
      // this.plabel = val;
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
        // console.log("plabel:", this.plabel);
      });
    },

    // clickfn('/bosseditor')
    // clickfn('/bossdetails')
    handleEdit(index, row) {
      console.log(index, row);
      cookiefn.setCookie("bossId", row.kjwl_p_id, 1);
      this.$router.push({ path: "/bosseditor" });
      if ((row, index)) {
        return;
      }
    },
    handledetails(index, row) {
      console.log(index, row);
      cookiefn.setCookie("bossId", row.kjwl_p_id, 1);
      this.$router.push({ path: "/bossdetails" });
      if ((row, index)) {
        return;
      }
    },
    async handleDelete(index, row) {
      console.log(index, row);
      let res = await this.$axios.get(`/api/admin/bossdel/${row.kjwl_p_id}`);
      console.log("res:", res);
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
@import "../../css/bossindex.css";
</style>