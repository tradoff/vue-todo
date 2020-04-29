<template>
  <div class="page lists-show" v-show='todo.title'><!--最外层容器-->
    <nav><!--容器上半部分-->
      <div class="nav-group"> <!--移动端的菜单图标-->
        <a class="nav-item">
          <span class="icon-list-unordered">
          </span>
        </a>
      </div>
      <h1 class="title-page">
        <span class="title-wrapper">{{todo.title}}</span> <!-- 标题-->
        <span class="count-list">{{todo.count}}</span><!-- 数目-->
      </h1>
      <div class="nav-group right"><!-- 右边的删除，锁定图标容器-->
        <div class="options-web"> 
          <a class=" nav-item" @click="todo.locked = !todo.locked"> <!-- 锁定图标-->
            <span class="icon-lock" v-if="todo.locked"></span>
            <span class="icon-unlock" v-else>
            </span>
          </a>
          <a class=" nav-item" @click="trash"><!-- 删除图标-->
            <span class="icon-trash">
            </span>
          </a>
        </div>
      </div>

      <div class=" form todo-new input-symbol"> 
 <!-- 新增单个待办单项输入框,监听了回车事件，双向绑定text值,监听了disabled属性，在todo.locked为true的情况下无法编辑-->
         <input type="text" v-model="text" placeholder='请输入' @keyup.enter="onAdd" :disabled="todo.locked" />
        <span class="icon-add"></span>
      </div>
    </nav>
    <div class="content-scrollable list-items">
      <!--容器下半部分-->
      <div>
          <div v-for="(item, index) in todo.items" :key="index">
              <item :item="item" @deleteItem='onDelete(index)'></item>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import item from './item';
export default {
  components: {
      item
  },
  props:[
      'todo',
      ],
  data() {
    return {
      defaultText: '',          //默认新增待办单项值
      text: this.defaultText,   //新增待办单项绑定的值
    }
  },
  methods: {
    //新增待办单项
    onAdd() {
      this.todo.items.push({
        checked: false, text: this.text, isDelete: false
      }); // 当用户点击回车时候 ，给items的值新增一个对象，this.text 即输入框绑定的值
      this.todo.count++;
      this.text = this.defaultText; //初始化输入框的值。
    },
    //删除待办单项
    onDelete(index){
        this.todo.items.splice(index, 1);
        this.todo.count--;
    },
    //删除待办事项
    trash(){
        this.$emit("remove");
    }
  }
}
</script>
<style lang = "less">
@import '../common/style/nav.less';
@import '../common/style/form.less';
@import '../common/style/todo.less';
</style>