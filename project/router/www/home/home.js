const Router = require('koa-router');
const Home = new Router();
var utils = require("./utils");


Home.get('/www/mobile/terminal/editNewsDataNum',
    async (ctx, next) => {
        console.log('/www/mobile-terminal/:', ctx.params);
        let _result = { message: "修改成功", type: 'success' };
        var udata = await ctx.db.query(`select * from kjwl_pc_basic_news where kjwl_n_status = 1`);
        for (let i = 0; i < udata.length; i++) {
            // console.log('udata[i]:',udata[i].kjwl_n_rdatetime);
            let res = utils.editNewsDataNum(new Date(udata[i].kjwl_n_rdatetime));
            // console.log('res:', res);
            var sql = `update kjwl_pc_basic_news set kjwl_n_datanum = ? where kjwl_n_id = ?`;
            var editUdata = await ctx.db.query(sql, [res, udata[i].kjwl_n_id]);
            if (editUdata) _result.message = `id为${udata[i].kjwl_n_id}的新闻修改失败，请重新尝试`, _result.type = 'error';
        }
        if (_result && _result != {}) {
            ctx.body = _result;
        } else {
            ctx.body = [];
        }
    })

Home.get('/www/mobile/terminal/homeNews',
    async (ctx, next) => {
        console.log('/www/mobile-terminal/:', ctx.params);
        var udata = await ctx.db.query(`select * from kjwl_pc_basic_news where kjwl_n_status = 1 order by kjwl_n_rdatetime desc`);
        if (udata && udata.length > 0) {
            ctx.body = udata;
        } else {
            ctx.body = [];
        }
    })

Home.get('/www/mobile/terminal/homeNewsList',
    async (ctx, next) => {
        console.log('/www/mobile-terminal/homeNewsList:', ctx.params);
        let arr = [];
        // var udata = await ctx.db.query(`select * from kjwl_pc_basic_news where kjwl_n_status = 1 order by kjwl_n_click desc,kjwl_n_rdatetime desc`);
        var udata = await ctx.db.query(`select * from kjwl_pc_basic_news where kjwl_n_status = 1 order by kjwl_n_click desc`);
        for (let i = 0; i < udata.length; i++) {
            arr.push(udata[i]);
        }
        // console.log('udata:', udata);
        // console.log('arr:', arr);
        if (udata && udata.length > 0) {
            ctx.body = udata;
        } else {
            ctx.body = [];
        }
    })

module.exports = Home.routes();