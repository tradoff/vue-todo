import axios from "axios";

export const getTodoList = params => {
    return axios.get('/todo/list', {params: params}).catch(err => console.log(err));
};

export const addTodo = params => {
    return axios.post('/todo/add', params).then(res => res.data).catch(err => console.log(err));
};