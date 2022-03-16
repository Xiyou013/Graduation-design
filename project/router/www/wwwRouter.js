const Router = require('koa-router');
const wwwRouter = new Router();

//导入前端路由中的接口文件
const LoginRegister = require('./login/login-register');
const Home = require('./home/home');
const HistoryRegister = require('./search/history.js');
const SearchRegister = require('./search/search.js');
const PersonalRegister = require('./personal/personal.js');
const NewsRegister = require('./news/news.js');
const BossRegister = require('./boss/boss.js');
const CompanyRegister = require('./company/company.js');


wwwRouter.get('/www',async (ctx,next)=>{
    ctx.body = '/www'
})

//路由中间件调用接口
wwwRouter.use(LoginRegister);
wwwRouter.use(Home);
wwwRouter.use(HistoryRegister);
wwwRouter.use(SearchRegister);
wwwRouter.use(PersonalRegister);
wwwRouter.use(NewsRegister);
wwwRouter.use(BossRegister);
wwwRouter.use(CompanyRegister);

//导出后台路由文件
module.exports = wwwRouter.routes();