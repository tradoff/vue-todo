import axios from "axios";

//获取待办事项列表
export const getTodoList = params => {
    return axios.get('/todo/list', { params: params }).catch(err => console.log(err));
};

//添加待办事项
export const addTodo = params => {
    return axios.post('/todo/add', params);
};

//获取待办事项详情
export const getTodo = params => {
    return axios.get('/todo/listId', { params: params });
};

//更新待办事项
export const updateTodo = params => {
    return axios.post('/todo/update', params);
};

//添加待办单项
export const addRecord = params => {
    return axios.post('/todo/addRecord', params);
};

//删除待办单项
export const updateRecord = params => {
    return axios.post('/todo/updateRecord', params);
}