const Router = require('koa-router');
const BossRegister = new Router();

BossRegister.post('/www/getPersonList',
    async (ctx, next) => {
        console.log('/www/getPersonList/:', ctx.request.fields);
        var { keyword, userid,labelkey } = ctx.request.fields;
        let arr = [];

        var pdata = await ctx.db.query(`select * from kjwl_pc_basic_person where kjwl_p_status = 1 and qyss_p_labelName like '%${labelkey}%' and concat(ifnull(kjwl_p_name,''),ifnull(kjwl_p_position,''),ifnull(kjwl_p_enterprise,''),ifnull(qyss_p_labelName,'')) like '%${keyword}%'`);
        console.log('pdata: ', pdata);
        if (pdata && pdata.length > 0) {
            for (let i = 0; i < pdata.length; i++) {
                var cdata = await ctx.db.query(`select * from qyss_yd_collect_person where qyss_cp_status = 1 and kjwl_p_id = ? and kjwl_yu_id = ?`, [pdata[i].kjwl_p_id, userid]);
                console.log('cdata:', cdata);
                if (cdata && cdata.length > 0) {
                    pdata[i].focus = 1;
                }
                if (cdata && cdata.length <= 0) {
                    pdata[i].focus = 0;
                }
                var edata = await ctx.db.query(`select * from kjwl_pc_maincharacter where kjwl_ep_status = 1 and kjwl_p_id = ?`, [pdata[i].kjwl_p_id]);
                console.log('edata: ', edata);
                if (edata && edata.length > 0) {
                    // pdata[i].company = edata;
                    let company = [];
                    pdata[i].companyNumber = edata.length;
                    for (j = 0; j < edata.length; j++) {
                        console.log('j:', edata[j].kjwl_e_id);
                        var data = await ctx.db.query(`select * from kjwl_pc_basic_enterprise where  kjwl_e_status = 1 and kjwl_e_id = ? order by kjwl_e_setdate desc`, [edata[j].kjwl_e_id]);
                        console.log('data: ', data);
                        company.push(data[0]);
                        console.log('company: ', company);
                    }
                    pdata[i].company = company;
                }
                if (edata && edata.length <= 0) {
                    pdata[i].company = [];
                    pdata[i].companyNumber = edata.length;
                }

                arr.push(pdata[i]);
            }
            console.log('arr:', arr);
        }
        if (arr && arr.length > 0) {
            ctx.body = arr;
        } else {
            ctx.body = [];
        }
    })

BossRegister.get('/www/getPersonData/:id/:userid',
    async (ctx, next) => {
        console.log('/www/getPersonData/:', ctx.params);
        var { id, userid } = ctx.params;
        var pdata = await ctx.db.query(`select * from kjwl_pc_basic_person where kjwl_p_status = 1 and kjwl_p_id = ?`, [id]);
        console.log('pdata: ', pdata);
        if (pdata && pdata.length > 0) {
            var psdata = await ctx.db.query(`select * from kjwl_pc_specific_person where kjwl_p_status = 1 and kjwl_p_id = ?`, [id]);
            console.log('psdata: ', psdata);
            pdata[0] = {
                ...pdata[0],
                ...psdata[0],
            }
            var cdata = await ctx.db.query(`select * from qyss_yd_collect_person where qyss_cp_status = 1 and kjwl_p_id = ? and kjwl_yu_id = ?`, [pdata[0].kjwl_p_id, userid]);
            console.log('cdata:', cdata);
            if (cdata && cdata.length > 0) {
                pdata[0].focus = 1;
            }
            if (cdata && cdata.length <= 0) {
                pdata[0].focus = 0;
            }
            var edata = await ctx.db.query(`select * from kjwl_pc_maincharacter where kjwl_ep_status = 1 and kjwl_p_id = ?`, [pdata[0].kjwl_p_id]);
            console.log('edata: ', edata);
            if (edata && edata.length > 0) {
                let company = [];
                for (j = 0; j < edata.length; j++) {
                    console.log('j:', edata[j].kjwl_e_id);
                    var data = await ctx.db.query(`select * from kjwl_pc_basic_enterprise where  kjwl_e_status = 1 and kjwl_e_id = ? order by kjwl_e_setdate desc`, [edata[j].kjwl_e_id]);
                    console.log('data: ', data);
                    var cedata = await ctx.db.query(`select * from qyss_yd_collect_enterprise where qyss_ce_status = 1 and kjwl_e_id = ? and kjwl_yu_id = ?`, [edata[j].kjwl_e_id, userid]);
                    console.log('cedata:', cedata);
                    if (cedata && cedata.length > 0) {
                        data[0].focus = 1;
                    }
                    if (cedata && cedata.length <= 0) {
                        data[0].focus = 0;
                    }
                    company.push(data[0]);
                    console.log('company: ', company);
                }
                pdata[0].company = company;
            }
            if (edata && edata.length <= 0) {
                pdata[0].company = [];
            }
        }

        if (pdata && pdata.length > 0) {
            ctx.body = pdata[0];
        } else {
            ctx.body = [];
        }
    })

BossRegister.get('/www/getPersonCollectNews/:id',
    async (ctx, next) => {
        console.log('/www/getPersonCollectNews/:', ctx.params);
        var { id } = ctx.params;
        let arr = [];
        var pdata = await ctx.db.query(`select * from kjwl_pc_nperson where kjwl_np_status = 1 and kjwl_p_id = ?`, [id]);
        console.log('pdata: ', pdata);
        if (pdata && pdata.length > 0) {
            for (let i = 0; i < pdata.length; i++) {
                var ndata = await ctx.db.query(`select * from kjwl_pc_basic_news where kjwl_n_status = 1 and kjwl_n_id = ?`, [pdata[i].kjwl_n_id]);
                ndata[0].qyss_n_labelName = JSON.parse(ndata[0].qyss_n_labelName);
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

BossRegister.get('/www/getPersonCollectPerson/:id',
    async (ctx, next) => {
        console.log('/www/getPersonCollectPerson/:', ctx.params);
        var { id } = ctx.params;
        let arr = [];
        let person = [];
        var pdata = await ctx.db.query(`select * from kjwl_pc_maincharacter where kjwl_ep_status = 1 and kjwl_p_id = ?`, [id]);
        console.log('pdata: ', pdata);
        if (pdata && pdata.length > 0) {
            for (let i = 0; i < pdata.length; i++) {
                var epdata = await ctx.db.query(`select * from kjwl_pc_maincharacter where kjwl_ep_status = 1 and kjwl_e_id = ?`, [pdata[i].kjwl_e_id]);
                console.log('epdata: ', epdata);
                if (epdata && epdata.length > 0) {
                    for (let j = 0; j < epdata.length; j++) {
                        console.log('epdata[j].kjwl_p_id: ', epdata[j].kjwl_p_id);

                        if (epdata[j].kjwl_p_id !== Number(id)) {
                            var ppdata = await ctx.db.query(`select * from kjwl_pc_basic_person where kjwl_p_status = 1 and kjwl_p_id = ?`, [epdata[j].kjwl_p_id]);
                            console.log('ppdata: ', ppdata);
                            var pedata = await ctx.db.query(`select * from kjwl_pc_maincharacter where kjwl_ep_status = 1 and kjwl_p_id = ?`, [epdata[j].kjwl_p_id]);
                            console.log('pedata: ', pedata);
                            if (ppdata && ppdata.length > 0) {
                                if (pedata && pedata.length > 0) {
                                    ppdata[0].companyNum = pedata.length;
                                } else {
                                    ppdata[0].companyNum = 0;
                                }
                                console.log('ppdata: ', ppdata);
                                arr.push(ppdata[0]);
                            }
                        }
                    }
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

BossRegister.get('/www/addCollectPerson/:id/:userid',
    async (ctx, next) => {
        console.log('/www/addCollectPerson/:', ctx.params);
        var { id, userid } = ctx.params;
        let _result = { message: "关注失败,请重新尝试", type: 'error' };
        var sql = `insert into qyss_yd_collect_person (kjwl_yu_id,kjwl_p_id) values (?,?)`;
        var udata = await ctx.db.query(sql, [userid, id]);
        console.log('udata:', udata);
        if (udata) _result.message = '您已成功关注该人员', _result.type = 'success';
        if (_result && _result != {}) {
            ctx.body = _result;
        } else {
            ctx.body = [];
        }
    })

module.exports = BossRegister.routes();