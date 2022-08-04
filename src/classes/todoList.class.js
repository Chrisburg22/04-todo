import { Todo } from './todo.class';

export class  TodoList {

    constructor(){ 
        this.cargarLocalStorage();
    }

    //  Metodo que agrega Tareas al arreglo this.todos
    nuevoTodo ( todo ){ 
        this.todos.push(todo); 
        this.guardarLocalStorage();

    }

    // Metodo que elimina una tarea de la lista 
    eliminarUnTodo( id ){
         // Esto va nos ayuda a modificar la lista de tareas, lo que hace el filter 
         // es que va a crear un nuevo arreglo omitiendo el que queremos eliminar
         // dando la impreción de que fue eliminada la tarea, 
         // Aun que la verdad es que solo fue omitida al crear el nuevo arreglo.
        this.todos = this.todos.filter(todo => todo.id != id); // regrega todos los elemntos que sean diferentes el id
        this.guardarLocalStorage();
    }

    // Metodo que nos ayuda a modificar la propiedad completado.
    marcarCompletado( id ){ // El id se consigue de la clase Todo

        for( const todo of this.todos ){ // Recorre el arrgelo de tareas 
            console.log( todo.id, id); // Con esto diferenciamos que uno es un string y el otro un entero

            if(todo.id == id){ // Por lo mismo de arriba solo se hace una igualacion de valores mas no de tipo de dato.
                todo.completado = !todo.completado; // Cambia la propiedad de completado, que en este caso es un booleano  false, La negación de false es True
                break;// Termina la ejecución de este bloque de código
            }
        }
        this.guardarLocalStorage();
    }

// Metodo para eliminar todas las tareas terminadas
    eliminarCompletados( ){
        this.todos = this.todos.filter( todo => todo.completado != true); // Crea un nuevo arreglo con las tareas no completadas
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){

        localStorage.setItem( 'todo', JSON.stringify( this.todos ) );

    }

    cargarLocalStorage(){

         this.todos = ( localStorage.getItem('todo') ) // si el local estorage contiene una tarea
                             ?  JSON.parse( localStorage.getItem('todo') ) // si se cumple la condición se transforma el string a objeto o clase
                             : [ ]; // si ni existe nada se crea un arreglo vacio

        this.todos = this.todos.map(Todo.fromJson);
    }
}