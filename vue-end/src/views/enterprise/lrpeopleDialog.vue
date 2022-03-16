<template>
  <el-dialog
    title="请选择该公司的法定代表人："
    :visible.sync="showDialog"
    :before-close="handleClose"
    :width="'60%'"
  >
    <div>
      <div>
        <el-form
          :model="ruleForm1"
          ref="ruleForm1"
          label-width="100px"
          :inline="true"
        >
          <el-form-item label="人物姓名：" prop="name">
            <el-input
              v-model="ruleForm1.name"
              size="mini"
              placeholder="请输入人物姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="职务：" prop="position">
            <el-input
              v-model="ruleForm1.position"
              size="mini"
              placeholder="请输入职务"
            ></el-input>
          </el-form-item>
          <el-form-item label="任职企业：" prop="enterprise">
            <el-input
              v-model="ruleForm1.enterprise"
              size="mini"
              placeholder="请输入任职企业"
            ></el-input>
          </el-form-item>
          <el-form-item label="类型标签：" prop="plabel">
            <el-cascader
              v-model="ruleForm1.plabel"
              size="mini"
              :options="options"
              ref="plabelRegion"
              :show-all-levels="false"
              :props="props"
              @change="plabelChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="select()" size="mini"
              >搜索</el-button
            >
            <el-button @click="resetForm('ruleForm1', 1)" size="mini"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="lrpeople_block" v-if="personInfromation.length > 0">
        <span>所选法定代表人：</span>
        <i class="el-icon-s-custom" style="color: #409eff"></i>
        <span style="display: inline-block; margin-left: 5px">{{
          personInfromation[0].kjwl_p_name
        }}</span>
        <i
          class="el-icon-close"
          style="color: #409eff"
          @click="delLrpeople"
        ></i>
      </div>
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        max-height="450"
      >
        <el-table-column label="图片" width="120px">
          <template slot-scope="scope">
            <img
              :src="scope.row.kjwl_p_portrait"
              style="width: 90px; height: 80px; object-fit: contain"
            />
          </template>
        </el-table-column>
        <el-table-column property="kjwl_p_name" label="姓名"></el-table-column>
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
      <div class="">
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
          size="mini"
          @click="handleClose"
          >取消</el-button
        >
        <el-button
          type="primary"
          style="width: 100px"
          size="mini"
          @click="handlerSave"
          >保存</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    detail: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tableData: [],
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
      currentPage: 1,
      pageSize: 2,
      pageSizes: [1, 2, 5, 10, 20],
      //   personInfromation: [],
    };
  },
  computed: {
    showDialog: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
    personInfromation: {
      get() {
        return this.detail || [];
      },
      set(val) {
        this.$emit("update:detail", val);
      },
    },
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.refresh();
          this.selectCascader();
        } else {
          return false;
        }
      },
    },
  },
  methods: {
    async refresh() {
      console.log(
        "refresh:",
        this.showDrawer,
        this.detail,
        this.personInfromation
      );
      var res = await this.$axios.get("/api/admin/bosssel");
      console.log("111", res);
      if (res.data) this.tableData = res.data;
    },
    async selectCascader() {
      let res = await this.$axios.get("/api/admin/news/selectCascader");
      console.log(res.data);
      if (res.data) this.options = res.data;
    },
    handleClose() {
      this.showDialog = false;
      //   done();
    },
    plabelChange(val) {
      console.log("val:", val);
      this.handlechange(val, "plabelRegion", 2);
    },
    async select() {
      let params = { ...this.ruleForm1 };
      console.log("params:", params);
      let res = await this.$axios.post(`/api/admin/boss/select/`, params);
      if (res.data) {
        this.tableData = res.data;
        this.currentPage = 1;
      }
    },
    resetForm(formName, num) {
      this.$refs[formName].resetFields();
      this.ruleForm1.plabel = [];
      this.ruleForm1.array = [];
      if (num === 1) {
        this.select();
      }
      if (num === 2) {
        this.selectdata();
      }
    },
    personAdd(index, row) {
      if (this.personInfromation.length === 1) {
        this.$message({
          message: "警告: 法定代表人已达上限（1人），请删除后再重新选择",
          type: "warning",
        });
        return;
      }
      this.personInfromation.push(row);
      //   this.personInfromation = this.unique(this.personInfromation);
      console.log("personInfromation:", this.personInfromation);
      if ((index, row)) return;
    },
    delLrpeople() {
      this.personInfromation = [];
      console.log("this.personInfromation:", this.personInfromation);
    },
    handlerSave() {
      console.log("this.personInfromation:", this.personInfromation);
      this.$emit("add", this.personInfromation);
      this.showDialog = false;
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
    handlechange(val, cascaderName, num) {
      let array = [];
      let CheckedNodes;
      console.log("val:", val, num);
      let label = val;
      CheckedNodes = this.$refs[cascaderName].getCheckedNodes();
      console.log("data1:", CheckedNodes);

      //当子类全部被选择时，过滤出他们的父类；若子类没有被全部选中，则只过滤被选中的子类
      // CheckedNodes = CheckedNodes.filter(option => (option.parent && option.parent.checked));
      // console.log('data2:', CheckedNodes);
      setTimeout(() => {
        CheckedNodes.forEach((i, k) => {
          if (!i.hasChildren) {
            if (i.checked) {
              console.log("123:", !i.hasChildren, i.checked, i);
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
            if ((i, k)) return;
          }
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
  },
};
</script>

<style scoped>
@import "../../css/enterpriseadd.css";
::v-deep.el-cascader-panel .el-cascader-menu .el-cascader-menu__wrap {
  height: 100%;
}
::v-deep.el-cascader-panel .el-scrollbar .el-scrollbar__wrap {
  /* overflow: scroll; */
  /* height: 100%; */
  padding: 0px 10px 15px 0px;
}
.lrpeople_block {
  color: #409eff;
}
</style>