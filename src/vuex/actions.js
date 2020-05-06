import * as types from './mutation-types'
import{
    getTodoList
} from '../api/api'

export const getTodo = ({ commit }) => {
    return new Promise((resolve) => {
        getTodoList().then(res => {
            commit(types.EDIT_TODO, res.data.todos);
            resolve();
        });
    });
};

export const updateMenu = ({ commit }) => {
    commit(types.OPEN_MENU);
};