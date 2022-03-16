const Router = require('koa-router');
const LoginRegister = new Router();
var utils = require("./utils");


LoginRegister.get('/www/userLogin/:tel/:password',
    async (ctx, next) => {
        console.log('/www/userLogin/:', ctx.params);
        var { tel, password } = ctx.params;
        var udata = await ctx.db.query(`select * from kjwl_yd_user where kjwl_yu_status = 1 and kjwl_yu_password = ? and (kjwl_yu_phone = ? or kjwl_yu_account = ?)`, [password, tel, tel]);
        if (udata && udata.length > 0) {
            ctx.body = udata;
        } else {
            ctx.body = [];
        }
    })

LoginRegister.post('/www/userRegister',
    async (ctx, next) => {
        console.log('post', ctx.request.fields);
        let portrait = 'http://localhost:8000/头像.png';
        let status = 1;
        let _result = {};
        var { tel, password, email } = ctx.request.fields;
        var tellist = await ctx.db.query(`select * from kjwl_yd_user where kjwl_yu_status = 1 and kjwl_yu_phone = ?`, [tel]);
        var emaillist = await ctx.db.query(`select * from kjwl_yd_user where kjwl_yu_status = 1 and kjwl_yu_email = ?`, [email]);
        console.log('tellist:', tellist);
        console.log('emaillist:', emaillist);
        if (tellist && tellist.length > 0) _result.data = '该手机号已被注册，请重新输入', _result.type = 'error';
        if (emaillist && emaillist.length > 0) _result.data = '该邮箱已被注册，请重新输入', _result.type = 'error';
        if (tellist.length > 0 && emaillist.length > 0) _result.data = '该手机号/邮箱已被注册，请重新输入', _result.type = 'error';
        if (tellist.length === 0 && emaillist.length === 0) {
            let account = Number(utils.getRnadomFiveInt(10));
            console.log('account:', account,);
            var sql = `insert into kjwl_yd_user 
        (kjwl_yu_account,kjwl_yu_name,kjwl_yu_password,kjwl_yu_portrait,kjwl_yu_phone,kjwl_yu_email,kjwl_yu_status) values (?,?,?,?,?,?,?)`;
            var udata = await ctx.db.query(sql, [account, tel, password, portrait, tel, email, status]);
            console.log('udata:', udata);
            if (udata) _result.data = '账号注册成功，请登录账号', _result.type = 'success';
        }
        if (_result && _result != {}) {
            ctx.body = _result;
        } else {
            ctx.body = [];
        }
    })

LoginRegister.get('/www/userForgotPassword/:tel/:email',
    async (ctx, next) => {
        console.log('/www/userForgotPassword/:', ctx.params);
        var { tel, email } = ctx.params;
        let _result = { message: "手机号/邮箱错误,请重新输入", type: 'error' };
        var udata = await ctx.db.query(`select * from kjwl_yd_user where kjwl_yu_status = 1 and kjwl_yu_email = ? and kjwl_yu_phone = ?`, [email, tel]);
        if (udata && udata.length > 0) {
            ctx.body = udata;
        } else {
            ctx.body = _result;
        }
    })

LoginRegister.post('/www/userChangePassword',
    async (ctx, next) => {
        console.log('post', ctx.request.fields);
        var { id, password } = ctx.request.fields;
        let _result = { message: "密码修改失败,请重新输入", type: 'error' };
        var sql = `update kjwl_yd_user set kjwl_yu_password = ? where kjwl_yu_id = ?`;
        var udata = await ctx.db.query(sql, [password, id]);
        console.log('udata:',udata);
        if (udata) {
            ctx.body = udata;
        } else {
            ctx.body = _result;
        }
    })

module.exports = LoginRegister.routes();