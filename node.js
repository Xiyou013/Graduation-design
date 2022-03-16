const Koa = require('koa');
const server = new Koa();
const static = require('koa-static');
const path = require('path');
const fs = require('promise-fs');
const mysql = require('promise-mysql');
const body = require('koa-better-body');
const convert = require('koa-convert');
// const bodyParser = require('koa-bodyparser')
// const koaBody = require('koa-body')

//配置mysql数据库连接池
(async ()=>{
    server.context.db = await mysql.createPool({
        host:'localhost',                   //主机名
        user:'root',                        //用户名
        password:'root',                    //密码
        database:'kjwl',                    //数据库名字
        port:3306                           //数据库端口号
    });
    server.context.userId = 'admin'; 
})()

//post解析方式
// server.use(convert(body()));

// server.use(koaBody({
//     "formLimit":"5mb",
//     "jsonLimit":"5mb",
//     "textLimit":"5mb"
// }));


server.use(convert(body(
    //后台接收文件的具体路径：我把真实的文件传到路径下面去
    // console.log('__dirname:',__dirname)
    {
        uploadDir:path.resolve(__dirname,'upload'),
        keepExtensions: true,// 保持文件的后缀
        maxFieldsSize:10 * 1024 * 1024, // 文件上传大小
    }
)));



//   server.use(bodyParser.json({limit: '50mb', extended: true}));
//   server.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//中间件,顶层过滤器
server.use(async (ctx,next)=>{
    //全局过滤路径
    if(ctx.url === '/favicon.ico') return;   
    
    //全局捕获
    try{
       await next();  
       //捕获普通错误：服务器能正常运行，但是没有资源的错误方式
       if(!ctx.body){
        ctx.body ='404 not found1';
        ctx.status = 404;
       } 
    }catch(e){
        //捕获的是重要错误
        console.log('后台错误',e);
        ctx.status = 500;
        ctx.body = '500报错，服务器down掉了'
    }
})

//监听server对象，确认连接是否成功
server.listen(8000,()=>{
    console.log('node服务器开启...')
})

//导入路由的路径
server.use(require('./router'));

//导入静态包,选择具体静态资源路径,读取静态文件夹static中的静态文件
// __dirname    是系统参数  可以理解为当前的目录/文件夹 nodexitong
server.use(static(path.resolve(__dirname,'./static')))
server.use(static(path.resolve(__dirname,'./upload')))