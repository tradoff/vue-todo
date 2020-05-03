import Mock from "mockjs";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
    Todos
} from "./data/todoList";

export default{
    start(){
        let mockAdapter = new MockAdapter(axios);
        const delay = 200;

        mockAdapter.onGet('/todo/list').reply(config => {
            let mockTodos = Todos.map(todo => {
                return {
                    id: todo.id,
                    title: todo.title,
                    count: todo.recode.filter(rc => !rc.checked).length,
                    locked: todo.locked,
                    deleted: todo.deleted
                }
            }).filter(todo => !todo.deleted);

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {todos: mockTodos}]);
                }, delay);
            });
        });

        mockAdapter.onPost('/todo/add').reply(config => {
            Todos.push({
                id: Mock.Random.guid(),
                title: 'newList',
                deleted: false,
                locked: false,
                recode: []
            });

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200]);
                }, delay);
            })
        })
    }
}
