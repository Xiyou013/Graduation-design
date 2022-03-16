const Router = require('koa-router');
const Label = new Router();

Label.get('/admin/laeblOneHierarchy', async (ctx, next) => {
    var ldata = await ctx.db.query(`select * from qyss_pc_label where  qyss_l_status = 1 and qyss_l_hierarchy = 1`);
    if (ldata) {
        ctx.body = ldata;
    } else {
        ctx.body = '该用户无数据';
    }
})

Label.post('/admin/laeblOtherHierarchy', async (ctx, next) => {
    const { id, hierarchy } = ctx.request.fields;
    console.log('post', ctx.request.fields);
    var ldata = await ctx.db.query(`select * from qyss_pc_label where  qyss_l_status = 1 and qyss_l_hierarchy = ${hierarchy + 1} and qyss_l_parent = ${id}`);
    if (ldata) {
        ctx.body = ldata;
    } else {
        ctx.body = '该用户无数据';
    }
})

Label.post('/admin/saveLaebl', async (ctx, next) => {
    const selectArr = ctx.request.fields;
    let ldata = '';
    let parent = '';
    let params = {};
    // console.log('post', selectArr);
    for (let i = 0; i < selectArr.length; i++) {
        // console.log(`selectArr[${i}]:`,selectArr[i]);
        if (selectArr[i].qyss_l_id) {
            var res = await ctx.db.query(`select * from qyss_pc_label where  qyss_l_status = 1 and qyss_l_id = ${selectArr[i].qyss_l_id}`);
            console.log('res:', res, 'res.id:', res[0].qyss_l_id);
            // if (res && selectArr[i + 1].qyss_l_id) {
            //     var resOne = await ctx.db.query(`select * from qyss_pc_label where  qyss_l_status = 1 and qyss_l_id = ${selectArr[i + 1].qyss_l_id}`);
            //     // console.log('resOne:', resOne, 'resOne.id:', resOne[0].qyss_l_id);
            //     // console.log(selectArr[i].qyss_l_children + 1);
            //     // let str = await ctx.db.query(`update qyss_pc_label set qyss_l_children = ? where qyss_l_id = ?`, [selectArr[i].qyss_l_children + 1, selectArr[i].qyss_l_id]);
            //     // // console.log('str:', str, 'str.id:', str[0].qyss_l_id);
            //     // console.log('str:', str);
            // } else 
            if (res && i === selectArr.length - 1) {
                ldata = 'exist';
            }
            if (selectArr[i + 1] && !(res && selectArr[i + 1].qyss_l_id)) {
                let str = await ctx.db.query(`update qyss_pc_label set qyss_l_children = ? where qyss_l_id = ?`, [selectArr[i].qyss_l_children + 1, selectArr[i].qyss_l_id]);
                console.log('str:', str, 'str.id:', str.insertId);
            }
        } else {
            params = {
                qyss_l_name: selectArr[i].qyss_l_name,
                qyss_l_hierarchy: selectArr[i].qyss_l_hierarchy,
                qyss_l_children: selectArr[i + 1] ? selectArr[i].qyss_l_children + 1 : selectArr[i].qyss_l_children,
                qyss_l_parent: selectArr[i].qyss_l_parent,
                qyss_l_status: selectArr[i].qyss_l_status,
            }
            // if (selectArr[i].qyss_l_parent === null) {
            //     console.log(`null-selectArr[${i}]:`, selectArr[i]);
            // }
            // if (Object.prototype.toString.call(selectArr[i].qyss_l_parent) === "[object Number]") {
            //     console.log(`number-selectArr[${i}]:`, selectArr[i]);
            // }
            if (selectArr[i].qyss_l_parent === undefined) {
                // console.log(`undefined-selectArr[${i}]:`, selectArr[i]);
                params = {
                    ...params,
                    qyss_l_parent: parent,
                }
            }
            console.log(`params-selectArr[${i}]:`, params);
            var sql = `insert into qyss_pc_label 
            (qyss_l_name,qyss_l_hierarchy,qyss_l_children,qyss_l_parent,qyss_l_status) values (?,?,?,?,?)`;
            var strOne = await ctx.db.query(sql, [params.qyss_l_name, params.qyss_l_hierarchy, params.qyss_l_children, params.qyss_l_parent, params.qyss_l_status]);
            // console.log('strOne:', strOne, 'strOne.id:', strOne[0].qyss_l_id);
            console.log('strOne:', strOne, 'strOne.id:', strOne.insertId);
            parent = strOne.insertId;
            console.log('parent:', parent);
            if (strOne) {
                ldata = true;
            }
        }
    }
    if (ldata) {
        ctx.body = ldata;
    } else {
        ctx.body = '该用户无数据';
    }
})

Label.post('/admin/editorLaebl', async (ctx, next) => {
    const selectArr = ctx.request.fields;
    let ldata = '';
    console.log('editorpost', selectArr);
    console.log('deletepost111', selectArr[selectArr.length - 1].qyss_l_name, selectArr[selectArr.length - 1].qyss_l_id);
    let str = await ctx.db.query(`update qyss_pc_label set qyss_l_name = ? where qyss_l_id = ?`, [selectArr[selectArr.length - 1].qyss_l_name, selectArr[selectArr.length - 1].qyss_l_id]);
    console.log('str:', str)
    if (str) {
        ldata = true;
    }
    if (ldata) {
        ctx.body = ldata;
    } else {
        ctx.body = '该用户无数据';
    }
})

Label.post('/admin/deleteLaebl', async (ctx, next) => {
    const selectArr = ctx.request.fields;
    console.log('deletepost', selectArr);
    console.log('deletepost111', selectArr[selectArr.length - 1].qyss_l_name, selectArr[selectArr.length - 1].qyss_l_id);

    let ldata = '';
    if (selectArr[selectArr.length - 1].qyss_l_hierarchy !== 1) {
        console.log('deletepost222', selectArr[selectArr.length - 2].qyss_l_name, selectArr[selectArr.length - 2].qyss_l_id, selectArr[selectArr.length - 2].qyss_l_children);
        if (selectArr[selectArr.length - 2].qyss_l_id === selectArr[selectArr.length - 1].qyss_l_parent) {
            // console.log('deletepost333:',selectArr[selectArr.length - 2],selectArr[selectArr.length - 1]);
            let str = await ctx.db.query(`update qyss_pc_label set qyss_l_status = 0 where qyss_l_id = ?`, [selectArr[selectArr.length - 1].qyss_l_id]);
            let res = await ctx.db.query(`update qyss_pc_label set qyss_l_children = ? where qyss_l_id = ?`, [selectArr[selectArr.length - 2].qyss_l_children - 1, selectArr[selectArr.length - 2].qyss_l_id]);
            if (str && res) {
                ldata = true;
            }
        } else {
            ldata = false;
        }
    } else {
        let str = await ctx.db.query(`update qyss_pc_label set qyss_l_status = 0 where qyss_l_id = ?`, [selectArr[selectArr.length - 1].qyss_l_id]);
        if (str) {
            ldata = true;
        }
    }

    if (ldata) {
        ctx.body = ldata;
    } else {
        ctx.body = '该用户无数据';
    }
})

module.exports = Label.routes();