const Router = require('koa-router');
const personal = new Router();

//根据登录账号id，获取登录账号的具体信息
personal.get('/admin/personal/:userid',
    async (ctx,next)=> {
        console.log('/admin/personal/:',ctx.params);
        var {userid} = ctx.params;
        var pdata = await ctx.db.query(`select * from kjwl_pc_user where kjwl_u_id = ? and kjwl_u_status = 1`,[userid]);
        console.log(pdata);
        if(pdata){
            ctx.body = pdata;
        }else{
            ctx.body = '该用户不存在'
        }
    }
)

//编辑登录账号信息
personal.post('/admin/personaleditor',
    async (ctx,next)=> {
        console.log('post',ctx.request.fields);
        var {id,account,name,date,sex,identity,phone,email} = ctx.request.fields;
        var sql = `update kjwl_pc_user set kjwl_u_account = ?,kjwl_u_name = ?,kjwl_u_birthdate = ?,kjwl_u_sex = ?,kjwl_u_identity = ?,kjwl_u_phone = ?,kjwl_u_email = ? where kjwl_u_id = ?`;
        var pdata = await ctx.db.query(sql,[account,name,date,sex,identity,phone,email,id]);
        console.log(pdata);
        ctx.body = pdata;
})

//根据邮箱匹配是否是登录账号的邮箱
personal.get('/admin/emailjy/:userid/:useremail',
    async (ctx,next)=> {
        console.log('/admin/personal/:',ctx.params);
        var {userid,useremail} = ctx.params;
        var pdata = await ctx.db.query(`select * from kjwl_pc_user where kjwl_u_id = ? and kjwl_u_email = ?`,[userid,useremail]);
        if(pdata && pdata.length>0){
            ctx.body = pdata;
        }else{
            ctx.body = '该用户不存在'
        }
})

//修改登录账号的密码
personal.post('/admin/personalsetpassword',
    async (ctx,next)=> {
        console.log('post',ctx.request.fields);
        var {password,id} = ctx.request.fields;
        console.log(password,id);
        var sql = `update kjwl_pc_user set kjwl_u_password = ? where kjwl_u_id = ?`;
        var pdata = await ctx.db.query(sql,[password,id]);
        console.log(pdata);
        ctx.body = pdata;
})

module.exports = personal.routes();