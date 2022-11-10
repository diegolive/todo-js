import { Todo } from "../classes";

export class TodoList {

    constructor() {
        this.cargarLocalStorage();
    }

    nuevoTodo( todo ) {
        this.todos.push(todo);         
        this.guardarLocalStorage();
    }

    eliminarTodo( id ) {
        this.todos = this.todos.filter( todo => todo.id!=id ); // solo un igual porque el tipo es distinto
        this.guardarLocalStorage();
    }

    marcarCompletado( id ) {
        for ( const todo of this.todos ) {
            if (todo.id == id) { // solo == parque el tipo no es el mismo
                todo.completado = !todo.completado;
                break;
            }
        }
        this.guardarLocalStorage();
    }

    eliminarCompletados() {
        this.todos = this.todos.filter( todo => !todo.completado ); 
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage() {
        // if (localStorage.getItem('todo')) {
        //     this.todos = JSON.parse(localStorage.getItem('todo'));
        // } else {
        //     this.todos = [];
        // }
        //this.todos = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];
        this.todos = JSON.parse(localStorage.getItem('todo')) || [];
        this.todos = this.todos.map( Todo.fromJson );
    }
}