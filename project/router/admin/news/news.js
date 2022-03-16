const Router = require('koa-router');
const News = new Router();

//新闻信息总览，逆序排列
News.get('/admin/newssel', async (ctx, next) => {
    var ndata = await ctx.db.query(`select * from kjwl_pc_basic_news where  kjwl_n_status = 1 order by kjwl_n_rdatetime desc`);
    if (ndata) {
        ctx.body = ndata;
    } else {
        ctx.body = '该用户无数据';
    }
})

//获取数据库中的标签数据结构
News.get('/admin/news/selectCascader', async (ctx, next) => {
    var cascaderData, childDataOne, childDataTwo, childDataThree, childDataFour, childDataFive, childrenData;
    cascaderData = await ctx.db.query(`select * from qyss_pc_label where qyss_l_hierarchy = 1 and qyss_l_status = 1`)
    for (var i = 0; i < cascaderData.length; i++) {
        if (cascaderData[i].qyss_l_children !== 0) {
            // console.log(`cascaderData${i}:`, cascaderData[i]);
            childDataOne = await ctx.db.query(`select * from qyss_pc_label where qyss_l_parent = ${cascaderData[i].qyss_l_id} and qyss_l_hierarchy = ${cascaderData[i].qyss_l_hierarchy + 1} and qyss_l_status = 1`)
            for (var j = 0; j < childDataOne.length; j++) {
                if (childDataOne[j].qyss_l_children !== 0) {
                    // console.log(`childDataOne${j}:`, childDataOne[j]);
                    childDataTwo = await ctx.db.query(`select * from qyss_pc_label where qyss_l_parent = ${childDataOne[j].qyss_l_id} and qyss_l_hierarchy = ${childDataOne[j].qyss_l_hierarchy + 1} and qyss_l_status = 1`)
                    for (var k = 0; k < childDataTwo.length; k++) {
                        if (childDataTwo[k].qyss_l_children !== 0) {
                            // console.log(`childDataTwo${k}:`, childDataTwo[k]);
                            childDataThree = await ctx.db.query(`select * from qyss_pc_label where qyss_l_parent = ${childDataTwo[k].qyss_l_id} and qyss_l_hierarchy = ${childDataTwo[k].qyss_l_hierarchy + 1} and qyss_l_status = 1`)
                            for (var n = 0; n < childDataThree.length; n++) {
                                if (childDataThree[n].qyss_l_children !== 0) {
                                    // console.log(`childDataThree${n}:`, childDataThree[n]);
                                    childDataFour = await ctx.db.query(`select * from qyss_pc_label where qyss_l_parent = ${childDataThree[n].qyss_l_id} and qyss_l_hierarchy = ${childDataThree[n].qyss_l_hierarchy + 1} and qyss_l_status = 1`)
                                    childDataThree[n].children = childDataFour;
                                }
                            }
                            childDataTwo[k].children = childDataThree;
                        }
                    }
                    childDataOne[j].children = childDataTwo;
                }
            }
            cascaderData[i].children = childDataOne;
        }
    }
    // console.log('cascaderData222:', cascaderData)
    if (cascaderData) {
        ctx.body = cascaderData;
    } else {
        ctx.body = '该用户无数据';
    }
})

//关键字模糊搜索，根据新闻名称，来源，报道日期，以及新闻标签定位查询
News.post('/admin/news/select', async (ctx, next) => {
    const { name, source, datetime, array } = ctx.request.fields;
    console.log('post', ctx.request.fields, array,);
    var ndata = await ctx.db.query(`select * from kjwl_pc_basic_news where  kjwl_n_status = 1 and kjwl_n_name like '%${name}%' and kjwl_n_source like '%${source}%' and kjwl_n_rdatetime like '%${datetime}%' and qyss_n_labelName like '%${array}%' order by kjwl_n_rdatetime desc`);
    // console.log('ndata:', ndata);
    if (ndata) {
        ctx.body = ndata;
    } else {
        ctx.body = '该用户无数据';
    }
})

//根据id查询新闻信息
News.get('/admin/news/selectId/:id', async (ctx, next) => {
    console.log('/admin/sel:', ctx.params);
    var { id } = ctx.params;
    var ndata = await ctx.db.query(`select * from kjwl_pc_basic_news where  kjwl_n_status = 1 and kjwl_n_id like '%${id}%'`);
    if (ndata) {
        ctx.body = ndata;
    } else {
        ctx.body = '该用户无数据';
    }
})

//新增新闻信息
News.post('/admin/newsadd',
    async (ctx, next) => {
        console.log('post', ctx.request.fields);
        let _result = '';
        let npdata = '';
        let nedata = '';
        let { newInformation, nlabel, array, content, personInfromation, enterpriseInfromation, positive } = ctx.request.fields;
        var { newTitle, newUrl, newDate, newLink } = newInformation;
        // console.log('1323:', nlabel)

        var sql = `insert into kjwl_pc_basic_news 
        (kjwl_n_name,kjwl_n_source,kjwl_n_rdatetime,kjwl_n_url,kjwl_n_content,qyss_n_positive,qyss_n_labelName,qyss_n_labelPath) values (?,?,?,?,?,?,?,?)`;
        var ndata = await ctx.db.query(sql, [newTitle, newUrl, newDate, newLink, content, positive, array, nlabel]);
        // console.log(ndata, ndata.insertId);

        if (ndata && ndata.insertId) {
            personInfromation.forEach(async (item) => {
                let sql2 = `insert into kjwl_pc_nperson (kjwl_n_id,kjwl_p_id) values (?,?)`;
                npdata = await ctx.db.query(sql2, [ndata.insertId, item.kjwl_p_id])
            })
            enterpriseInfromation.forEach(async (item) => {
                let sql3 = `insert into kjwl_pc_nenterprise (kjwl_n_id,kjwl_e_id) values (?,?)`;
                nedata = await ctx.db.query(sql3, [ndata.insertId, item.kjwl_e_id])
            })
            _result = { status: 1, 'msg': '添加成功', data: '' };
        } else {
            _result = { status: 0, 'msg': '添加失败', data: '' };
        }
        // console.log('_result:', _result)
        ctx.body = _result;
    })

//编辑新闻信息
News.post('/admin/newseditor',
    async (ctx, next) => {
        console.log('post', ctx.request.fields);
        let _result = '';
        let deldata1 = '';
        let deldata2 = '';
        let npdata = '';
        let nedata = '';
        let { newInformation, nlabel, array, content, id, personInfromation, enterpriseInfromation, positive } = ctx.request.fields;
        var { newTitle, newUrl, newDate, newLink } = newInformation;
        // console.log('1323:', nlabel)

        var sql = `update kjwl_pc_basic_news set kjwl_n_name = ?,kjwl_n_source = ?,kjwl_n_rdatetime = ?,kjwl_n_url = ?,kjwl_n_content = ?,qyss_n_positive = ?,qyss_n_labelName = ?,qyss_n_labelPath = ?
        where kjwl_n_id = ?`;
        var ndata = await ctx.db.query(sql, [newTitle, newUrl, newDate, newLink, content, positive, array, nlabel, id]);

        if (ndata) {
            deldata1 = await ctx.db.query(`update kjwl_pc_nperson set kjwl_np_status = 0 where kjwl_n_id = ?`, [id]);
            personInfromation.forEach(async (item) => {
                let sql2 = `insert into kjwl_pc_nperson (kjwl_n_id,kjwl_p_id) values (?,?)`;
                npdata = await ctx.db.query(sql2, [id, item.kjwl_p_id])
            })
            deldata2 = await ctx.db.query(`update kjwl_pc_nenterprise set kjwl_ne_status = 0 where kjwl_n_id = ?`, [id]);
            enterpriseInfromation.forEach(async (item) => {
                let sql3 = `insert into kjwl_pc_nenterprise (kjwl_n_id,kjwl_e_id) values (?,?)`;
                nedata = await ctx.db.query(sql3, [id, item.kjwl_e_id])
            })
            _result = { status: 1, 'msg': '添加成功', data: '' };
        } else {
            _result = { status: 0, 'msg': '添加失败', data: '' };
        }
        // console.log('_result:', _result)
        ctx.body = _result;
    })

//查询新闻详情信息
News.get('/admin/newsdetails/:id',
    async (ctx, next) => {
        let arr = {}
        var { id } = ctx.params;
        var ndata = await ctx.db.query(`select * from kjwl_pc_basic_news where kjwl_n_id = ?`, [id]);
        arr = ndata[0];
        var npdata = await ctx.db.query(`select * from kjwl_pc_nperson where kjwl_np_status = 1 and  kjwl_n_id = ? `, [id]);
        arr['npdata'] = npdata;
        var nedata = await ctx.db.query(`select * from kjwl_pc_nenterprise where kjwl_ne_status = 1 and  kjwl_n_id = ? `, [id]);
        arr['nedata'] = nedata;
        if (ndata && nedata && nedata) {
            ctx.body = arr;
        } else {
            ctx.body = '该用户无数据';
        }
    }
)

//删除新闻信息
News.get('/admin/newsdel/:id',
    async (ctx, next) => {
        var { id } = ctx.params;
        console.log('id:', id)
        var ndata = await ctx.db.query(`update kjwl_pc_basic_news set kjwl_n_status = 0 where kjwl_n_id = ?`, [id]);
        if (ndata) {
            ctx.body = ndata;
        } else {
            ctx.body = '该用户无数据';
        }
    }
)

module.exports = News.routes();