import Mock, { mock } from "mockjs";
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
            });
        }),

        mockAdapter.onGet('/todo/listId').reply(config => {
            let { id } = config.params;
            let todo = Todos.find( todo => {
                return id && todo.id === id;
            });

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                      resolve([200, {todo: todo}]);
                }, delay);
            });
        }),

        mockAdapter.onPost('/todo/addRecord').reply(config => {
            let { id, text } = JSON.parse(config.data);
            let todo = Todos.find( todo => id && todo.id === id );
            todo.recode.push({
                text: text,
                deleted: false,
                checked: false
            });

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200]);
                }, delay);
            });
        }),

        mockAdapter.onPost('/todo/update').reply(config => {
            let data = JSON.parse(config.data);
            let todo = Todos.find( todo => data.id && data.id === todo.id );

            if( data.locked != undefined ){
                todo.locked = data.locked;
            }
            if( data.deleted != undefined ){
                todo.deleted = data.deleted;
            }

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200]);
                }, delay);
            })
        })
    }
}
