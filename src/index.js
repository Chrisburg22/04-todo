
import './style.css';

import{Todo, TodoList} from './classes';
import{crearTodoHtml} from './js/componentes.js'
// import {Todo} from './classes/todo.class'
// import {TodoList} from './todoList.class.js'

 export const todoList = new TodoList();

// Mantener actualizada la información de nuestra aplicación
// todoList.todos.forEach( todo => crearTodoHtml(todo) );
todoList.todos.forEach( crearTodoHtml );

console.log( 'Todos', todoList.todos );