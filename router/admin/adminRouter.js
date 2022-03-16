const Router = require('koa-router');
const adminRouter = new Router();

//导入后台路由中的接口文件
//管理员相关接口
const administrator = require('./administrator/administrator.js');
//登录账号相关接口
const personal = require('./personal/personal.js');
//登录账号图片上传相关接口
const fileUpload = require('./personal/fileUpload.js');
//用户相关接口
const User = require('./user/user.js');
//新闻相关接口
const News = require('./news/news.js');
//人物信息相关接口
const boss = require('./boss/boss.js');
//企业信息相关接口
const Enterprise = require('./enterprise/enterprise.js');
//标签管理相关接口
const Label = require('./label/label.js');




adminRouter.get('/admin',async (ctx,next)=>{
    ctx.body = '/admin'
})

//路由中间件调用接口
adminRouter.use(administrator);
adminRouter.use(personal);
adminRouter.use(fileUpload);
adminRouter.use(User);
adminRouter.use(News);
adminRouter.use(boss);
adminRouter.use(Enterprise);
adminRouter.use(Label);

//导出后台路由文件
module.exports = adminRouter.routes();