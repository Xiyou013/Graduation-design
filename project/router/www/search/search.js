const Router = require('koa-router');
const SearchRegister = new Router();

SearchRegister.get('/www/SearchCompanyPanel',
    async (ctx, next) => {
        let arr = [];
        var hdata = await ctx.db.query(`select * from kjwl_pc_basic_enterprise where kjwl_e_status = 1 order by kjwl_e_setdate desc`);
        if (hdata && hdata.length <= 6) {
            arr = hdata
        } else {
            for (let i = 0; i < 6; i++) {
                arr[i] = hdata[i];
            }
        }
        if (arr && arr.length > 0) {
            ctx.body = arr;
        } else {
            ctx.body = [];
        }
    })

SearchRegister.get('/www/SearchBossPanel',
    async (ctx, next) => {
        let arr = [];
        var hdata = await ctx.db.query(`select * from kjwl_pc_basic_person where  kjwl_p_status = 1 order by kjwl_p_datetime desc`);
        if (hdata && hdata.length <= 6) {
            arr = hdata
        } else {
            for (let i = 0; i < 6; i++) {
                arr[i] = hdata[i];
            }
        }
        if (arr && arr.length > 0) {
            ctx.body = arr;
        } else {
            ctx.body = [];
        }
    })

SearchRegister.get('/www/SearchNewsPanel',
    async (ctx, next) => {
        let arr = [];
        var hdata = await ctx.db.query(`select * from kjwl_pc_basic_news where  kjwl_n_status = 1 order by kjwl_n_rdatetime desc`);
        if (hdata && hdata.length <= 6) {
            arr = hdata
        } else {
            for (let i = 0; i < 6; i++) {
                arr[i] = hdata[i];
            }
        }
        if (arr && arr.length > 0) {
            ctx.body = arr;
        } else {
            ctx.body = [];
        }
    })

module.exports = SearchRegister.routes();