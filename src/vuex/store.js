import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as types from './mutation-types'

Vue.use(Vuex);

const state = {
    todoList: [],
    menuOpened: false
};

const mutations = {
    [types.OPEN_MENU](state){
        state.menuOpened = !state.menuOpened;
    },
    [types.EDIT_TODO](state, data){
        state.todoList = data;
    }
};

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})