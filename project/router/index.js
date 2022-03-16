const Router = require('koa-router');
const router = new Router();

//导入前端接口路由文件
const wwwRouter = require('./www/wwwRouter');
//导入后台接口路由文件
const adminRouter = require('./admin/adminRouter');
//路由中间件使用所导入的路由
router.use(wwwRouter,adminRouter);

//导出路由文件
module.exports = router.routes();