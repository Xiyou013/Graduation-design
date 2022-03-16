import Vue from 'vue';
import Router from 'vue-router';

//登录页
import Login from '../views/Login.vue'
//404页面
import Notfount from '@/views/404.vue'
//管理菜单页面
import Administrator from '@/views/administrator.vue'
//首页
import Home from '@/views/home.vue'
//企业信息首页
import EntenterpriseIndex from '@/views/enterprise/enterpriseindex.vue'
//人物信息首页
import BossIndex from '@/views/boss/bossindex.vue'
//新闻信息首页
import NewsIndex from '@/views/news/newsindex.vue'
//用户信息首页
import UserIndex from '@/views/user/userindex.vue'
//登录账号信息首页
import PersonalIndex from '@/views/personal/personalindex.vue'
//帮助首页
import HelpIndex from '@/views/help/helpindex.vue'
//登录账号编辑页面
import PersonalEditor from '@/views/personal/personaleditor.vue'
//登录账号图片上传页面
import PersonalPortrait from '@/views/personal/personalportrait.vue'
//登录账号修改密码页面
import Changepassword from '@/views/personal/change-password.vue'
//登录账号邮箱确认页面
import Identify from '@/views/personal/identify.vue'
//企业新增页面
import EnterpriseAdd from '@/views/enterprise/enterpriseadd.vue'
//企业编辑页面
import EnterpriseEditor from '@/views/enterprise/enterpriseeditor.vue'
//企业详情页面
import EnterpriseDetails from '@/views/enterprise/enterprisedetails.vue'
//人物新增页面
import BossAdd from '@/views/boss/bossadd.vue'
//人物编辑页面
import BossEditor from '@/views/boss/bosseditor.vue'
//人物详情页面
import BossDetails from '@/views/boss/bossdetails.vue'
//新闻新增页面
import NewsAdd from '@/views/news/newsadd.vue'
//新闻编辑页面
import NewsEditor from '@/views/news/newseditor.vue'
//新闻详情页面
import NewsDetails from '@/views/news/newsdetails.vue'
//用户详情页面
import UserContent from '@/views/user/usercontent'
//管理员账号首页
import AdminIndex from '@/views/admin/adminindex.vue'
//管理员账号新增页面
import AdminAdd from '@/views/admin/adminadd.vue'
//管理员账号详情页面
import AdminDetails from '@/views/admin/admindetails.vue'
//管理员账号编辑页面
import AdminEditor from '@/views/admin/admineditor.vue'
//标签管理首页
import LabelIndex from '@/views/label/labelindex.vue'
// 意见反馈页面
import FeedbackIndex from '@/views/user/feedback.vue'


Vue.use(Router);

var router = new Router({
    mode:'history',
    base: process.env.BASE_URL,
    routes:[
        {
            path:'/',           //路径,根目录
            redirect:'/login'   //redirect跳转的意思
        },
        {
            path:'/login',          
            component: Login
        },
        {   path:'*',component: Notfount},
        {   path:'/admin',name:'admin',component: Administrator,
            children:[
                {   path:'',component: Home},
                {   path:'/home',component: Home},
                {   path:'/enterprise',component: EntenterpriseIndex},
                {   path:'/boss',component: BossIndex},
                {   path:'/news',component: NewsIndex},
                {   path:'/user',component: UserIndex},
                {   path:'/personal',component: PersonalIndex},
                {   path:'/help',component: HelpIndex},
                {   path:'/personaleditor',component: PersonalEditor},
                {   path:'/personalportrait',component: PersonalPortrait},
                {   path:'/changepassword',component: Changepassword},
                {   path:'/identify',component: Identify},
                {   path:'/enterpriseadd',component: EnterpriseAdd},
                {   path:'/enterpriseeditor',component: EnterpriseEditor},
                {   path:'/enterprisedetails',component: EnterpriseDetails},
                {   path:'/bossadd',component: BossAdd},
                {   path:'/bosseditor',component: BossEditor},
                {   path:'/bossdetails',component: BossDetails},
                {   path:'/newsadd',component: NewsAdd},
                {   path:'/newseditor',component: NewsEditor},
                {   path:'/newsdetails',component: NewsDetails},
                {   path:'/usercontent',component: UserContent},
                {   path:'/adminindex',component: AdminIndex},
                {   path:'/adminadd',component: AdminAdd},
                {   path:'/admindetails',name:'admindetails',component: AdminDetails},
                {   path:'/admineditor',name:'admineditor',component: AdminEditor},
                {   path:'/labelIndex',component: LabelIndex},
                {   path:'/feedbackIndex',component: FeedbackIndex},
            ]
        },
    ]
})

//路由守卫
router.beforeEach((to,from,next) => {
    // console.log(11,to,from,next);
    if(to.path === '/login'){
        //token后台给前端返回的身份认证token
        //to.path是路由配置中的名字
        next();
    }else{
        if(localStorage.token){
            //如果有token认证我才会让你通过
            next();
        }
        else{
            router.push('/login')
        }
    }
})

export default router;