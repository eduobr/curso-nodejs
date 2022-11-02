'use strict'
//Express ademas de global se debe tener como dependencia de proyecto
var express = require('express'),
    app=express();

app.get('/',(req, res)=>{
	res.end('<h1>Hola Mundo desde Express ;)</h1>');
}) 
.get('/user/:id-:name-:age',(req, res)=>{
	//al poner los :id se crea un objeto param.id
	res.end(`<h1>
				${req.params.name}Bienvenid@ a Express ;) tu id es <b>${req.params.id}</b>
				y tienes ${req.params.age} a&ntilde;os
			</h1>`);
}) 

.get('/search',(req,res)=>{
	res.end(`
			<h1>Bienvenidos a Express, los resultados de tu b&uacutesqueda son:
			<mark>${req.query.s}</mark>`); //con req.query le podemos pasar parametros
	//en el navegador tenemos que ponar luego del localhost /search?=loquequeremosbuscar

	
})

.listen(3000);
console.log('Iniciando Express en el puerto 3000');
