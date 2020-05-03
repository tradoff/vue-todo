import Mock from "mockjs";

let n = 5;
let Todos = [];
let recode = [1, 2, 3, 4, 5];
let Random = Mock.Random;
for (let index = 0; index < n; index++) {
    Todos.push(
        Mock.mock({
            id: Random.guid(),
            title: Random.first(),
            deleted: Random.boolean(),
            locked: Random.boolean(),
            recode: 
                recode.map(() => {
                    return {
                        text: Random.cparagraph(2, 10),
                        deleted: false,
                        checked: Random.boolean()
                    };
                })
        })
    );
}

export {
    Todos
};