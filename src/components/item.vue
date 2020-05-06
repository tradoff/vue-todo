<template>
<div class="list-item editingClass editing" :class="{'checked': item.checked}" 
  v-if="!item.deleted"> <!-- 最外层容器-->
 <label class="checkbox"> <!--自定义的多选框-->
   <input type="checkbox" v-model="item.checked" @change="updateItem" :disabled='locked'> <!--item.checked-->
   <span class="checkbox-custom"></span>
 </label>
 <input type="text" v-model="item.text" placeholder='写点什么。。。' 
  @keyup.enter="updateItem" :disabled='locked'>  <!--绑定item.text-->
 <a class="delete-item" v-if="item.checked && !locked" @click='deleteItem'> <!--删除图标-->
   <span class="icon-trash"></span>
 </a>
</div>
</template>
<script>
import {
  updateRecord
} from '../api/api';

export default {
  props: [
    'item',
    'todoId',
    'index',
    'init',
    'locked'
    ],  //子组件显式的用 props 选项声明它期待获得的数据
  methods:{
    //更新待办单项
    updateItem(){
      updateRecord({ id: this.todoId, index: this.index, item: this.item }).then(() => {
        this.init();
        this.$store.dispatch('getTodo');
      });
    },
    //删除待办单项
    deleteItem(){
      this.item.deleted = true;
      this.updateItem();
    }
  }
};
</script>
<style lang="less">
@import '../common/style/list-items.less';
</style>