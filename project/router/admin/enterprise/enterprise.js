const Router = require('koa-router');
const Enterprise = new Router();
const numType = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
}

//企业信息总览，逆序排列
Enterprise.get('/admin/enterprisesel', async (ctx, next) => {
    var edata = await ctx.db.query(`select * from kjwl_pc_basic_enterprise where  kjwl_e_status = 1 order by kjwl_e_datetime desc`);
    if (edata) {
        ctx.body = edata;
    } else {
        ctx.body = '该用户无数据';
    }
})

//关键字模糊搜索，根据企业名称，法定代表人，成立日期，以及企业标签进行定位搜索
Enterprise.post('/admin/enterprise/select', async (ctx, next) => {
    console.log('post', ctx.request.fields);
    const { name, penson, datetime, array } = ctx.request.fields;
    // var { name } = ctx.params;
    var edata = await ctx.db.query(`select * from kjwl_pc_basic_enterprise where  kjwl_e_status = 1 and kjwl_e_name like '%${name}%' and kjwl_e_lrpeople like '%${penson}%' and kjwl_e_setdate like '%${datetime}%' and qyss_e_labelName like '%${array}%' order by kjwl_e_setdate desc`);
    // console.log('edata:',edata);
    if (edata) {
        ctx.body = edata;
    } else {
        ctx.body = '该用户无数据';
    }
})

//根据id查询企业信息
Enterprise.get('/admin/enterprise/selectId/:id', async (ctx, next) => {
    console.log('get:', ctx.params);
    var { id } = ctx.params;
    var edata = await ctx.db.query(`select * from kjwl_pc_basic_enterprise where  kjwl_e_status = 1 and kjwl_e_id = ${id}`);
    if (edata) {
        ctx.body = edata;
    } else {
        ctx.body = '该用户无数据';
    }
})

//校验统一社会信用代码、纳税人识别号、工商注册号、组织机构代码、进出口企业代码的唯一性
Enterprise.post('/admin/enterpriseadd/check', async (ctx, next) => {
    console.log('post111', ctx.request.fields);
    const { value, digital } = ctx.request.fields;
    const num = digital;
    let edata = '';
    if (num === numType.one && value !== '') edata = await ctx.db.query(`select * from kjwl_pc_specific_enterprise where  kjwl_e_status = 1 and kjwl_e_utscc = ?`, [value]);
    if (num === numType.two && value !== '') edata = await ctx.db.query(`select * from kjwl_pc_specific_enterprise where  kjwl_e_status = 1 and kjwl_e_taxpayernum = ?`, [value]);
    if (num === numType.three && value !== '') edata = await ctx.db.query(`select * from kjwl_pc_specific_enterprise where  kjwl_e_status = 1 and kjwl_e_bregnum = ?`, [value]);
    if (num === numType.four && value !== '') edata = await ctx.db.query(`select * from kjwl_pc_specific_enterprise where  kjwl_e_status = 1 and kjwl_e_orgcode = ?`, [value]);
    if (num === numType.five && value !== '') edata = await ctx.db.query(`select * from kjwl_pc_specific_enterprise where  kjwl_e_status = 1 and kjwl_e_iaeecode = ?`, [value]);
    console.log('edata:', edata);
    if (edata.length > 0) {
        ctx.body = { num: num, type: true };
    } else {
        ctx.body = { num: num, type: false };
    }
})

//新增企业信息
Enterprise.post('/admin/enterpriseadd',
    async (ctx, next) => {
        console.log('post', ctx.request.fields);
        let _result = '';
        let esdata = '';
        let epdata = '';
        let img = 'http://localhost:8000/暂无图片(2).png';

        const { companyInformation, elabel, array, str1, str2, imageUrl, personInfromation } = ctx.request.fields;
        const { companyName, lrpeople, lrpeopleId, setDate, regcapital, concapital, companyType, ginsengnum, staffnum, utscc, taxpayernum, bregnum, taxpayerqua, orgcode, iaeecode, ename, fname, industry, businessterm, regauthority, approvaldate, phone, website, email, address } = companyInformation;

        if (imageUrl !== '') {
            img = imageUrl;
        }

        var sql = `insert into kjwl_pc_basic_enterprise
        (kjwl_e_portrait,kjwl_e_name,kjwl_e_lrpeople,kjwl_p_id,kjwl_e_setdate,kjwl_e_regcapital,kjwl_e_phone,kjwl_e_website,kjwl_e_email,kjwl_e_address,qyss_e_labelName,qyss_e_labelPath) values (?,?,?,?,?,?,?,?,?,?,?,?)`;
        var edata = await ctx.db.query(sql, [img, companyName, lrpeople, lrpeopleId, setDate, regcapital, phone, website, email, address, array, elabel,]);

        if (edata && edata.insertId) {
            personInfromation.forEach(async (item) => {
                console.log('item:', item)
                console.log('item:', item.kjwl_p_id)
                let sql3 = `insert into kjwl_pc_maincharacter (kjwl_e_id,kjwl_p_id) values (?,?)`;
                epdata = await ctx.db.query(sql3, [edata.insertId, item.kjwl_p_id])
            })
            let sql2 = `insert into kjwl_pc_specific_enterprise (kjwl_e_id,kjwl_e_type,kjwl_e_ename,kjwl_e_fname,kjwl_e_concapital,kjwl_e_ginsengnum,kjwl_e_staffnum,kjwl_e_utscc,kjwl_e_taxpayernum,kjwl_e_bregnum,kjwl_e_taxpayerqua,kjwl_e_orgcode,kjwl_e_iaeecode,kjwl_e_industry,kjwl_e_businessterm,kjwl_e_regauthority,kjwl_e_approvaldate,kjwl_e_businessscope,kjwl_e_resume) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            esdata = await ctx.db.query(sql2, [edata.insertId, companyType, ename, fname, concapital, ginsengnum, staffnum, utscc, taxpayernum, bregnum, taxpayerqua, orgcode, iaeecode, industry, businessterm, regauthority, approvaldate, str1, str2]);
            _result = { status: 1, 'msg': '添加成功', data: '' };
        } else {
            _result = { status: 0, 'msg': '添加失败', data: '' };
        }
        console.log('_result:', _result)
        ctx.body = _result;
    })

//图片上传，第一步上传，获取图片路径；第二部，保存时，将图片路径存入数据库中
Enterprise.post('/admin/enterprise/imguplond',
    async (ctx, next) => {
        console.log('post', ctx.request.fields);
        const { file } = ctx.request.fields;
        let arr = file[0].path.split('\\');
        let str = ['http://localhost:8000/'];
        str.push(arr[4]);
        let res = str.join('');
        console.log(res)
        // var sql = `insert into imgtest
        // (url) values (?)`;
        // var pdata = await ctx.db.query(sql, [res]);
        ctx.body = res;
    })

//查询企业详情信息
Enterprise.get('/admin/enterprisedetails/:id', async (ctx, next) => {
    console.log('get:', ctx.params);
    const { id } = ctx.params;
    let obj = {};
    let edata = await ctx.db.query(`select * from kjwl_pc_basic_enterprise where kjwl_e_id = ?`, [id]);
    obj['edata'] = edata[0];
    let esdata = await ctx.db.query(`select * from kjwl_pc_specific_enterprise where kjwl_e_id = ?`, [id]);
    obj['esdata'] = esdata[0];
    let epdata = await ctx.db.query(`select * from kjwl_pc_maincharacter where kjwl_ep_status = 1 and kjwl_e_id = ?`, [id]);
    obj['epdata'] = epdata;
    if (edata && esdata && epdata) {
        ctx.body = obj;
    } else {
        ctx.body = '该用户无数据';
    }
})

//编辑企业信息
Enterprise.post('/admin/enterpriseeditor',
    async (ctx, next) => {
        console.log('post', ctx.request.fields);
        let _result = '';
        let esdata = '';
        let epdata = '';
        let img = 'http://localhost:8000/暂无图片(2).png';

        const { companyInformation, elabel, array, str1, str2, imageUrl, personInfromation, id } = ctx.request.fields;
        const { companyName, lrpeople, lrpeopleId, setDate, regcapital, concapital, companyType, ginsengnum, staffnum, utscc, taxpayernum, bregnum, taxpayerqua, orgcode, iaeecode, ename, fname, industry, businessterm, regauthority, approvaldate, phone, website, email, address, } = companyInformation;

        if (imageUrl !== '') {
            img = imageUrl;
        }

        var sql = `update kjwl_pc_basic_enterprise set kjwl_e_portrait = ?,kjwl_e_name = ?,kjwl_e_lrpeople = ?,kjwl_p_id = ?,kjwl_e_setdate = ?,kjwl_e_regcapital = ?,kjwl_e_phone = ?,kjwl_e_website = ?,kjwl_e_email = ?,kjwl_e_address = ?,qyss_e_labelName = ?,qyss_e_labelPath = ?
        where kjwl_e_id = ?`;
        let edata = await ctx.db.query(sql, [img, companyName, lrpeople, lrpeopleId, setDate, regcapital, phone, website, email, address, array, elabel, id]);
        if (edata) {
            var sql1 = `update kjwl_pc_specific_enterprise set kjwl_e_type = ?,kjwl_e_ename = ?,kjwl_e_fname = ?,kjwl_e_concapital = ?,kjwl_e_ginsengnum = ?,kjwl_e_staffnum = ?,kjwl_e_utscc = ?,kjwl_e_taxpayernum = ?,kjwl_e_bregnum = ?,kjwl_e_taxpayerqua = ?,kjwl_e_orgcode = ?,kjwl_e_iaeecode = ?,kjwl_e_industry = ?,kjwl_e_businessterm = ?,kjwl_e_regauthority = ?,kjwl_e_approvaldate = ?,kjwl_e_businessscope = ?,kjwl_e_resume = ?
        where kjwl_e_id = ?`;
            esdata = await ctx.db.query(sql1, [companyType, ename, fname, concapital, ginsengnum, staffnum, utscc, taxpayernum, bregnum, taxpayerqua, orgcode, iaeecode, industry, businessterm, regauthority, approvaldate, str1, str2, id]);

            deldata1 = await ctx.db.query(`update kjwl_pc_maincharacter set kjwl_ep_status = 0 where kjwl_e_id = ?`, [id]);
            personInfromation.forEach(async (item) => {
                console.log('item:', item)
                console.log('item:', item.kjwl_p_id)
                let sql3 = `insert into kjwl_pc_maincharacter (kjwl_e_id,kjwl_p_id) values (?,?)`;
                epdata = await ctx.db.query(sql3, [id, item.kjwl_p_id])
            })
            _result = { status: 1, 'msg': '添加成功', data: '' };
        } else {
            _result = { status: 0, 'msg': '添加失败', data: '' };
        }
        console.log('_result:', _result)
        ctx.body = _result;
    })

//删除企业信息
Enterprise.get('/admin/enterprisedel/:id',
    async (ctx, next) => {
        var { id } = ctx.params;
        console.log('id:', id)
        var edata = await ctx.db.query(`update kjwl_pc_basic_enterprise set kjwl_e_status = 0 where kjwl_e_id = ?`, [id]);
        if (edata) {
            ctx.body = edata;
        } else {
            ctx.body = '该用户无数据';
        }
    }
)
module.exports = Enterprise.routes();