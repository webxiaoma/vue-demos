import Vue from 'vue'
import Vuex from 'vuex'
import {globalVar} from './mutation-types'
import createLogger from 'vuex/dist/logger'

import home from './modules/home'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    namespaced: true,
    state: {
      isLogin:false, // 是否登录
      isLoading:true, // 是否加载

    },
    modules: {
        home,
    },
    actions: {

    },
    mutations: {

    },
    strict: false,
    plugins: debug ? [createLogger()] : []
})

