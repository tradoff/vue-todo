<template>
  <div class="list-todos">  <!--菜单容器-->
    <a class="list-todo activeListClass list" v-for="(item, index) in items" :key="index"
        @click="todoChange(index)"> <!--单个菜单容器-->
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
  export default {
    props:[
        'items'
        ],
    methods:{
        //更新右边显示的待办事项列表
        todoChange(index){
            this.$emit("todoChanged", index);
        },
        //新增待办事项
        newTodo(){
            this.$emit('newTodo');
        }
    }
  };
</script>

<style lang="less">
@import '../common/style/menu.less';
</style>