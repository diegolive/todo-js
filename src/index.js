import './styles.css';

import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes'

export const todoList = new TodoList();

// Creo la lista de todos en html
todoList.todos.forEach( crearTodoHtml );

console.log('todos', todoList.todos);



