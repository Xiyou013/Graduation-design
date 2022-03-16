const Router = require('koa-router');
const User = new Router();

//所有用户信息总览，逆序排列
User.get('/admin/user/sel',
    async (ctx, next) => {
        // console.log('/admin/sel:',ctx.params);
        var udata = await ctx.db.query('select * from kjwl_yd_user where kjwl_yu_status = 1 order by kjwl_yu_datetime desc');
        // console.log(udata);
        if (udata) {
            ctx.body = udata;
        } else {
            ctx.body = '用户资源不存在';
        }
    }
)

//关键字模糊查询，根据用户昵称，账号及手机号定位查询
User.post('/admin/usersel',
    async (ctx, next) => {
        console.log('post', ctx.request.fields);
        const { name, phone } = ctx.request.fields;
        // SELECT * FROM `magazine` WHERE CONCAT(IFNULL(`title`,''),IFNULL(`tag`,''),IFNULL(`description`,'')) LIKE ‘%关键字%’
        var udata = await ctx.db.query(`select * from kjwl_yd_user where kjwl_yu_status = 1 and kjwl_yu_phone like '%${phone}%' and concat(ifnull(kjwl_yu_name,''),ifnull(kjwl_yu_account,'')) like '%${name}%'`);
        // console.log(udata);
        if (udata) {
            ctx.body = udata;
        } else {
            ctx.body = '用户资源不存在';
        }
    }
)

//根据id查询用户信息
User.get('/admin/userdetails/:id',
    async (ctx, next) => {
        console.log('/admin/admindetails:', ctx.params);
        var { id } = ctx.params;
        var udata = await ctx.db.query(`select * from kjwl_yd_user where kjwl_yu_id = ?`, [id]);
        if (udata) {
            ctx.body = udata;
        } else {
            ctx.body = '该用户无数据';
        }

    }
)

//查看用户vip是否到期，若到期则更改vip身份
User.get('/admin/usereditor/:id/:privilege', async (ctx, next) => {
    console.log('/admin/admindetails:', ctx.params);
    var { id, privilege } = ctx.params;
    var udata = await ctx.db.query(`update kjwl_yd_user set kjwl_yu_privilege = ? where kjwl_yu_id = ?`, [privilege, id]);
    if (udata) {
        ctx.body = udata;
    } else {
        ctx.body = '该用户无数据';
    }
})


//意见反馈信息总览，逆序排列
User.post('/admin/user/feedback/sel',
    async (ctx, next) => {
        console.log('post', ctx.request.fields);
        const { name } = ctx.request.fields;
        let arr = [];
        var fdata = await ctx.db.query('select * from qyss_yd_user_feedback order by qyss_uf_datetime desc');
        // console.log('fdata:', fdata);
        if (fdata && fdata.length > 0) {
            for (let i = 0; i < fdata.length; i++) {
                var udata = await ctx.db.query(`select * from kjwl_yd_user where kjwl_yu_status = 1 and concat(ifnull(kjwl_yu_name,''),ifnull(kjwl_yu_account,'')) like '%${name}%'`);
                // console.log('udata:', udata);
                if (udata && udata.length > 0) {
                    for (let j = 0; j < udata.length; j++) {
                        if (udata[j].kjwl_yu_id === fdata[i].qyss_uf_id) {
                            // console.log('udata+fdata:', udata[j],fdata[i])
                            if (fdata[i].kjwl_e_id != null) {
                                var edata = await ctx.db.query(`select * from kjwl_pc_basic_enterprise where  kjwl_e_status = 1 and kjwl_e_id = ${fdata[i].kjwl_e_id}`);
                                fdata[i].companyData = edata[0];
                            }
                            if (fdata[i].kjwl_p_id != null) {
                                var pdata = await ctx.db.query(`select * from kjwl_pc_basic_person where  kjwl_p_status = 1 and kjwl_p_id = ${fdata[i].kjwl_p_id}`);
                                fdata[i].bossData = pdata[0];
                            }
                            fdata[i].person = udata[j];
                            arr.push(fdata[i]);
                        }
                    }
                }
                // console.log('fdata:', fdata);
            }
        }
        // console.log('arr:', arr);
        // var fdata = await ctx.db.query('select * from qyss_yd_user_feedback where kjwl_yu_status = 1 order by kjwl_yu_datetime desc');
        // console.log(udata);
        if (arr && arr.length > 0) {
            ctx.body = arr;
        } else {
            ctx.body = [];
        }
    }
)

module.exports = User.routes();