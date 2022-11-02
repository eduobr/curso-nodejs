const express = require('express');

const socketIO = require('socket.io');

//tenemos que hacer un servidor con http ya que socket.io no trabaja en base a express
const http = require('http');

const path = require('path');

const app = express();
//las funciones de express son tan parecidas que podemos crear un servidor
//pasandole como parametro el app de express
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//IO = esta es la comunicación con el backend
//exportamos el objeto io
module.exports.io = socketIO(server);

require('./sockets/socket');



server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});