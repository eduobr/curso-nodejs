/*
Organización de Código JS
     librerias/modulos
     constantes
     objetos/variables
     funciones
     eventos
     ejecuciones

Usar camelCase
     Cuando instrucción tenga una sola palabra, va en minúscula p.e. require()
     Sólo las clases rompen esta regla, siempre va en mayúscula la letra inicial p.e. EventEmmioter()
     Cuando una instrucción tenga 2 o más palabras, apartir de la segunda la primer letra en mayúscula p.
     e.createServer()
*/

'use strict' //modo estricto para proramar con buenas prácticas
console.log('Hola Mundo desde Node.js, esto se verá en la terminal de comandos')

console.log(2 + 5)

//console.log(window)
//console.log(global)

setInterval(function(){
     console.log('Hola Node.js')
},1000) //esto se ejecuata cada un segundo, el 1000 es de milisegundos