
export class Todo {

    static fromJson ( {id, tarea, completado, creado} ) { 
        const tmp = new Todo(tarea);
        tmp.id = id;
        tmp.completado = completado;
        tmp.creado = creado;
        return tmp;
    }

    constructor( tarea ) {
        this.tarea = tarea;
        this.id = new Date().getTime(); 
        this.completado = false;
        this.creado = new Date();
    }    

    imprimir = () => {
        console.log(`${this.id} - ${this.tarea}`);
    }

}