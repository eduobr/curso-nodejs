'use strict'
//Express ademas de global se debe tener como dependencia de proyecto
var express = require('express'),
    app=express();

app
	.get('/',(req, res)=>{
		res.send('<h1>Hola Mundo desde Express ;)</h1>');
	}) 
	.get('/bextlan',(req, res)=>{
		//res.send('<h1>Bienvenidos a Bextlan </h1>');
		res.redirect(301,'http://google.cl');
	}) 
	.get('/json',(req, res)=>{
		//En json para las cadenas de JSON deben ir ""
		res.json({
			name:"Jonathan",
			age:31,
			twitter:"@Edd"
		});
	}) 
	.get('/render',(req, res)=>{
		//render puede mandar vistas
		//render trabaja con vistas jade por lo que esta linea no funcionara
		res.render('assets/index.html');

	}) 

.listen(3000);
console.log('Iniciando Express en el puerto 3000');