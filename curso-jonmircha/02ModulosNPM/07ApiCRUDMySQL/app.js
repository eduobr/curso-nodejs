'use strict'

var express = require('express'),
    favicon = require('serve-favicon'),
    //body parser nos permite manejar como cadenas,objetos
    //los datos que se pasen a través de un formulario
    bodyParser = require('body-parser'), 
    morgan = require('morgan'),
    //requerimos nuestro motor de plantillas(no es necesario)
    //pug = require('pug'),
    //requerimos nuestro archivo de rutas
    routes = require('./routes/index'),
    //icono de la pagina
    faviconURL = `${__dirname}/public/img/node-favicon.png`,
    //directorio public
    publicDir = express.static(`${__dirname}/public`),
    //le decimos cuál va a ser la ruta del directorio de las vistas
    viewDir = `${__dirname}/views`,
    //obtenemos el puerto que tenga el proceso o si no le asigna el 3000
    port = (process.env.PORT || 3000),
    //ejecuta express
    app=express()

app
	//configurando app
	.set('views',viewDir)
	.set('view engine','pug') //busca la dependencia en la carpeta node_modules
	.set('port',port)
	//ejecutando middlewares
	.use(favicon(faviconURL))
    //permite manipular el archivo dónde vamos a trabajar con el modelo a: application/json
    //información del formulario como si fueran objetos nativos de JS
    .use(bodyParser.json())
    //parsea la información del formulario a: application/x-www-form-urlencoded
    //que es como se suele pasar la información de un formulario en el back-end
    .use(bodyParser.urlencoded({extended:false}))
    .use(morgan('dev'))
	.use(publicDir)
	//ejecuto el middleware Enrutador
	.use('/',routes)

module.exports = app //para que exporte la aplicación