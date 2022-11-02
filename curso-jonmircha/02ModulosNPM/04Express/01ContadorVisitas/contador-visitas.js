'use strict'
//Express ademas de global se debe tener como dependencia de proyecto
var express = require('express'),
    app=express(),
    cookieParser=require('cookie-parser'),
    cookieSession=require('cookie-session');

//para usar el cookie-parser y cookie-session debemos instalarla
//como dependencia de proyecto

app
	.use( cookieParser() )//usa cookie parser para analizar el objeto de tipo cookie
	.use( cookieSession({secret:"secreto"}) )//crea un  atributo secret
	.get('/',(req, res)=>{
		//se crea la variable de session visita y si no existe
		//la inicializa en 0
		req.session.visitas || (req.session.visitas = 0);

		let n = req.session.visitas++;

		/*lo anterior es lo mismo a:
		if (req.session.visitas) { //si existe
			let n = req.session.visitas++;
		}else{
			req.session.visitas = 0;
		}*/
	
		res.end(`
			<h1>Hola Mundo desde Express, me has visitado <i>${n} veces.</h1></i>
			`);
	}) 
	.listen(3000);
	console.log('Iniciando Express en el puerto 3000');