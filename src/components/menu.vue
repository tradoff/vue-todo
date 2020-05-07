<template>
  <div class="list-todos">  <!--菜单容器-->
    <transition-group name="right-in" appear>
      <a class="list-todo activeListClass list" v-for="item in todoList" :key="item.id"
        @click="showTodo(item.id)" :class="{'active': item.id == curTodoId}"><!--单个菜单容器-->
          <span class="icon-lock" v-if="item.locked"></span>  <!--锁的图标-->
          <span class="count-list" v-if="item.count > 0">{{ item.count }}</span><!--数字-->
          {{ item.title }} <!--菜单内容-->
      </a>
    </transition-group>
    <a class=" link-list-new" @click="newTodo"> <!--新增菜单-->
      <span class="icon-plus">
      </span>
      新增
    </a>
  </div>
</template>
<script>
import { addTodo } from '../api/api';
export default {
  data(){
    return {
      curTodoId: 0,
      count: 0
    };
  },
  created(){
    //加载初始列表
    this.$store.dispatch('getTodo').then(() => {
      this.showTodo(this.todoList[0].id);
    })
  },
  computed:{
    todoList(){
      const list = this.$store.getters.getTodoList;
      const count = list.length;
      //若count为0，说明待办事项列表空了，则跳过展示，因为id为undefined
      //若待办事项减少了，说明存在待办事项被删除的情况，显示第一个待办事项详情
      if(count && count < this.count){
        this.showTodo(list[0].id);
      }
      this.count = count;

      return list;
    }
  },
  watch:{
    'curTodoId'(id){
      this.$router.push({ name: 'todo', params:{ id: id } });
    },
  },
  methods:{
      //更换显示的待办事项
      showTodo(id){
        this.curTodoId = id;
      },
      //新增待办事项
      newTodo(){
          addTodo().then(data => {
            this.$store.dispatch('getTodo').then(() => {
              this.$nextTick(() => {
                this.showTodo(this.todoList[this.todoList.length - 1].id);
              });
            });
          });
      }
  }
};
</script>

<style lang="less">
@import '../common/style/menu.less';
</style>