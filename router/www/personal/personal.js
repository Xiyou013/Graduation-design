const Router = require('koa-router');
const PersonalRegister = new Router();

PersonalRegister.get('/www/getUserdata/:id/:account',
    async (ctx, next) => {
        console.log('/www/getUserdata/:', ctx.params);
        var { id, account } = ctx.params;
        var hdata = await ctx.db.query(`select * from kjwl_yd_user where kjwl_yu_status = 1 and kjwl_yu_id = ? and kjwl_yu_account = ?`, [id, account]);
        // console.log('hdata:', hdata);
        if (hdata && hdata.length > 0) {
            ctx.body = hdata[0];
        } else {
            ctx.body = [];
        }
    })

PersonalRegister.post('/www/AddUserFeedback',
    async (ctx, next) => {
        console.log('post', ctx.request.fields);
        var { id, phone, content,companyId,personId, } = ctx.request.fields;
        let _result = { message: "反馈上传失败,请重新输入", type: 'error' };
        var sql = `insert into qyss_yd_user_feedback (qyss_uf_id,qyss_uf_phone,qyss_uf_content,kjwl_e_id,kjwl_p_id) values (?,?,?,?,?)`;
        var udata = await ctx.db.query(sql, [id, phone, content,companyId,personId]);
        // console.log('udata:', udata);
        if (udata) _result.message = '您的反馈已上传成功，请等待工作人员审核', _result.type = 'success';
        if (_result && _result != {}) {
            ctx.body = _result;
        } else {
            ctx.body = [];
        }
    })

PersonalRegister.post('/www/EditUserPortrait',
    async (ctx, next) => {
        console.log('/www/EditUserPortrait/:', ctx.request.fields);
        var { id, imageUrl } = ctx.request.fields;
        let _result = { message: "头像上传失败,请重新输入", type: 'error' };
        var sql = `update kjwl_yd_user set kjwl_yu_portrait = ? where kjwl_yu_id = ?`;
        var udata = await ctx.db.query(sql, [imageUrl, id]);
        // console.log('udata:', udata);
        if (udata) _result.message = '您的头像已上传成功', _result.type = 'success';
        if (_result && _result != {}) {
            ctx.body = _result;
        } else {
            ctx.body = [];
        }
    })

PersonalRegister.post('/www/EditUserSignature',
    async (ctx, next) => {
        console.log('/www/EditUserSignature/:', ctx.request.fields);
        var { id, signature } = ctx.request.fields;
        let _result = { message: "名片上传失败,请重新输入", type: 'error' };
        var sql = `update kjwl_yd_user set kjwl_yu_signature = ? where kjwl_yu_id = ?`;
        var udata = await ctx.db.query(sql, [signature, id]);
        // console.log('udata:', udata);
        if (udata) _result.message = '您的名片已上传成功', _result.type = 'success';
        if (_result && _result != {}) {
            ctx.body = _result;
        } else {
            ctx.body = [];
        }
    })

PersonalRegister.post('/www/EditUserEmail',
    async (ctx, next) => {
        console.log('/www/EditUserEmail/:', ctx.request.fields);
        var { id, email } = ctx.request.fields;
        let _result = { message: "邮箱上传失败,请重新输入", type: 'error' };
        var sql = `update kjwl_yd_user set kjwl_yu_email = ? where kjwl_yu_id = ?`;
        var udata = await ctx.db.query(sql, [email, id]);
        // console.log('udata:', udata);
        if (udata) _result.message = '您的邮箱已上传成功', _result.type = 'success';
        if (_result && _result != {}) {
            ctx.body = _result;
        } else {
            ctx.body = [];
        }
    })

PersonalRegister.post('/www/EditUserPhone',
    async (ctx, next) => {
        console.log('/www/EditUserPhone/:', ctx.request.fields);
        var { id, phone } = ctx.request.fields;
        let _result = { message: "手机号码上传失败,请重新输入", type: 'error' };
        var sql = `update kjwl_yd_user set kjwl_yu_phone = ? where kjwl_yu_id = ?`;
        var udata = await ctx.db.query(sql, [phone, id]);
        // console.log('udata:', udata);
        if (udata) _result.message = '您的手机号码已上传成功', _result.type = 'success';
        if (_result && _result != {}) {
            ctx.body = _result;
        } else {
            ctx.body = [];
        }
    })

PersonalRegister.post('/www/EditUserName',
    async (ctx, next) => {
        console.log('/www/EditUserName/:', ctx.request.fields);
        var { id, name } = ctx.request.fields;
        let _result = { message: "昵称修改失败,请重新输入", type: 'error' };
        var sql = `update kjwl_yd_user set kjwl_yu_name = ? where kjwl_yu_id = ?`;
        var udata = await ctx.db.query(sql, [name, id]);
        // console.log('udata:', udata);
        if (udata) _result.message = '您的昵称已修改成功', _result.type = 'success';
        if (_result && _result != {}) {
            ctx.body = _result;
        } else {
            ctx.body = [];
        }
    })

PersonalRegister.get('/www/EditUserAccountStatus/:id',
    async (ctx, next) => {
        console.log('/www/EditUserAccountStatus/:', ctx.params);
        let _result = { message: "账号注销失败,请重新输入", type: 'error' };
        var { id } = ctx.params;
        var sql = `update kjwl_yd_user set kjwl_yu_status = 0 where kjwl_yu_id = ?`;
        var hdata = await ctx.db.query(sql, [id]);
        // console.log('hdata:', hdata);
        if (hdata) _result.message = '您的账号已注销成功', _result.type = 'success';
        if (_result && _result != {}) {
            ctx.body = _result;
        } else {
            ctx.body = [];
        }
    })

PersonalRegister.get('/www/getCollectCompanyList/:id',
    async (ctx, next) => {
        console.log('/www/getCollectCompanyList/:', ctx.params);
        var { id } = ctx.params;
        let arr = [];
        var pedata = await ctx.db.query(`select * from qyss_yd_collect_enterprise where qyss_ce_status = 1 and kjwl_yu_id = ?`, [id]);
        // console.log('pedata: ', pedata);
        if (pedata && pedata.length > 0) {
            for (var i = 0; i < pedata.length; i++) {
                var edata = await ctx.db.query(`select * from kjwl_pc_basic_enterprise where kjwl_e_status = 1 and kjwl_e_id = ?`, [pedata[i].kjwl_e_id]);
                if (edata && edata.length > 0) {
                    edata[0].focus = 1;
                }
                arr.push(edata[0]);
            }
            // console.log('arr: ', arr);
        }
        if (arr && arr.length > 0) {
            ctx.body = arr;
        } else {
            ctx.body = [];
        }
    })

PersonalRegister.get('/www/getCollectPersonList/:id',
    async (ctx, next) => {
        console.log('/www/getCollectPersonList/:', ctx.params);
        var { id } = ctx.params;
        let arr = [];
        var ppdata = await ctx.db.query(`select * from qyss_yd_collect_person where qyss_cp_status = 1 and kjwl_yu_id = ?`, [id]);
        // console.log('ppdata: ', ppdata);
        if (ppdata && ppdata.length > 0) {
            for (var i = 0; i < ppdata.length; i++) {
                var pdata = await ctx.db.query(`select * from kjwl_pc_basic_person where kjwl_p_status = 1 and kjwl_p_id = ?`, [ppdata[i].kjwl_p_id]);
                if (pdata && pdata.length > 0) {
                    pdata[0].focus = 1;
                    // console.log('pdata: ', pdata);
                    var edata = await ctx.db.query(`select * from kjwl_pc_maincharacter where kjwl_ep_status = 1 and kjwl_p_id = ?`, [pdata[0].kjwl_p_id]);
                    // console.log('edata: ', edata);
                    if (edata && edata.length > 0) {
                        // pdata[i].company = edata;
                        let company = [];
                        pdata[0].companyNumber = edata.length;
                        for (j = 0; j < edata.length; j++) {
                            // console.log('j:', edata[j].kjwl_e_id);
                            var data = await ctx.db.query(`select * from kjwl_pc_basic_enterprise where  kjwl_e_status = 1 and kjwl_e_id = ? order by kjwl_e_setdate desc`, [edata[j].kjwl_e_id]);
                            // console.log('data: ', data);
                            company.push(data[0]);
                            // console.log('company: ', company);
                        }
                        pdata[0].company = company;
                    }
                    if (edata && edata.length <= 0) {
                        pdata[0].company = [];
                        pdata[0].companyNumber = edata.length;
                    }
                    arr.push(pdata[0]);
                }
            }
            // console.log('arr: ', arr);
        }
        if (arr && arr.length > 0) {
            ctx.body = arr;
        } else {
            ctx.body = [];
        }
    })

PersonalRegister.get('/www/delCollectPerson/:id/:userid',
    async (ctx, next) => {
        console.log('/www/delCollectPerson/:', ctx.params);
        let _result = { message: "取消关注失败,请重新尝试", type: 'error' };
        var { id, userid } = ctx.params;
        var sql = `delete from qyss_yd_collect_person where kjwl_yu_id = ? and kjwl_p_id = ?`;
        var hdata = await ctx.db.query(sql, [userid, id]);
        // console.log('hdata:', hdata);
        if (hdata) _result.message = '您已成功取消关注', _result.type = 'success';
        if (_result && _result != {}) {
            ctx.body = _result;
        } else {
            ctx.body = [];
        }
    })

PersonalRegister.get('/www/delCollectCompany/:id/:userid',
    async (ctx, next) => {
        console.log('/www/delCollectCompany/:', ctx.params);
        let _result = { message: "取消关注失败,请重新尝试", type: 'error' };
        var { id, userid } = ctx.params;
        var sql = `delete from qyss_yd_collect_enterprise where kjwl_yu_id = ? and kjwl_e_id = ?`;
        var hdata = await ctx.db.query(sql, [userid, id]);
        // console.log('hdata:', hdata);
        if (hdata) _result.message = '您已成功取消关注', _result.type = 'success';
        if (_result && _result != {}) {
            ctx.body = _result;
        } else {
            ctx.body = [];
        }
    })

module.exports = PersonalRegister.routes();