<template>
  <section class="container" > <!--最外层容器-->
    <section class="menu"> <!--左边的容器-->
      <menus :items='todos' 
        @todoChanged='changeTodo($event)' @newTodo='newTodo()'>
      </menus>
    </section>
    <section class="content-container"><!--右边的容器-->
      <todo :todo='todos[selectedIndex]? todos[selectedIndex] :{}' 
        @remove='removeTodo'>
      </todo>
    </section>
  </section>
</template>
<script>
  import menus from './menu';
  import todo from './todo';

  export  default {
      components:{
          menus: menus,
          todo: todo
      },
      data(){
          return {
              todos : [
                { title: '星期一', count: 1, locked: true ,
                    items: [ //代办单项列表
                        { checked: false, text: '星期一的新的一天1', isDelete: false }
                    ]}, 
                { title: '星期二', count: 2, locked: true ,
                    items: [ //代办单项列表
                        { checked: false, text: '星期二的新的一天1', isDelete: false },
                        { checked: false, text: '星期二的新的一天2', isDelete: false }
                    ]}, 
                { title: '星期三', count: 3, locked: false,
                    items: [ //代办单项列表
                        { checked: false, text: '星期三的新的一天1', isDelete: false },
                        { checked: false, text: '星期三的新的一天2', isDelete: false },
                        { checked: false, text: '星期三的新的一天3', isDelete: false }
                    ]}
              ],
              selectedIndex: 0
          }
      },
      methods:{
          //更新右边显示的待办事项列表
          changeTodo(index){
              this.selectedIndex= index;
          },
          //删除待办事项
          removeTodo(){
            this.todos.splice(this.selectedIndex, 1);
          },
          //新增待办事项
          newTodo(){
            this.todos.push({title:'newList', count:0, locked:false, items:[]});
            this.selectedIndex = this.todos.length - 1;
          }
      }
  };
</script>

<style lang="less">
@import '../common/style/layouts.less';
</style>