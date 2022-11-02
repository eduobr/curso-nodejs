require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');


//Los app.use son middlewares 

//Los 2 siguientes middleware son para 
 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//app.use( require('./routes/usuario'));
//app.use( require('./routes/login'));

//configuración global de rutas
app.use( require('./routes/index'));


//conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/cafe',{ useNewUrlParser: true }, (err,res)=>{
	if (err) throw err;

	console.log('Base de datos Online');
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.listen(process.env.PORT,()=>{
	console.log('Escuchando puerto 3000');
});