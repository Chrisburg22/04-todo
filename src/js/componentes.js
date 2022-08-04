import {Todo} from '../classes';
import {todoList} from '../index.js';

// Referencias en el HTML
const divTodoList               = document.querySelector('.todo-list');
const txtInput                    = document.querySelector('.new-todo') ;
const borrarCompletados = document.querySelector('.clear-completed');
const ulFilters                    = document.querySelectorAll('.filters'); // hace referencia al div que contiene los filtros que queremos.
const anchorfilters             = document.querySelectorAll('filtro');


export const crearTodoHtml = ( todo ) => {

    const htmlTodo = 
    `<li class= "${ (todo.completado) ? 'completed' : ' '  }" data-id="${ todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ' '}>
			<label>${ todo.tarea }</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li> ` ;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div;
}


// Eventos
txtInput.addEventListener( 'keyup', ( event ) => {  // El keyup nos indica que es un evento que evalua la teclas oprimida al momento, dandonos un valor numerico especifico para cada tecla
	
	if( event.keyCode === 13 && txtInput.value.length > 0 ){
		
		const newTodo = new Todo( txtInput.value ); // El value es el valor o el string final al momento en que se preciona enter, el valor sera el que se escriba en el input del archivo index.html de la aplicación
		
		todoList.nuevoTodo(newTodo)

		crearTodoHtml( newTodo );
		txtInput.value = ' '; //Elimina lo que escribimos en el input una ves creado el nuevo Todo en el html
	}
});

divTodoList.addEventListener('click', ( event ) => {
	// Estas son referencias nuevas a elementos que se encuentran dentro del divTodoList las cúales son obtenidas mediante el metodo de target las primeras 2
	// Cada una de estas tiene diferentes funciones
	//La primera apunta al nombre de la etiqueta a la cual se esta oprimiendo o haciendo click
	//La segunda es para identificar al padre del padre del elemento al que se le dio el click
	//El tecero es una variable que extrae un elemento de la constante todoElemento con el metodo de getAttribute

	const nombreElemento = event.target.localName; //En todo caso el valor pude ser un input, label o button
	const todoElemento      = event.target.parentElement.parentElement; //Esto nos crea una referencia a la etiqueta 'li' que se crea al agregar una nueva tarea a la lista
	const todoId                  = todoElemento.getAttribute('data-id');// Esto nos va conseguir el valor que contiene el atributo data-id



	if( nombreElemento.includes('input') ){ // Click en el input con la clase Check que es el que nos dice que una tera ya esta completada
		todoList.marcarCompletado( todoId );  // Utilizamos el metodo de marcar completado con la tarea que seleccionada y para eso utilizaremo su id el cual ya fue estraido en las constantes anteriores
		todoElemento.classList.toggle('completed'); // Agrega o elimina una clase al elemento seleccionado.
	} 
	else if (nombreElemento.includes('button')) {// Esto pregunta si el elemento que se selecciono fue un botton
		todoList.eliminarUnTodo(todoId); //Usamos el metodo para eliminar la tarea de la lista
		divTodoList. removeChild( todoElemento ); // Elimina la tarea del HTML
	}

	console.log( todoList );	
});

// Evento para eliminar los completados
borrarCompletados.addEventListener('click', ( ) => {
	
	todoList.eliminarCompletados();

// De esta manera vamos a eliminar los elementos en el html	
	for ( let i = divTodoList.children.length-1; i >= 0; i-- ){ // Recorremos los elementos que contiene el divTodoList, pero lo haremos desde el ultimo elemento hasto el primero.

		const elemento =  divTodoList.children[ i ];   // Creamos una constante que sera el un elemento hijo del div dependiendo de su posición, lo cual lo define la variable let
		console.log( elemento );
		if( elemento.classList.contains('completed') ){    // Prefunta si el elemento contiene la clase completed como atributo
			divTodoList.removeChild( elemento ); // Remueve ese elmento del la lista de Tareas en el HTML
		}
	}
});

ulFilters.addEventListener( 'click', (event) => {

	const filtro = event.target.text;
	if( !filtro) { return; }

	anchorfilters.forEach( elem => elem.classList.remove('selected') );
	event.target.classList.add('selected');

	for( const elemento of divTodoList.children ){

		elemento.classList.remove('hidden');
		const completado = elemento.classList.contains('completed');

		switch(filtro){
			case 'Pendientes':
				if( completado ){
					elemento.classList.add('hidden');
				}
				break;
			case 'Completado':
				if( !completado ){
					elemento.classList.add('hidden');
				}	
				break;
		}

	}

})



