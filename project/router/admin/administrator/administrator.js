const Router = require('koa-router');
const administrator = new Router();

//登录页校验，是否存在该超级/管理员账号
administrator.get('/admin/user/:useraccount/:userpassword',
    async (ctx,next)=> {
        console.log('/admin/user/:',ctx.params);
        var {useraccount,userpassword} = ctx.params;
        console.log(useraccount,userpassword);
        var udata = await ctx.db.query(`select * from kjwl_pc_user where kjwl_u_account = ? and kjwl_u_password = ? and kjwl_u_status = 1`,[useraccount,userpassword]);
        console.log(udata);
        if(udata){
            ctx.body = udata;
        }else{
            ctx.body = '该用户不存在'
        }
    }
)

//查询所有管理员账号信息，并按照录入时间逆序排列（即时间最近的在前）
administrator.get('/admin/sel',
    async (ctx,next)=> {
        // console.log('/admin/sel:',ctx.params);
        var udata = await ctx.db.query('select * from kjwl_pc_user where kjwl_u_status = 1 order by kjwl_u_datetime desc');
        // console.log(udata);
        if(udata){
            ctx.body = udata;
        }else{
            ctx.body = '用户资源不存在';
        }
    }
)

//关键字模糊查询，通过登录身份，以及管理员账号和昵称搜索该管理员信息
administrator.post('/admin/select',
    async (ctx,next)=> {
        console.log('post', ctx.request.fields);
        const { name, identity } = ctx.request.fields;
        var udata = await ctx.db.query(`select * from kjwl_pc_user where kjwl_u_status = 1 and kjwl_u_identity like '%${identity}%' and concat(ifnull(kjwl_u_name,''),ifnull(kjwl_u_account,'')) like '%${name}%'`);
        console.log(udata);
        if(udata){
            ctx.body = udata;
        }else{
            ctx.body = '用户资源不存在';
        }
    }
)

//超级管理员权限,新增超级/管理员身份账号
administrator.post('/admin/adminadd',
    async (ctx,next)=> {
        console.log('post',ctx.request.fields);
        var _result ='';
        var {account,name,password,portrait,date,sex,identity,phone,email,status} = ctx.request.fields;
        console.log('status',status)
        var sql = `insert into kjwl_pc_user 
        (kjwl_u_account,kjwl_u_name,kjwl_u_password,kjwl_u_portrait,kjwl_u_birthdate,kjwl_u_sex,kjwl_u_identity,kjwl_u_phone,kjwl_u_email,kjwl_u_status) values (?,?,?,?,?,?,?,?,?,?)`;
        var udata = await ctx.db.query(sql,[account,name,password,portrait,date,sex,identity,phone,email,status]);
        // console.log(udata);
        if(udata && udata.insertId){
            _result = {status:1,'msg':'添加成功',data:''};
        }else{
            _result = {status:0,'msg':'添加失败',data:''};
        }
        ctx.body = _result;
})

//根据id查询该管理员信息
administrator.get('/admin/admindetails/:id',
    async (ctx,next)=> {
        console.log('/admin/admindetails:',ctx.params);
        var {id} = ctx.params;
        var udata = await ctx.db.query(`select * from kjwl_pc_user where kjwl_u_id = ?`,[id]);
        if(udata){
            ctx.body = udata;
        }else{
            ctx.body = '该用户无数据';
        }
        
    }
)

//超级管理员权限，对管理员信息进行重置，更改
administrator.post('/admin/admineditor',
    async (ctx,next)=> {
        console.log('post',ctx.request.fields);
        var _result ='';
        var {id,account,name,password,portrait,date,sex,identity,phone,email,status} = ctx.request.fields;
        console.log('status',status,identity)
        var sql = `update kjwl_pc_user set kjwl_u_account = ?,kjwl_u_name = ?,kjwl_u_password = ?,kjwl_u_portrait = ?,
        kjwl_u_birthdate = ?,kjwl_u_sex = ?,kjwl_u_identity = ?,kjwl_u_phone = ?,kjwl_u_email = ?,kjwl_u_status = ? where kjwl_u_id = ?`;
        var udata = await ctx.db.query(sql,[account,name,password,portrait,date,sex,identity,phone,email,status,id]);
        // console.log(udata);
        if(udata && udata.insertId){
            _result = {status:1,'msg':'修改成功',data:''};
        }else{
            _result = {status:0,'msg':'修改失败',data:''};
        }
        ctx.body = _result;
})

//超级管理员权限，删除管理员身份账号
administrator.get('/admin/admindelete/:id',
    async (ctx,next)=> {
        console.log('get',ctx.params);
        var {id} = ctx.params;
        var _result ='';
        var udata = await ctx.db.query(`update kjwl_pc_user set kjwl_u_status = 0 where kjwl_u_id = ?`,[id]);
        // console.log(udata);
        if(udata && udata.insertId){
            _result = {status:1,'msg':'修改成功',data:''};
        }else{
            _result = {status:0,'msg':'修改失败',data:''};
        }
        ctx.body = _result;
})

module.exports = administrator.routes();