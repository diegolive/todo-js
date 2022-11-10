import { Todo } from "../classes";
import { todoList } from "../index";

// Referencias en el HTML element
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const bntBorrarCompletados = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const botonesFlitros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => { 

    const htmlTodo = `
        <li class="${todo.completado?'completed':''}" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${todo.completado?'checked':''}>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;    
}

// Eventos
txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }    
});

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) { // click en el check
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) { // click en el botón X
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
    }
});

bntBorrarCompletados.addEventListener('click', ()=> {
    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length-1; i>=0; i--) { // lo recorro para borrar de abajo a arriba
        const elemento = divTodoList.children[i];
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild( elemento );
        }
    }
});

ulFilters.addEventListener('click', (event)=> {
    const filtro = event.target.text;
    if (!filtro) { return; }

    botonesFlitros.forEach( bnt => bnt.classList.remove('selected'));
    event.target.classList.add('selected');


    for( const elemento of divTodoList.children) {
        const completado = elemento.classList.contains('completed');
        elemento.classList.remove('hidden');
        switch ( filtro ) { 
            case 'Pendientes': 
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados': 
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }

    }

});

