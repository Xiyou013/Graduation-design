function editNewsDataNum(val) {
    const oneDataNum = 1000 * 60 * 60 * 24
    let data = new Date();
    // console.log('val:', val, data);
    var startDate = Date.parse(val);
    var endDate = Date.parse(data);
    // console.log('endDate:', startDate, endDate);
    let difference = Math.abs(endDate - startDate);
    let tian = Math.round(difference / oneDataNum);
    // console.log('tian:', tian);
    if(difference <= oneDataNum){
        tian = 1;
    }
    return tian;
}
const dataNameList ={
    1:'kjwl_n_onedata',
    2:'kjwl_n_twodata',
    3:'kjwl_n_threedata',
    4:'kjwl_n_fourdata',
    5:'kjwl_n_fivedata',
    6:'kjwl_n_sixdata',
    7:'kjwl_n_sevendata',
};

module.exports = {
    editNewsDataNum,
    dataNameList,
};