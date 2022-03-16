import Vue from 'vue';
import Router from 'vue-router';

//404页面
import Notfount from '@/views/404.vue'
//首页
import Home from '@/views/home.vue'
//搜索页面
import Search from '@/views/search.vue'
//新闻页面
import News from '@/views/news.vue'
//个人中心页面
import PersonalCenter from '@/views/personal-center.vue'
//登录页面
import Login from '@/views/Login.vue'
//注册页面
import Register from '@/views/register.vue'
//忘记密码
import Forgotpassword from '@/components/forgot-password/forgot-password.vue'
//更改密码
import Changepassword from '@/components/forgot-password/change-password.vue'
//新闻详细页面
import NewsIndex from '@/views/news/news-index.vue'
//外部新闻页面
import OutsideNews from '@/views/news/outside-news.vue'
//收藏页面
import CollectionIndex from '@/views/personal-menu/collection-index.vue'
//意见反馈页面
import OpinionIndex from '@/views/personal-menu/opinion-index.vue'
//联系我们页面
import ContactIndex from '@/views/personal-menu/contact-index.vue'
//用户帮助页面
import AssistIndex from '@/views/personal-menu/assist-index.vue'
//个人信息页面
import PersonalInformation from '@/views/personal-menu/personal-information.vue'
//注销账号页面
import CancellationOfAccount from '@/views/personal-menu/cancellation-of-account.vue'
//修改信息页面
import ModifyInformation from '@/views/personal-menu/modify-information.vue'
//企业搜索列表页面
import CompanySearch from '@/views/company/company-search.vue'
//人员搜索列表页面
import BossSearch from '@/views/boss/boss-search.vue'
//企业基础信息页面
import CompanyIndex from '@/views/company/company-info/company-index.vue'
//企业更多信息页面
import CompanyMore from '@/views/company/company-info/company-more.vue'
//企业主要人员页面
import MainStaff from '@/views/company/company-info/main-staff.vue'
//企业新闻舆情页面
import NewsOpinion from '@/views/company/company-info/news-opinion.vue'
//企业工商信息页面
import BusinessInformation from '@/views/company/company-info/business-information.vue'
//企业地址页面
import CompanyMap from '@/views/company/company-info/company-map.vue'
//企业官网页面
import OutsideCompany from '@/views/company/company-info/outside-company.vue'
//人物基础信息页面
import BossIndex from '@/views/boss/boss-info/boss-index.vue'
//人物合作伙伴页面
import Partners from '@/views/boss/boss-info/partners.vue'
//人物新闻舆情页面
import BossNewsOpinion from '@/views/boss/boss-info/news-opinion.vue'
//人物信息百科页面
import FigureEncyclopedia from '@/views/boss/boss-info/figure-encyclopedia.vue'
//企业纠错反馈
import ComapnyFeedback from '@/views/company/company-info/company-feedback.vue'
//人物纠错反馈
import BossFeedback from '@/views/boss/boss-info/boss-feedback.vue'

//跳转空白页面
import KongIndex from '@/views/boss/boss-info/kong.vue'

Vue.use(Router);

var router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',           //路径,根目录
            redirect: '/home'   //redirect跳转的意思
        },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '*', component: Notfount },
        { path: '/home', component: Home },
        { path: '/search', name: 'search', component: Search },
        { path: '/news', name: 'news', component: News },
        { path: '/personal-center', component: PersonalCenter },
        { path: '/forgot-password', component: Forgotpassword },
        { path: '/change-password', name: 'change-password', component: Changepassword },
        { path: '/news-index', name: 'news-index', component: NewsIndex },
        { path: '/collection-index', name: 'collection-index', component: CollectionIndex },
        { path: '/opinion-index', name: 'opinion-index', component: OpinionIndex },
        { path: '/contact-index', name: 'contact-index', component: ContactIndex },
        { path: '/assist-index', name: 'assist-index', component: AssistIndex },
        { path: '/personal-information', name: 'personal-information', component: PersonalInformation },
        { path: '/cancellation-of-account', name: 'cancellation-of-account', component: CancellationOfAccount },
        { path: '/modify-information', name: 'modify-information', component: ModifyInformation },
        { path: '/company-search', name: 'company-search', component: CompanySearch },
        { path: '/boss-search', name: 'boss-search', component: BossSearch },
        { path: '/company-index', name: 'company-index', component: CompanyIndex },
        { path: '/company-more', name: 'company-more', component: CompanyMore },
        { path: '/company-map', name: 'company-map', component: CompanyMap },
        { path: '/main-staff', name: 'main-staff', component: MainStaff },
        { path: '/news-opinion', name: 'news-opinion', component: NewsOpinion },
        { path: '/business-information', name: 'business-information', component: BusinessInformation },
        { path: '/boss-index', name: 'boss-index', component: BossIndex },
        { path: '/kong-index', name: 'kong-index', component: KongIndex },
        { path: '/partners', name: 'partners', component: Partners },
        { path: '/boss-news-opinion', name: 'boss-news-opinion', component: BossNewsOpinion },
        { path: '/figure-encyclopedia', name: 'figure-encyclopedia', component: FigureEncyclopedia },
        { path: '/outside-news', name: 'outside-news', component: OutsideNews },
        { path: '/outside-company', name: 'outside-company', component: OutsideCompany },
        { path: '/comapny-feedback', name: 'comapny-feedback', component: ComapnyFeedback },
        { path: '/boss-feedback', name: 'boss-feedback', component: BossFeedback },

    ]
})

//路由守卫
router.beforeEach((to, from, next) => {
    console.log(11, to, from, next);
    if (to.path === '/home' || to.path === '/login' || to.path === '/register' || to.path === '/forgot-password' || to.path === '/change-password') {
        //token后台给前端返回的身份认证token
        //to.path是路由配置中的名字
        console.log('111');
        next();
    } else {
        console.log('222:', localStorage.token);

        if (localStorage.token) {
            //如果有token认证我才会让你通过
            console.log('333');

            next();
        }
        else {
            console.log('444');
            router.push('/login')
        }
    }
})

export default router;