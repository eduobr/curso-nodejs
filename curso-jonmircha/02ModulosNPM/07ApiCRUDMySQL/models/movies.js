'use strict'

var mysql = require('mysql'),
	//hace que express considere un middleware la conexión a mysql
	myConnection = require('express-myconnection'),
	dbOptions = {
		host : 'localhost',
		port : 3306,
		user : 'root',
		password : '',
		database : 'movies'
	},
	//Modelo
	Movies = myConnection(mysql,dbOptions, 'request')

//Este archivo va ainteractuar con el archivo de rutas
module.exports = Movies