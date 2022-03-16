const Router = require('koa-router');
const CompanyRegister = new Router();

CompanyRegister.post('/www/getCompanyList',
    async (ctx, next) => {
        console.log('/www/getCompanyList/:', ctx.request.fields);
        var { keyword, userid,labelkey } = ctx.request.fields;
        let arr = [];
        var edata = await ctx.db.query(`select * from kjwl_pc_basic_enterprise where kjwl_e_status = 1 and qyss_e_labelName like '%${labelkey}%' and concat(ifnull(kjwl_e_name,''),ifnull(kjwl_e_lrpeople,''),ifnull(kjwl_e_address,''),ifnull(qyss_e_labelName,'')) like '%${keyword}%'`);
        console.log('edata: ', edata);
        if (edata && edata.length > 0) {
            for (let i = 0; i < edata.length; i++) {
                var cdata = await ctx.db.query(`select * from qyss_yd_collect_enterprise where qyss_ce_status = 1 and kjwl_e_id = ? and kjwl_yu_id = ?`, [edata[i].kjwl_e_id, userid]);
                console.log('cdata:', cdata);
                if (cdata && cdata.length > 0) {
                    edata[i].focus = 1;
                }
                if (cdata && cdata.length <= 0) {
                    edata[i].focus = 0;
                }
                arr.push(edata[i]);
            }
            console.log('arr:', arr);
        }
        if (arr && arr.length > 0) {
            ctx.body = arr;
        } else {
            ctx.body = [];
        }
    })

CompanyRegister.get('/www/getCompanyData/:id/:userid',
    async (ctx, next) => {
        console.log('/www/getCompanyData/:', ctx.params);
        var { id, userid } = ctx.params;
        var edata = await ctx.db.query(`select * from kjwl_pc_basic_enterprise where kjwl_e_status = 1 and kjwl_e_id = ?`, [id]);
        console.log('edata: ', edata);
        if (edata && edata.length > 0) {
            edata[0].qyss_e_labelName = JSON.parse(edata[0].qyss_e_labelName);
            var cdata = await ctx.db.query(`select * from qyss_yd_collect_enterprise where qyss_ce_status = 1 and kjwl_e_id = ? and kjwl_yu_id = ?`, [edata[0].kjwl_e_id, userid]);
            console.log('cdata:', cdata);
            if (cdata && cdata.length > 0) {
                edata[0].focus = 1;
            }
            if (cdata && cdata.length <= 0) {
                edata[0].focus = 0;
            }
        }

        if (edata && edata.length > 0) {
            ctx.body = edata[0];
        } else {
            ctx.body = [];
        }
    })

CompanyRegister.get('/www/getCompanySpecificData/:id',
    async (ctx, next) => {
        console.log('/www/getCompanySpecificData/:', ctx.params);
        var { id } = ctx.params;
        var edata = await ctx.db.query(`select * from kjwl_pc_specific_enterprise where kjwl_e_status = 1 and kjwl_e_id = ?`, [id]);
        console.log('edata: ', edata);
        if (edata && edata.length > 0) {
            ctx.body = edata[0];
        } else {
            ctx.body = [];
        }
    })

CompanyRegister.get('/www/getCompanyCollectPerson/:id/:userid',
    async (ctx, next) => {
        console.log('/www/getCompanyCollectPerson/:', ctx.params);
        var { id, userid } = ctx.params;
        let arr = [];
        var edata = await ctx.db.query(`select * from kjwl_pc_maincharacter where kjwl_ep_status = 1 and kjwl_e_id = ?`, [id]);
        console.log('edata: ', edata);
        if (edata && edata.length > 0) {
            for (let i = 0; i < edata.length; i++) {
                var pdata = await ctx.db.query(`select * from kjwl_pc_basic_person where kjwl_p_status = 1 and kjwl_p_id = ?`, [edata[i].kjwl_p_id]);
                console.log('pdata: ', pdata);
                if (pdata && pdata.length > 0) {
                    var cdata = await ctx.db.query(`select * from qyss_yd_collect_person where qyss_cp_status = 1 and kjwl_p_id = ? and kjwl_yu_id = ?`, [edata[i].kjwl_p_id, userid]);
                    console.log('cdata:', cdata);
                    if (cdata && cdata.length > 0) {
                        pdata[0].focus = 1;
                    }
                    if (cdata && cdata.length <= 0) {
                        pdata[0].focus = 0;
                    }
                    arr.push(pdata[0]);
                }
            }
            console.log('arr:', arr);
        }

        if (arr && arr.length > 0) {
            ctx.body = arr;
        } else {
            ctx.body = [];
        }
    })

CompanyRegister.get('/www/getCompanyCollectNews/:id',
    async (ctx, next) => {
        console.log('/www/getCompanyCollectNews/:', ctx.params);
        var { id } = ctx.params;
        let arr = [];
        var edata = await ctx.db.query(`select * from kjwl_pc_nenterprise where kjwl_ne_status = 1 and kjwl_e_id = ?`, [id]);
        console.log('edata: ', edata);
        if (edata && edata.length > 0) {
            for (let i = 0; i < edata.length; i++) {
                var ndata = await ctx.db.query(`select * from kjwl_pc_basic_news where kjwl_n_status = 1 and kjwl_n_id = ?`, [edata[i].kjwl_n_id]);
                console.log('ndata: ', ndata);
                if (ndata && ndata.length > 0) {
                    arr.push(ndata[0]);
                }
            }
            console.log('arr:', arr);
        }

        if (arr && arr.length > 0) {
            ctx.body = arr;
        } else {
            ctx.body = [];
        }
    })

CompanyRegister.get('/www/getCompanyCollectNews/:id',
    async (ctx, next) => {
        console.log('/www/getCompanyCollectNews/:', ctx.params);
        var { id } = ctx.params;
        let arr = [];
        var edata = await ctx.db.query(`select * from kjwl_pc_nenterprise where kjwl_ne_status = 1 and kjwl_e_id = ?`, [id]);
        console.log('edata: ', edata);
        if (edata && edata.length > 0) {
            for (let i = 0; i < edata.length; i++) {
                var ndata = await ctx.db.query(`select * from kjwl_pc_basic_news where kjwl_n_status = 1 and kjwl_n_id = ?`, [edata[i].kjwl_n_id]);
                console.log('ndata: ', ndata);
                if (ndata && ndata.length > 0) {
                    arr.push(ndata[0]);
                }
            }
            console.log('arr:', arr);
        }

        if (arr && arr.length > 0) {
            ctx.body = arr;
        } else {
            ctx.body = [];
        }
    })

CompanyRegister.get('/www/addCollectCompany/:id/:userid',
    async (ctx, next) => {
        console.log('/www/getCompanyCollectNews/:', ctx.params);
        var { id, userid } = ctx.params;
        let _result = { message: "关注失败,请重新尝试", type: 'error' };
        var sql = `insert into qyss_yd_collect_enterprise (kjwl_yu_id,kjwl_e_id) values (?,?)`;
        var udata = await ctx.db.query(sql, [userid, id]);
        console.log('udata:', udata);
        if (udata) _result.message = '您已成功关注该企业', _result.type = 'success';
        if (_result && _result != {}) {
            ctx.body = _result;
        } else {
            ctx.body = [];
        }
    })

CompanyRegister.get('/www/getIntroductionData/:id',
    async (ctx, next) => {
        console.log('/www/getIntroductionData/:', ctx.params);
        let arr = {};
        var { id } = ctx.params;
        var edata = await ctx.db.query(`select * from kjwl_pc_basic_enterprise where kjwl_e_status = 1 and kjwl_e_id = ?`, [id]);
        var esdata = await ctx.db.query(`select * from kjwl_pc_specific_enterprise where kjwl_e_status = 1 and kjwl_e_id = ?`, [id]);
        if(edata && edata.length > 0 && esdata && esdata.length > 0){
            arr = {
                ...edata[0],
                ...esdata[0],
            }
        }
        console.log('arr: ', arr,arr.length);
        if (arr) {
            ctx.body = arr;
        } else {
            ctx.body = {};
        }
    })

module.exports = CompanyRegister.routes();