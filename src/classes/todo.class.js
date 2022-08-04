

export class Todo {

//Con esto puedo recuperar los metodos que se pierden en el localStorage
    static fromJSON ( {id,tarea, completado, creado}){

        const tempTodo = new Todo( obj.tarea )
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado =creado;

        return tempTodo;
    }

    constructor ( tarea ) {

        this.tarea            = tarea;
        this.id                 = new Date().getTime();
        this.completado = false;
        this.creado         = new Date();
    }

    imprimirClase ( ){
        console.log(` ${ this.tarea} -- ${ this.id }`);
    }
}