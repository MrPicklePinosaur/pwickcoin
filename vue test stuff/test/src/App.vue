<template>
  <div id="app">
    <Header />
    <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo"/>
    <AddTodos v-on:add-todo="addTodo"/>
  </div>
</template>

<script>
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodos from './components/AddTodo';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    Header,
    Todos,
    AddTodos
  },
  data() {
    return {
      todos: [
        {
           id: 1,
           title: "Todo one",
           completed: false
        },
        {
          id: 2,
          title: "Todo two",
          completed: true
        },
        {
          id: 3,
          title: "Todo Three",
          completed: false
        }
      ]
    }
  },
  methods: {
    deleteTodo(id){
      this.todos = this.todos.filter(todo => todo.id !== id);//Loops thru and returns an array based on that condition
    },
    addTodo(newTodo){
      const {title,completed} = newTodo;
      axios.post('',{
        title,
        completed
      })
        .then()
        .catch(err => console.log(err))
      this.todos = [...this.todos, newTodo];

    }
  },
  created() {
    axios.get('')
      .then(res => this.todos = res.data) 
      .catch(err => console.log(err))
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
  }


  .btn {
    display: inline-block;
    border: none;
    background: #555;
    color: #fff;
    padding: 7px 20px;
    cursor: pointer;
  }
  .btn:hover {
    background: #666;
  }
  


</style>
