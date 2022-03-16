<template>
  <div id="personal">
      <div class="p_left">
          <div class="p_left_1">
                <div class="p_left_1_img">
                    <img class="t_img" :src="circleUrl">
                </div>
                <div class="p_left_1_name">
                    <!-- 西柚大魔王 -->
                    {{name}}
                </div>
          </div>
          <div class="p_left_2">
              <div class="p_left_2_fn1 fn1" @click="clickfn('/personaleditor')">
                  编辑使用者资讯
              </div>
              <div class="p_left_2_fn1 fn2" @click="clickfn('/identify')">
                  登录账户安全
              </div>
          </div>
      </div>
      <div class="p_right">
          <div class="p_right_1">
              <div class="p_right_1_1">
                  <div class="p_right_1_1_top">
                      个&emsp;人&emsp;资&emsp;料
                  </div>
                  <div class="p_right_1_1_con">
                      <div class="p_right_1_1_con_information">
                          <div class="p_right_1_1_con_information_left">
                              昵&emsp;&emsp;称:
                          </div>
                          <div class="p_right_1_1_con_information_right">
                              {{name}}
                          </div>
                      </div>
                      <div class="p_right_1_1_con_information">
                          <div class="p_right_1_1_con_information_left">
                              账&emsp;&emsp;号:
                          </div>
                          <div class="p_right_1_1_con_information_right">
                              {{account}}
                          </div>
                      </div>
                      <div class="p_right_1_1_con_information">
                          <div class="p_right_1_1_con_information_left">
                              性&emsp;&emsp;别:
                          </div>
                          <div class="p_right_1_1_con_information_right">
                              {{sex}}
                          </div>
                      </div>
                      <div class="p_right_1_1_con_information">
                          <div class="p_right_1_1_con_information_left">
                              出生年月:
                          </div>
                          <div class="p_right_1_1_con_information_right">
                            {{date}}
                          </div>
                      </div>
                      <div class="p_right_1_1_con_information">
                          <div class="p_right_1_1_con_information_left">
                              身&emsp;&emsp;份:
                          </div>
                          <div class="p_right_1_1_con_information_right">
                              {{identify}}
                          </div>
                      </div>
                      <div class="p_right_1_1_con_information">
                          <div class="p_right_1_1_con_information_left">
                              电&emsp;&emsp;话:
                          </div>
                          <div class="p_right_1_1_con_information_right">
                              {{phone}}
                          </div>
                      </div>
                      <div class="p_right_1_1_con_information p_r_bottom">
                          <div class="p_right_1_1_con_information_left">
                              电子邮箱:
                          </div>
                          <div class="p_right_1_1_con_information_right">
                              {{email}}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'personal',
    data(){
        return{
            account:'',
            name:'',
            sex:'',
            date:'',
            identify:'',
            phone:'',
            email:'',
            circleUrl: require("../../assets/头像.png"),

        }
    },
    mounted(){
        this.select();

    },
    methods:{
        clickfn(val){
            console.log(val);
            this.$router.push({
                path:val,
            })
        },
        async select(){
            console.log('111',localStorage);
            console.log('store:',this.$store.state)
            var {username,accountdetails,userid,userportrait} = localStorage;
            console.log(username,accountdetails,userid,userportrait);

            var res = await this.$axios.get(`/api/admin/personal/${userid}`);
            console.log(123)
            if(res){
                console.log(res);
                var {kjwl_u_account,kjwl_u_name,kjwl_u_birthdate,kjwl_u_sex,kjwl_u_identity,kjwl_u_phone,kjwl_u_email} = res.data[0];
                this.date =  this.showTime(kjwl_u_birthdate);
                this.account = kjwl_u_account;
                this.name = kjwl_u_name;
                this.sex = kjwl_u_sex;
                if(kjwl_u_identity === 1){
                    this.identify = '管理员';
                }else if(kjwl_u_identity === 2){
                    this.identify = '超级管理员';
                }
                
                this.phone = kjwl_u_phone;
                this.email = kjwl_u_email;
                this.circleUrl = userportrait;
            }
        },
        showTime(val){
            var date=new Date(val);
            var msg = date.getFullYear() +'-'+ this.padaDate(date.getMonth()+1) 
                +'-'+ this.padaDate(date.getDate());
                // console.log(msg)
                return msg;
        },
        padaDate(value){
            return value<10 ? '0'+value : value;
        },
    }
}
</script>

<style scoped>
@import '../../css/personalindex.css';
</style>