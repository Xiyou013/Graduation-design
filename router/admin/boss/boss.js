const Router = require('koa-router');
const boss = new Router();

//人才信息总览，按照录入时间逆序排列（即时间最近的在前）
boss.get('/admin/bosssel', async (ctx, next) => {
    var pdata = await ctx.db.query(`select * from kjwl_pc_basic_person where  kjwl_p_status = 1 order by kjwl_p_datetime desc`);
    if (pdata) {
        ctx.body = pdata;
    } else {
        ctx.body = '该用户无数据';
    }
})

//关键字模糊搜索，根据人物名称，职务，任职企业，以及人物标签进行搜索定位，并逆序排列
boss.post('/admin/boss/select', async (ctx, next) => {
    console.log('post', ctx.request.fields);
    const { name, position, enterprise, array } = ctx.request.fields;
    var pdata = await ctx.db.query(`select * from kjwl_pc_basic_person where  kjwl_p_status = 1 and kjwl_p_name like '%${name}%' and kjwl_p_position like '%${position}%' and kjwl_p_enterprise like '%${enterprise}%' and qyss_p_labelName like '%${array}%' order by kjwl_p_datetime desc`);
    // var pdata = '';
    if (pdata) {
        ctx.body = pdata;
    } else {
        ctx.body = '该用户无数据';
    }
})

//根据id查找人物信息
boss.get('/admin/boss/selectId/:id', async (ctx, next) => {
    console.log('get:', ctx.params);
    var { id } = ctx.params;
    var pdata = await ctx.db.query(`select * from kjwl_pc_basic_person where  kjwl_p_status = 1 and kjwl_p_id = ${id}`);
    if (pdata) {
        ctx.body = pdata;
    } else {
        ctx.body = '该用户无数据';
    }
})

//新增人物信息
boss.post('/admin/bossadd',
    async (ctx, next) => {
        console.log('post', ctx.request.fields);
        let _result = '';
        let psdata = '';
        let pndata = '';
        let img = 'http://localhost:8000/暂无图片(2).png';

        const { bossInformation, plabel, array, experience, record, str1, str2, imageUrl, newsInformation } = ctx.request.fields;
        const { bossName, birthDate, graduateSchool, professional, recordSchool, enterprise, position } = bossInformation;

        if (imageUrl !== '') {
            img = imageUrl;
        }

        var sql = `insert into kjwl_pc_basic_person 
        (kjwl_p_portrait,kjwl_p_name,kjwl_p_birthdate,kjwl_p_position,kjwl_p_enterprise,kjwl_p_record,qyss_p_labelName,qyss_p_labelPath) values (?,?,?,?,?,?,?,?)`;
        var pdata = await ctx.db.query(sql, [img, bossName, birthDate, position, enterprise, record, array, plabel]);
        console.log(pdata, pdata.insertId);

        if (pdata && pdata.insertId) {
            newsInformation.forEach(async (item) => {
                let sql3 = `insert into kjwl_pc_pnews (kjwl_p_id,kjwl_n_id) values (?,?)`;
                pndata = await ctx.db.query(sql3, [pdata.insertId, item.kjwl_n_id])
            })
            let sql2 = `insert into kjwl_pc_specific_person (kjwl_p_id,kjwl_p_graduateschool,kjwl_p_professional,kjwl_p_recordschool,kjwl_p_experience,kjwl_p_resume,kjwl_p_event) values (?,?,?,?,?,?,?)`;
            psdata = await ctx.db.query(sql2, [pdata.insertId, graduateSchool, professional, recordSchool, experience, str1, str2]);
            _result = { status: 1, 'msg': '添加成功', data: '' };
        } else {
            _result = { status: 0, 'msg': '添加失败', data: '' };
        }
        console.log('_result:', _result)
        ctx.body = _result;
    })



//测试接口，调数据用的，与正式代码无关
boss.post('/admin/imguplond',
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
boss.get('/admin/getimg/:id', async (ctx, next) => {
    console.log('get:', ctx.params);
    const { id } = ctx.params;
    var sql = `select * from imgtest where id = ?`;
    var pdata = await ctx.db.query(sql, [id]);
    ctx.body = pdata;
})



//根据id查询人物详情信息
boss.get('/admin/bossdetails/:id', async (ctx, next) => {
    console.log('get:', ctx.params);
    const { id } = ctx.params;
    let obj = {};
    let pdata = await ctx.db.query(`select * from kjwl_pc_basic_person where kjwl_p_id = ?`, [id]);
    obj['pdata'] = pdata[0];
    let psdata = await ctx.db.query(`select * from kjwl_pc_specific_person where kjwl_p_id = ?`, [id]);
    obj['psdata'] = psdata[0];
    let pndata = await ctx.db.query(`select * from kjwl_pc_pnews where kjwl_pn_status = 1 and kjwl_p_id = ?`, [id]);
    obj['pndata'] = pndata;
    // console.log('obj:', obj);
    if (pdata && psdata && pndata) {
        ctx.body = obj;
    } else {
        ctx.body = '该用户无数据';
    }
})

//编辑人物信息
boss.post('/admin/bosseditor',
    async (ctx, next) => {
        console.log('post', ctx.request.fields);
        let _result = '';
        let psdata = '';
        let pndata = '';
        let img = 'http://localhost:8000/暂无图片(2).png';

        const { id, bossInformation, plabel, array, experience, record, str1, str2, imageUrl, newsInformation } = ctx.request.fields;
        const { bossName, birthDate, graduateSchool, professional, recordSchool, enterprise, position } = bossInformation;

        if (imageUrl !== '') {
            img = imageUrl;
        }

        var sql = `update kjwl_pc_basic_person set kjwl_p_portrait = ?,kjwl_p_name = ?,kjwl_p_birthdate = ?,kjwl_p_position = ?,kjwl_p_enterprise = ?,kjwl_p_record = ?,qyss_p_labelName = ?,qyss_p_labelPath = ?
        where kjwl_p_id = ?`;
        let pdata = await ctx.db.query(sql, [img, bossName, birthDate, position, enterprise, record, array, plabel, id]);
        if (pdata) {
            var sql1 = `update kjwl_pc_specific_person set kjwl_p_graduateschool = ?,kjwl_p_professional = ?,kjwl_p_recordschool = ?,kjwl_p_experience = ?,kjwl_p_resume = ?,kjwl_p_event = ?
        where kjwl_p_id = ?`;
            psdata = await ctx.db.query(sql1, [graduateSchool, professional, recordSchool, experience, str1, str2, id]);

            deldata1 = await ctx.db.query(`update kjwl_pc_pnews set kjwl_pn_status = 0 where kjwl_p_id = ?`, [id]);
            newsInformation.forEach(async (item) => {
                let sql3 = `insert into kjwl_pc_pnews (kjwl_p_id,kjwl_n_id) values (?,?)`;
                pndata = await ctx.db.query(sql3, [id, item.kjwl_n_id])
            })
            _result = { status: 1, 'msg': '添加成功', data: '' };
        } else {
            _result = { status: 0, 'msg': '添加失败', data: '' };
        }
        console.log('_result:', _result)
        ctx.body = _result;
    })

    //删除人物信息
boss.get('/admin/bossdel/:id',
    async (ctx, next) => {
        var { id } = ctx.params;
        console.log('id:', id)
        var pdata = await ctx.db.query(`update kjwl_pc_basic_person set kjwl_p_status = 0 where kjwl_p_id = ?`, [id]);
        if (pdata) {
            ctx.body = pdata;
        } else {
            ctx.body = '该用户无数据';
        }
    }
)

module.exports = boss.routes();