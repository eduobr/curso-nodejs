'use strict'

var express = require('express'),
    //utilizamos el modulo path para concatenar las rutas estaticas
    //como por ej las carpetas de vistas y public
    //pero lo borramos por que usamos los templateString (`${__dirname}`)
    //path = require('path'),
    //para que cargue el icono de nuestra carpeta
    favicon = require('serve-favicon'),
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
    //establece el directorio de las vistas
	.set('views',viewDir)
	.set('view engine','pug') //busca la dependencia en la carpeta node_modules
    //.set('view engine','ejs')
	.set('port',port)
	//ejecutando middlewares
	.use(favicon(faviconURL))
    //ejecuta morgan en forma de dessarrollo
    .use(morgan('dev'))
    //establezco directorio publico
	.use(publicDir)
	//ejecuto el middleware Enrutador
	.use('/',routes)

module.exports = app //para que exporte la aplicación