<template>
  <div id="identify">
    <div class="i_topnav">
        请输入邮箱以确认账号
    </div>
    <div class="i_con">
      <div class="i_connav">
        电子邮箱:
      </div>
      <div class="i_coninput">
          <input type="text" name="email" v-model="email">
      </div>
    </div>
    <div class="i_btn">
        <div class="i_btn1">
              <el-button style="width: 200px;height: 50px;" type="info" plain @click="clickfn('/personal')">取消</el-button>
        </div>
        <div class="i_btn1">
              <el-button style="width: 200px;height: 50px;" type="primary" plain @click="Setpassword()">设定密码</el-button>
        </div>
    </div>
      <!-- <div class="i_bottomnav" >
          忘记密码？
      </div> -->
  </div>
</template>

<script>
export default {
    name:'identify',
    data(){
      return{
        email:'',
      }
    },
    methods:{
      // emailjy(){
      //   console.log(1,this.email);
      // },
      async Setpassword(){
        console.log(this.email);
        var str = this.judge();
        var {userid} = localStorage;
        console.log(123,userid);
        if(str === 1){
          var res = await this.$axios.get(`/api/admin/emailjy/${userid}/${this.email}`);
          console.log(res.data);
          if(res.data == '该用户不存在'){
            this.$message.error('该用户不存在');
          }else if(res.data && res.data.length>0){
            this.$router.push('/changepassword');
          }
        }
        
      },
      judge(){
            console.log(this.email);
            var res =/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            if(this.email === ''){
                this.$message({
                  message: '警告: 您输入的邮箱为空，请重新输入',
                  type: 'warning'
                });
            }else{
                if(res.test(this.email)){
                    console.log('res',this.email)
                    return 1;
                }else{
                  this.$message({
                    message: '警告: 邮箱格式不正确，请重新输入',
                    type: 'warning'
                  });
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
@import '../../css/identify.css';
</style>