<template>
    <div id="sadmin">
        <Top :name='name' :password='password'></Top>

        <div class="leftnav">
                <el-menu
                    router
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    @select="handleSelect"
                    background-color="#4783DA"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item index="/home">
                        <img class="img2" v-if="flag !== '/home'" src="@/assets/首页1.png" alt="">
                        <img class="img2" v-if="flag === '/home'" src="@/assets/首页2.png" alt="">
                        <span slot="title">首&emsp;&emsp;&emsp;页</span>
                    </el-menu-item>
                    <el-menu-item index="/enterprise">
                        <img class="img2" v-if="flag !== '/enterprise'" src="@/assets/企业1.png" alt="">
                        <img class="img2" v-if="flag === '/enterprise'" src="@/assets/企业2.png" alt="">
                        <span slot="title">企&nbsp;业&nbsp;信&nbsp;息</span>
                    </el-menu-item>
                    <el-menu-item index="/boss">
                        <img class="img2" v-if="flag !== '/boss'" src="@/assets/老板1.png" alt="">
                        <img class="img2" v-if="flag === '/boss'" src="@/assets/老板2.png" alt="">
                        <span slot="title">老&nbsp;板&nbsp;信&nbsp;息</span>
                    </el-menu-item>
                    <el-menu-item index="/news">
                        <img class="img2" v-if="flag !== '/news'" src="@/assets/新闻1.png" alt="">
                        <img class="img2" v-if="flag === '/news'" src="@/assets/新闻2.png" alt="">
                        <span slot="title">新&nbsp;闻&nbsp;信&nbsp;息</span>
                    </el-menu-item>
                    <el-menu-item index="/user">
                        <img class="img2" v-if="flag !== '/user'" src="@/assets/用户1.png" alt="">
                        <img class="img2" v-if="flag === '/user'" src="@/assets/用户2.png" alt="">
                        <span slot="title">用&nbsp;户&nbsp;信&nbsp;息</span>
                    </el-menu-item>
                    <el-menu-item index="/adminindex" >
                        <img class="img2" v-if="flag !== '/adminindex'" src="@/assets/管理员1.png" alt="">
                        <img class="img2" v-if="flag === '/adminindex'" src="@/assets/管理员2.png" alt="">
                        <span slot="title">管理员信息</span>
                    </el-menu-item>
                    <el-menu-item index="/personal" >
                        <img class="img2" v-if="flag !== '/personal'" src="@/assets/个人资料1.png" alt="">
                        <img class="img2" v-if="flag === '/personal'" src="@/assets/个人资料2.png" alt="">
                        <span slot="title">个&nbsp;人&nbsp;信&nbsp;息</span>
                    </el-menu-item>
                    <el-menu-item index="/help">
                        <img class="img2" v-if="flag !== '/help'" src="@/assets/帮助1.png" alt="">
                        <img class="img2" v-if="flag === '/help'" src="@/assets/帮助2.png" alt="">
                        <span slot="title">帮&nbsp;助&nbsp;信&nbsp;息</span>
                    </el-menu-item>
                </el-menu>
            </div>
        
            <div class="rightdiv">
                <!-- <div v-if="flag === 0">
                    <Home></Home>
                </div> -->
                <router-view></router-view>
            </div> 


        
    </div>
</template>

<script>
import Top from '@/components/top.vue'
export default {
    name:'sadmin',
   data(){
        return{
            name:'',
            password:'',
            flag:0,
        }
    },
    components:{
        Top,
    },
    mounted(){
        console.log(this.$route.params);
        var {params:{name,password,status}}=this.$route;
        console.log(name,password,status);
        this.name = name;
        this.password = password;
        console.log(this.name,this.password)   
        if(status === 0){
            console.log(456)
            window.location.reload();
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key,keyPath){
          console.log(key, keyPath);
          this.flag = key;
          console.log(this.flag)
      }
    }
}
</script>

<style scoped>
   @import '../css/sadmin.css';
</style>