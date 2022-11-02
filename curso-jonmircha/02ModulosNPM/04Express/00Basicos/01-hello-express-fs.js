'use strict'
//Express ademas de global se debe tener como dependencia de proyecto
var express = require('express'),
    app=express();

app.get('/',(req, res)=>{// '/' es la ruta donde se iniciara el servidor
	res.sendFile(`${__dirname}/assets/index.html`); //__dirname devuelve la ruta dónde se encuentra el archivo
}) 
.listen(3000);
console.log('Iniciando Express en el puerto 3000');
