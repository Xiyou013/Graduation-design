export default {
    tabsPlanToSelType: {
        company: 0,  //公司
        boss: 1, //老板
        news: 2, //新闻
    },
    modifyInformationEnum: {
        portrait: 1, //头像
        nickname: 2, //昵称
        phone: 3, //手机号码
        email: 4, //邮箱
        card: 5, //名片
    },
    newsLabelType: {
        id: "kjwl_n_id", //新闻id
        nemae: "kjwl_n_name", //新闻标题
        source: "kjwl_n_source", //新闻来源
        rdatetime: "kjwl_n_rdatetime", //新闻发布时间
        url: "kjwl_n_url",//新闻链接
        content: 'kjwl_n_content',//新闻内容
        positive: 'qyss_n_positive',//新闻态度
        labelName: 'qyss_n_labelName',//新闻标签
        labelPath: 'qyss_n_labelPath',//新闻标签路径
        status: 'kjwl_n_status',//新闻状态
        datetime: "kjwl_n_datetime", //新闻录入时间
    },
    newsKeyType: {
        search: 0,  //返回搜索页
        nokeyword: 1, //返回没有关键词的新闻列表页
        keyword: 2, //返回含有关键词的新闻列表页
        company_news: 3, //返回企业的新闻关联列表页
        person_news: 4, //返回人物的新闻关联列表页
        home: 5,//返回首页
        news_index: 6, //返回新闻详情页 
    },
    companyKeyType: {
        search: 0,  //返回搜索页
        company_search: 1,  //返回企业列表页
        newIndex: 2,  //返回新闻详情页
        home: 3,//返回首页
        boss_index: 4,//返回人员详情页
        company_index: 5,//返回企业详情页
        business_information: 6,//返回企业工商信息页
        company_more: 7,//返回企业简介信息页
        collection_index: 8,//返回人物收藏页
    },
    personKeyType: {
        search: 0,  //返回搜索页
        boss_search: 1,  //返回人物列表页
        newIndex: 2,  //返回新闻详情页
        company_search: 3,  //返回企业列表页
        home: 4,//返回首页
        main_satff: 5,//返回企业主要人物页
        partners:6,//返回合作伙伴
        company_index: 7,  //返回企业详情页
        business_information: 8,  //返回企业工商信息页
        collection_index: 9,//返回人物收藏页

    },
};