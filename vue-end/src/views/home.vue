<template>
  <div id="home">
    <div class="con1">
      <div class="tu">
        <img class="img1" src="@/assets/企业搜索3.png" alt=""> 
      </div>
      <div class="con" v-for="(item,index) in data" :key='index'>
        <div class="cc c1">
          {{item.name}}
        </div>
        <div class="cc c2">
          {{item.desc}}
        </div>
        <div class="cc c3">
          {{item.phone}}
        </div>
        <div class="cc c3">
          {{item.emila}}
        </div>
        <div class="cc c3">
          {{item.wang}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"home",
  data(){
    return{
      data:[
        {
          name:"企业搜索技术有限公司",
          desc:'简介: 该为企业搜索技术有限公司旗下的一款企业信息查询工具后台管理系统，'+
          '旨在为用户提供快速查询企业工商信息、关联企业信息、公司新闻、执行人等信息。'+
          '后台管理则可以实现以上信息的添加、修改、删除等操作，通过在实践中不停创新，持续迭代，为顾客提供最优质的服务。'+
          '我们的口号是：缔造有远见的商业传奇！',
          phone:'客服电话：15512345610',
          emila:'发送邮件：kjwlgs@com',
          wang:'打开官网：www.kjwlyxgs',
          
        }
      ]
    }
  },

}
</script>

<style scoped>
@import '../css/home.css'
</style>