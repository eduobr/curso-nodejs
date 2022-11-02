
//El io() la libreria importada en le HTML
var socket = io();

//los metodos .on() son para escuchar eventos
//con esto sabemos cuando nos conectamos al servidor (el usuario)
socket.on('connect', function () {
    console.log('Conectado al servidor');
});

//el usuario pueda saber cuando pierde conexión con el servidor
socket.on('disconnect', function () {
    console.log('Perdimos conexión con el servidor');
});

//los .emit() son para emitir eventos
//Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Eduardo',
    mensaje: 'Hola Mundo'
}, function (resp) {
    //esta función se dispara si todo sale bien
    console.log('Se disparo el callback');
    console.log('respuesta server: ', resp);
});

//Escuchar información emitida desde el servidor
socket.on('enviarMensaje', function (mensaje) {
    console.log('Servidor', mensaje);
});