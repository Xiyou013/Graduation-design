<template>
  <div class="labelindex">
    <div class="label-operation">
      <div class="label-top-operation" v-loading="loading">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="添加标签" name="first">
            <div class="add-label-title" v-if="selectList.length === 0">
              <el-button type="text" @click="selectListFn">添加标签</el-button>
              <span class="marked-words"
                >&emsp;(
                请在下方的标签面板中选择要操作的标签,或是点击左侧按钮进行指定操作
                )</span
              >
            </div>
            <div class="add-label-title" v-if="selectList.length !== 0">
              <el-select
                v-for="(arrItem, key) in selectList"
                :key="key"
                v-model="selectArr[key]"
                filterable
                allow-create
                placeholder="请输入关键词"
                :loading="loading"
                value-key="qyss_l_id"
                @change="selected"
                @focus="position = key"
              >
                <el-option
                  v-for="item in arrItem"
                  :key="item.qyss_l_id"
                  :label="item.qyss_l_name"
                  :value="item"
                >
                </el-option>
              </el-select>
              <el-button
                icon="el-icon-circle-check"
                circle
                @click="(dialogVisible = true), (dialogNum = 1)"
              ></el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="修改标签" name="second">
            <div class="add-label-title" v-if="selectList.length === 0">
              <span class="tab-pane__text">修改标签</span>
              <span class="marked-words"
                >&emsp;( 请在下方的标签面板中选择要操作的标签 )</span
              >
            </div>
            <div class="add-label-title" v-if="selectList.length !== 0">
              <el-input
                class="label__input"
                v-for="(arrItem, key) in selectArr"
                :key="key"
                v-model="arrItem.qyss_l_name"
                maxlength="10"
                placeholder="请输入内容"
              ></el-input>
              <el-button
                icon="el-icon-circle-check"
                circle
                @click="(dialogVisible = true), (dialogNum = 2)"
              ></el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="删除标签" name="third">
            <div class="add-label-title" v-if="selectList.length === 0">
              <span class="tab-pane__text">删除标签</span>
              <span class="marked-words"
                >&emsp;( 请在下方的标签面板中选择要操作的标签 )</span
              >
            </div>
            <div class="add-label-title" v-if="selectList.length !== 0">
              <el-input
                class="label__input"
                v-for="(arrItem, key) in selectArr"
                :key="key"
                v-model="arrItem.qyss_l_name"
                maxlength="10"
                disabled
                placeholder="请输入内容"
              ></el-input>
              <el-button
                icon="el-icon-circle-check"
                circle
                @click="(dialogVisible = true), (dialogNum = 3)"
              ></el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="label-Cascader">
      <el-cascader-panel
        :value="label"
        :options="options"
        ref="label"
        :show-all-levels="false"
        :props="props"
        @change="labelChange"
      ></el-cascader-panel>
    </div>
    <el-dialog
      :title="
        dialogNum === 1
          ? '确定新增'
          : dialogNum === 2
          ? '确定修改'
          : dialogNum === 3
          ? '确定删除'
          : '操作'
      "
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span
        >是否{{
          dialogNum === 1
            ? "新增"
            : dialogNum === 2
            ? "修改"
            : dialogNum === 3
            ? "删除"
            : "操作"
        }}该标签？</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveLabelFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: null,
      label: [],
      activeName: "first",
      loading: false,
      props: {
        multiple: false,
        checkStrictly: true,
        value: "qyss_l_id",
        label: "qyss_l_name",
        children: "children",
      },

      position: null,
      selectArr: [],
      selectList: [],
      listdata: [],

      dialogNum: null,
      dialogVisible: false,
    };
  },
  mounted() {
    // this.refresh();
    this.selectCascader();
    // this.selectListFn();
  },
  methods: {
    async selectCascader() {
      let res = await this.$axios.get("/api/admin/news/selectCascader");
      if (res.data) this.options = res.data;
    },
    async selectListFn() {
      let res = await this.$axios.get("/api/admin/laeblOneHierarchy");
      this.selectList.splice(0, this.selectList.length, res.data);
    },
    handleClick(tab, event) {
      this.label = [];
      this.selectList = [];
      this.selectArr = [];
      this.listdata = [];
      console.log(
        "allarray:",
        "this.label:" + this.label,
        "this.selectList:" + this.selectList,
        "this.selectArr:" + this.selectArr,
        "this.listdata:" + this.listdata
      );
      if ((tab, event)) return;
    },
    handleClose(done) {
      done();
    },
    async addSelectList(id, hierarchy) {
      let params = { id: id, hierarchy: hierarchy };
      let res = await this.$axios.post(
        `/api/admin/laeblOtherHierarchy`,
        params
      );
      if (res.data) {
        this.listdata = res.data;
      }
    },
    async selected(item) {
      let params;
      if (item.qyss_l_id) {
        await this.addSelectList(item.qyss_l_id, item.qyss_l_hierarchy);
        this.label.splice(this.position, this.label.length, item.qyss_l_id);
      }
      var nextSelect = this.listdata;
      if (this.selectList.length != 5) {
        this.selectList.splice(
          this.position + 1,
          this.selectList.length,
          nextSelect
        );
      }
      if (Object.prototype.toString.call(item) === "[object Object]") {
        params = { ...item };
      }
      if (Object.prototype.toString.call(item) === "[object String]") {
        params = {
          qyss_l_children: 0,
          qyss_l_hierarchy: this.position + 1,
          qyss_l_name: item,
          qyss_l_parent: this.selectArr[this.position - 1]
            ? this.selectArr[this.position - 1].qyss_l_id
            : null,
          qyss_l_status: 1,
        };
      }
      this.selectArr.splice(this.position, this.selectArr.length, params);
    },
    labelChange(val) {
      this.handlechange(val, "label");
    },
    async handlechange(val, cascaderName) {
      try {
        this.loading = true;
        let array = [];
        let nextSelect;
        let CheckedNodes;
        CheckedNodes = this.$refs[cascaderName].getCheckedNodes();

        //当子类全部被选择时，过滤出他们的父类；若子类没有被全部选中，则只过滤被选中的子类
        // CheckedNodes = CheckedNodes.filter(option => (option.parent && option.parent.checked));
        // console.log('data2:', CheckedNodes);
        // setTimeout(async () => {
        CheckedNodes.forEach((i, k) => {
          array.push(i);
          if ((i, k)) return;
        });
        await this.selectListFn();
        for (let i = 0; i < array[0].pathNodes.length; i++) {
          const item = array[0].pathNodes[i];
          await this.addSelectList(
            item.data.qyss_l_id,
            item.data.qyss_l_hierarchy
          );
          nextSelect = this.listdata;
          if (this.selectList.length !== 5) {
            this.selectList.splice(i + 1, this.selectList.length, nextSelect);
          }
          this.selectArr.splice(i, this.selectArr.length, item.data);
        }
        console.log("this.selectList:", this.selectList);
        console.log("this.selectArr:", this.selectArr);
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }
    },
    async saveLabelFn() {
      let res;
      console.log("selectArr:", this.selectArr);
      console.log("saveLabelFn");
      console.log("dialogNum:", this.dialogNum);
      if (this.dialogNum === 1) {
        res = await this.$axios.post(`/api/admin/saveLaebl`, this.selectArr);
      }
      if (this.dialogNum === 2) {
        res = await this.$axios.post(`/api/admin/editorLaebl`, this.selectArr);
      }
      if (this.dialogNum === 3) {
        res = await this.$axios.post(`/api/admin/deleteLaebl`, this.selectArr);
      }

      if (res.data) {
        console.log("res:", res.data);
        if (res.data === "exist") {
          this.$message.error("该标签数据库中已存在,请重新输入");
          this.dialogVisible = false;
          return;
        }
        if (res.data === false) {
          this.$message.error("该标签删除失败,请重新输入");
          this.dialogVisible = false;
          return;
        }
        if (res.data === true) {
          this.$message({
            message: `该标签${
              this.dialogNum === 1
                ? "新增"
                : this.dialogNum === 2
                ? "修改"
                : this.dialogNum === 3
                ? "删除"
                : "操作"
            }成功！`,
            type: "success",
          });
          // this.dialogVisible = false;
          // return;
        }
        this.selectCascader();
        this.dialogVisible = false;
        this.label = [];
        this.selectList = [];
        this.selectArr = [];
        this.listdata = [];
      }
    },
  },
};
</script>


<style scoped>
.labelindex {
  width: 100%;
  height: 100%;
  /* background-color: burlywood; */
  overflow: hidden;
}
.label-operation {
  width: 1000px;
  min-height: 100px;
  /* background-color: coral; */
  border: 1px solid #e4e7ed;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 25px;
}
.label-top-operation {
  width: 100%;
  height: auto;
  /* background-color: cornflowerblue; */
}
.add-label-title {
  width: 100%;
  display: inline-block;
  /* background-color: darksalmon; */
}
.el-select {
  display: inline-block;
  position: relative;
  margin: 5px;
}
.marked-words {
  font-size: 14px;
  color: #333;
}
.add-label-addselect {
  /* display: flex;
  flex-wrap: wrap; */
  display: inline-block;
  margin: 5px;
  /* background-color: darkseagreen; */
}
.addselect-title {
  display: block;
  text-align: center;
  font-size: 14px;
  color: #333;
  letter-spacing: 10px;
  margin-bottom: 5px;
}
.label-Cascader {
  width: 1000px;
  max-height: 500px;
  /* background-color: cadetblue; */
  position: relative;
  left: 0;
  right: 0;
  margin: auto;
  /* padding: 10px; */
  /* box-sizing: border-box; */
}
.el-cascader-panel {
  /* background-color: cadetblue; */
  width: auto;
  height: auto;
  overflow: hidden;
}
::v-deep.el-cascader-panel .el-cascader-menu .el-cascader-menu__wrap {
  height: 100%;
}
::v-deep.el-cascader-panel .el-scrollbar .el-scrollbar__wrap {
  /* overflow: scroll; */
  /* height: 100%; */
  padding: 0px 10px 15px 0px;
}
.tab-pane__text {
  color: #409eff;
  font-size: 14px;
  display: inline-block;
  height: 40px;
  line-height: 40px;
}
.label__input {
  width: 200px;
  height: auto;
  padding: 10px;
  /* background-color:cadetblue; */
}
::v-deep.el-select-dropdown__list {
  list-style: none;
  padding: 6px 0px 15px 0px;
  margin: 0;
  box-sizing: border-box;
}
</style>