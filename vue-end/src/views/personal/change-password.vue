<template>
  <div id="changepassword">
      <div class="cp_topnav">
          设定密码
      </div>
      <div class="cp_con">
          <div class="cp_con1">
              <div class="cp_con1_top">
                  新密码:
              </div>
              <div class="cp_con1_password">
                    <input type="text" class="input1"  v-model="input1">
              </div>
          </div>
          <div class="cp_con1">
              <div class="cp_con1_top">
                  再次输入密码:
              </div>
              <div class="cp_con1_password">
                    <input type="text" class="input1"  v-model="input2">
              </div>
          </div>
      </div>
      <div class="cp_bottom">
            <div class="cp_btn1">
                <el-button type="info" style="width: 200px;
                    height: 40px;" plain @click="clickfn('/personal')">取消</el-button>
            </div>
            <div class="cp_btn1">
                <el-button type="primary" style="width: 200px;
                    height: 40px;" plain @click="set()">设定</el-button>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'changepassword',
     data() {
      return {
        input1: '',
        input2: '',
      }
    },
    methods:{
        //更改密码
        async set(){
            console.log(this.input1,this.input2)
            var str = this.judge();
            var {userid} = localStorage;
            if(str === 1){
                var res = await this.$axios.post('/api/admin/personalsetpassword',{password:this.input2,id:userid});
                console.log(res);
                this.$router.push('/personal');
            }
        },
        //密码校验
        judge(){
            console.log(this.input1,this.input2);
            var res = /^[a-zA-Z0-9]{6,12}$/;
            if(this.input1 !== this.input2){
                this.$message({
                    message: '警告: 您输入的两次密码不一致，请重新输入',
                    type: 'warning'
                });
            }else{
                if(this.input2 === '' ){
                    this.$message({
                        message: '警告: 您输入的密码为空，请重新输入',
                        type: 'warning'
                    });
                }else{
                    if(res.test(this.input2)){
                        console.log('res1:',this.input2);
                        return 1;
                    }else if(this.input2.length < 6 || this.input2.length > 12){
                        this.$message({
                            message: '警告: 密码长度为6-12位数字或英文',
                            type: 'warning'
                        });
                    }else{
                        this.$message({
                            message: '警告: 密码格式不正确，6-12为数字或英文',
                            type: 'warning'
                        });
                    }
                }
            }
        },
        clickfn(val){
          console.log(val);
          this.$router.push({
              path:val,
          })
        },
    },

}
</script>

<style scoped>
@import '../../css/change-password.css';
</style>