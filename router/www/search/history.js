const Router = require('koa-router');
const HistoryRegister = new Router();

HistoryRegister.get('/www/userHistorySterm/:id/:type',
    async (ctx, next) => {
        console.log('/www/userLogin/:', ctx.params);
        var { id, type } = ctx.params;
        var hdata = await ctx.db.query(`select * from qyss_yd_search_history where qyss_sh_status = 1 and qyss_yu_id = ? and qyss_sh_type = ?`, [id, type]);
        console.log('hdata:', hdata);

        if (hdata && hdata.length > 0) {
            if (hdata[0].qyss_sh_sterm && hdata[0].qyss_sh_sterm !== null) {
                console.log('hdata:', hdata[0].qyss_sh_sterm);
                ctx.body = hdata[0].qyss_sh_sterm;
            } else {
                ctx.body = [];
            }
        } else {
            ctx.body = [];
        }
    })

HistoryRegister.post('/www/userAddHistorySterm',
    async (ctx, next) => {
        console.log('post', ctx.request.fields);
        var { id, name, seltext, active } = ctx.request.fields;
        let _result = { message: "新增搜索记录失败,请重新尝试", type: 'error' };
        let arr = [];
        let udata;
        var hdata = await ctx.db.query(`select * from qyss_yd_search_history where qyss_sh_status = 1 and qyss_yu_id = ? and qyss_sh_type = ?`, [id, active]);
        console.log('hdata:', hdata);
        if (hdata && hdata.length === 0) {
            console.log('123');
            arr.unshift({ label: seltext });
            var sql = `insert into qyss_yd_search_history (qyss_yu_id,qyss_yu_name,qyss_sh_sterm,qyss_sh_type) values (?,?,?,?)`;
            udata = await ctx.db.query(sql, [id, name, JSON.stringify(arr), active]);
        } else {
            console.log('else');
            console.log('hdata:', hdata[0].qyss_sh_sterm);

            if (hdata[0].qyss_sh_sterm !== null) {
                console.log('456');
                arr = JSON.parse(hdata[0].qyss_sh_sterm);
                arr.unshift({ label: seltext });
                console.log('arr:', arr);
                var sql = `update qyss_yd_search_history set qyss_sh_sterm = ? where qyss_yu_id = ? and qyss_sh_type = ?`;
                udata = await ctx.db.query(sql, [JSON.stringify(arr), id, active]);
            }
            if (hdata[0].qyss_sh_sterm === null) {
                console.log('789');
                arr.unshift({ label: seltext });
                console.log('arr:', arr);
                var sql = `update qyss_yd_search_history set qyss_sh_sterm = ? where qyss_yu_id = ? and qyss_sh_type = ?`;
                udata = await ctx.db.query(sql, [JSON.stringify(arr), id, active]);
            }

        }
        if (udata) {
            ctx.body = udata;
        } else {
            ctx.body = _result;
        }
    })

HistoryRegister.get('/www/userDelHistorySterm/:id/:type',
    async (ctx, next) => {
        console.log('/www/userLogin/:', ctx.params);
        var { id, type } = ctx.params;
        let arr = [];
        let _result = { message: "搜索记录删除失败,请重新尝试", type: 'error' };
        var sql = `update qyss_yd_search_history set qyss_sh_sterm = ? where qyss_yu_id = ? and qyss_sh_type = ?`;
        hdata = await ctx.db.query(sql, [null, id, type]);
        if (hdata) {
            ctx.body = hdata;
        } else {
            ctx.body = _result;
        }
    })

module.exports = HistoryRegister.routes();