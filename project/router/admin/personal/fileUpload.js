
const Router = require('koa-router');
const fileUpload = new Router();

//图片上传，获取上传路径
fileUpload.post('/admin/imguplond',
    async (ctx, next) => {
        console.log('post', ctx.request.fields);
        const { file } = ctx.request.fields;
        let arr = file[0].path.split('\\');
        let str = ['http://localhost:8000/'];
        str.push(arr[4]);
        let res = str.join('');
        console.log(res)
        // var sql = `insert into imgtest
        // (url) values (?)`;
        // var pdata = await ctx.db.query(sql, [res]);
        ctx.body = res;
    })

    //保存图片路径，存入数据库中
fileUpload.post('/admin/upload',async function(ctx,next){
    let img = 'http://localhost:8000/头像.png';
    ctx.body = '文件上传接口';
    //接收post数据
    console.log('post',ctx.request.fields);
    const {id,imageUrl} = ctx.request.fields;
    if (imageUrl !== '') {
        img = imageUrl;
    }
    console.log(id);
    console.log(img);
    var sql = `update kjwl_pc_user set kjwl_u_portrait = ? where kjwl_u_id = ?`;
    var pdata = await ctx.db.query(sql,[img,id]);
    console.log(pdata);
})

//获取登录账号信息
fileUpload.get('/admin/download/:id',async function(ctx,next){
    // console.log('post',ctx.request.fields);
    let {id} = ctx.params
    console.log('id:',id);
    var pdata = await ctx.db.query(`select * from kjwl_pc_user where kjwl_u_id = ?`,id);
    if(pdata && pdata.length>0){
        ctx.body = pdata;
    }else{
        ctx.body = '该用户不存在'
    }
    console.log(pdata);
    // ctx.body = '该用户不存在'
})

module.exports = fileUpload.routes();