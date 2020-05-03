<template>
  <div class="list-todos">  <!--菜单容器-->
    <a class="list-todo activeListClass list" v-for="item in items" :key="item.id"
        @click="showTodo(item.id)" :class="{'active': item.id == curTodoId}"> <!--单个菜单容器-->
        <span class="icon-lock" v-if="item.locked"></span>  <!--锁的图标-->
        <span class="count-list" v-if="item.count > 0">{{ item.count }}</span><!--数字-->
        {{ item.title }} <!--菜单内容-->
    </a>
    <a class=" link-list-new" @click="newTodo"> <!--新增菜单-->
      <span class="icon-plus">
      </span>
      新增
    </a>
  </div>
</template>
<script>
import {getTodoList, addTodo} from '../api/api';
export default {
  data(){
    return {
      items: [],
      curTodoId: 0
    };
  },
  created(){
    //加载初始列表
    getTodoList().then(res => {
      this.items = res.data.todos;
      this.curTodoId = this.items[0].id;
    })
  },
  methods:{
      //更换显示的待办事项
      showTodo(id){
        this.curTodoId = id;
      },
      //新增待办事项
      newTodo(){
          addTodo().then(data => {
            getTodoList().then(res => {
              this.items = res.data.todos;
              this.curTodoId = this.items[this.items.length - 1].id;
            })
          })
      }
  }
};
</script>

<style lang="less">
@import '../common/style/menu.less';
</style>