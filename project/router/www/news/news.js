const Router = require('koa-router');
const NewsRegister = new Router();
var utils = require("../home/utils");
var utilsIndex = require("../../../utils/index");


NewsRegister.post('/www/getNewsList',
    async (ctx, next) => {
        console.log('/www/getNewsKeywordList', ctx.request.fields);
        var { keyword, attitudeKey } = ctx.request.fields;
        var ndata = await ctx.db.query(`select * from kjwl_pc_basic_news where  kjwl_n_status = 1 and qyss_n_positive like '${attitudeKey}%' order by kjwl_n_rdatetime desc`);
        // console.log('ndata:', ndata);
        if (ndata && ndata.length > 0) {
            ctx.body = ndata;
        } else {
            ctx.body = [];
        }
    })

NewsRegister.post('/www/getNewsKeywordList',
    async (ctx, next) => {
        console.log('/www/getNewsKeywordList', ctx.request.fields);
        var { keyword, attitudeKey } = ctx.request.fields;
        var ndata = await ctx.db.query(`select * from kjwl_pc_basic_news where kjwl_n_status = 1 and concat(ifnull(kjwl_n_name,''),ifnull(kjwl_n_source,''),ifnull(qyss_n_labelName,'')) like '%${keyword}%' and qyss_n_positive like '${attitudeKey}%' order by kjwl_n_rdatetime desc`);
        if (ndata && ndata.length > 0) {
            ctx.body = ndata;
        } else {
            ctx.body = [];
        }
    })

NewsRegister.get('/www/getNewsData/:id',
    async (ctx, next) => {
        console.log('/www/userLogin/:', ctx.params);
        var { id } = ctx.params;
        var ndata = await ctx.db.query(`select * from kjwl_pc_basic_news where  kjwl_n_status = 1 and kjwl_n_id = ?`, [id]);
        if (ndata && ndata.length > 0) {
            ctx.body = ndata[0];
        } else {
            ctx.body = [];
        }
    })

NewsRegister.get('/www/getNewsCompanyList/:id/:userid',
    async (ctx, next) => {
        console.log('/www/getNewsCompanyList/:', ctx.params);
        let arr = [];
        var { id, userid } = ctx.params;
        var ndata = await ctx.db.query(`select * from kjwl_pc_nenterprise where  kjwl_ne_status = 1 and kjwl_n_id = ?`, [id]);
        // console.log('ndatae:', ndata);
        if (ndata && ndata.length > 0) {
            for (let i = 0; i < ndata.length; i++) {
                // console.log('ic', ndata[i].kjwl_e_id);
                var edata = await ctx.db.query(`select * from kjwl_pc_basic_enterprise where kjwl_e_status = 1 and kjwl_e_id = ?`, [ndata[i].kjwl_e_id]);
                // console.log('edata:', edata);
                if (edata && edata.length > 0) {
                    var cdata = await ctx.db.query(`select * from qyss_yd_collect_enterprise where qyss_ce_status = 1 and kjwl_e_id = ? and kjwl_yu_id = ?`, [ndata[i].kjwl_e_id, userid]);
                    // console.log('cdata:', cdata);
                    if (cdata && cdata.length > 0) {
                        edata[0].focus = 1;
                    }
                    if (cdata && cdata.length <= 0) {
                        edata[0].focus = 0;
                    }
                    arr.push(edata[0]);
                    // console.log('arr:', arr);
                }
            }
        }
        if (arr && arr.length > 0) {
            ctx.body = arr;
        } else {
            ctx.body = [];
        }
    })

NewsRegister.get('/www/getNewsPersonalList/:id/:userid',
    async (ctx, next) => {
        console.log('/www/getNewsPersonalList/:', ctx.params);
        let arr = [];
        var { id, userid } = ctx.params;
        var ndata = await ctx.db.query(`select * from kjwl_pc_nperson where  kjwl_np_status = 1 and kjwl_n_id = ?`, [id]);
        // console.log('ndatap:', ndata);
        if (ndata && ndata.length > 0) {
            for (let i = 0; i < ndata.length; i++) {
                // console.log('ip', ndata[i].kjwl_p_id);
                var pdata = await ctx.db.query(`select * from kjwl_pc_basic_person where  kjwl_p_status = 1 and kjwl_p_id = ?`, [ndata[i].kjwl_p_id]);
                // console.log('pdata:', pdata);
                if (pdata && pdata.length > 0) {
                    var cdata = await ctx.db.query(`select * from qyss_yd_collect_person where qyss_cp_status = 1 and kjwl_p_id = ? and kjwl_yu_id = ?`, [ndata[i].kjwl_p_id, userid]);
                    // console.log('cdata:', cdata);
                    if (cdata && cdata.length > 0) {
                        pdata[0].focus = 1;
                    }
                    if (cdata && cdata.length <= 0) {
                        pdata[0].focus = 0;
                    }
                    arr.push(pdata[0]);
                    // console.log('arr:', arr);
                }
            }
        }
        if (arr && arr.length > 0) {
            ctx.body = arr;
        } else {
            ctx.body = [];
        }
    })

NewsRegister.get('/www/addNewsClickNum/:id',
    async (ctx, next) => {
        console.log('/www/addNewsClickNum/:', ctx.params);
        var { id } = ctx.params;
        let _result = { message: "点击量新增失败,请重新尝试", type: 'error' };
        var sql = `update kjwl_pc_basic_news set kjwl_n_onedata = kjwl_n_onedata + 1,kjwl_n_clickNum = kjwl_n_clickNum + 1,kjwl_n_hitSum = kjwl_n_hitSum + 1 where kjwl_n_id = ?`;
        var ndata = await ctx.db.query(sql, [id]);
        if (ndata) _result.message = '该新闻点击量新增成功', _result.type = 'success';
        if (_result && _result != {}) {
            ctx.body = _result;
        } else {
            ctx.body = [];
        }
    })

NewsRegister.get('/www/addNewsClick',
    async (ctx, next) => {
        console.log('/www/addNewsClick/:', ctx.params);
        var { id } = ctx.params;
        let _result = { message: "点击量新增失败,请重新尝试", type: 'error' };
        var ndata = await ctx.db.query(`select * from kjwl_pc_basic_news where kjwl_n_status = 1`);
        const res = utilsIndex.showMillisecondTime(utilsIndex.showTime(new Date()));
        const startTime = utilsIndex.showMillisecondTime('00:00');
        const endTime = utilsIndex.showMillisecondTime('00:10');
        console.log('res:', res);
        console.log('startTime:', startTime);
        console.log('endTime:', endTime);
        for (let i = 0; i < ndata.length; i++) {
            if (res >= startTime && res <= endTime && ndata[i].kjwl_n_clickFlag === 1) {
                for (let j = 7; j >= 1; j--) {
                    if (j === 1) {
                        // console.log('utils.dataNameList123:', j, utils.dataNameList[j]);
                        var sql1 = `update kjwl_pc_basic_news set ${utils.dataNameList[j]} = 0,kjwl_n_clickFlag = 0,kjwl_n_clickNum = 0 where kjwl_n_id = ?`;
                        var ndata1 = await ctx.db.query(sql1, [ndata[i].kjwl_n_id]);
                    }
                    else {
                        // console.log('utils.dataNameList456456:', j, utils.dataNameList[j]);
                        var sql2 = `update kjwl_pc_basic_news set ${utils.dataNameList[j]} = ${ndata[i][utils.dataNameList[j - 1]]} where kjwl_n_id = ?`;
                        var ndata2 = await ctx.db.query(sql2, [ndata[i].kjwl_n_id]);
                    }
                }
            } 
            if(res > endTime){
                var sql1 = `update kjwl_pc_basic_news set ${utils.dataNameList[1]} = ${ndata[i].kjwl_n_clickNum},kjwl_n_clickFlag = 1 where kjwl_n_id = ?`;
                var ndata1 = await ctx.db.query(sql1, [ndata[i].kjwl_n_id]);
            }
        }
        if (ndata1) _result.message = '该新闻点击量新增成功', _result.type = 'success';
        if (_result && _result != {}) {
            ctx.body = _result;
        } else {
            ctx.body = [];
        }
    })

NewsRegister.get('/www/editNewsClick',
    async (ctx, next) => {
        console.log('/www/editNewsClick/:', ctx.params);
        let _result = { message: "点击量新增失败,请重新尝试", type: 'error' };
        var ndata = await ctx.db.query(`select * from kjwl_pc_basic_news where kjwl_n_status = 1`);
        // console.log('ndata:', ndata);
        for (let i = 0; i < ndata.length; i++) {
            let res = 0;
            for (let j = 7; j >= 1; j--) {
                // console.log('utils.dataNameList:', j, utils.dataNameList[j]);
                res += ndata[i][utils.dataNameList[j]];
                // console.log('res:', res);
                var sql1 = `update kjwl_pc_basic_news set kjwl_n_click = ${res} where kjwl_n_id = ?`;
                var ndata1 = await ctx.db.query(sql1, [ndata[i].kjwl_n_id]);
            }
        }
        // console.log('ndata:', ndata);
        if (ndata1) _result.message = '该新闻点击量新增成功', _result.type = 'success';
        if (_result && _result != {}) {
            ctx.body = _result;
        } else {
            ctx.body = [];
        }
    })


module.exports = NewsRegister.routes();