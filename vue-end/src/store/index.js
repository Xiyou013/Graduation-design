import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex);

//先定义类型
const types = {
    SET_IS_AUTNENTIATED: 'SET_IS_AUTNENTIATED', // 是否认证通过
    SET_USER: 'SET_USER' ,// 用户信息,
    TOKENSTATUS: 'TOKENSTATUS', //token信息
    LOGINSTATUS:'LOGINSTATUS',  //登录账号身份：管理员（1）/超级管理员（2）
    SET_PROTRAIT: 'SET_PROTRAIT', //登录账号头像
    ACCOUNT: 'ACCOUNT', //登陆账号信息
}

//要具体的定义共享的state
const state = {
    isAutnenticated: false,  // 是否认证
    user: {},   // 存储用户信息,
    protrait:'', //登录账号头像
    tokenStatus:'', //token信息
    loginStatus:'', //登录账号身份：管理员（1）/超级管理员（2）
    account:'', //登陆账号信息
}

//编写getters: 获取具体状态的值
const getters = {
    isAutnenticated: state => state.isAutnenticated,
    user: state => state.user,
    protrait: state => state.protrait,
    tokenStatus: (state) => state.tokenStatus,
    loginStatus: state => state.loginStatus,
    account: state => state.account,
}

//mutations 同步
const mutations = {
    [types.SET_IS_AUTNENTIATED](state, isAutnenticated) {
        if (isAutnenticated)
            state.isAutnenticated = isAutnenticated
        else
            state.isAutnenticated = false
    },
    [types.SET_USER](state, user) {
        if (user)
            state.user = user
        else
            state.user = {}
    },
    [types.SET_PROTRAIT](state, protrait) {
        if (protrait)
            state.protrait = protrait
        else
            state.protrait = {}
    },
    [types.TOKENSTATUS](state,tokenStatus){
        if(tokenStatus) state.tokenStatus = tokenStatus;
        else state.tokenStatus = {}
    },
    [types.LOGINSTATUS](state,loginStatus){
        if(loginStatus) 
        state.loginStatus = loginStatus;
        // state.loginStatus = Object.assign({},localStorage)
        else state.loginStatus = {}
    },
    [types.ACCOUNT](state,account){
        if(account) state.account = account;
        else state.account = {}
    }
}

//actions 异步
const actions = {
    setIsAutnenticated: ({ commit }, isAutnenticated) => {
        commit(types.SET_IS_AUTNENTIATED, isAutnenticated)
    },
    setUser: ({ commit }, user) => {
        commit(types.SET_USER, user)
    },
    clearCurrentState: ({ commit }) => {
        commit(types.SET_IS_AUTNENTIATED, false)
        commit(types.SET_USER, null)
    },
    protraitMethod: ({ commit }, protrait) => {
        commit(types.SET_PROTRAIT, protrait)
    },
    setTokenStatus: ({commit},tokenStatus) => {
        commit(types.TOKENSTATUS,tokenStatus);
    },
    setLoginStatus: ({commit},loginStatus) => {
        commit(types.LOGINSTATUS,loginStatus);
    },
    setAccount: ({commit},account) => {
        commit(types.ACCOUNT,account);
    }
}

var store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store;