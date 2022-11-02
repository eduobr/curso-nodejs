//importamos el objeto io desde el archivo server
const { io } = require('../server');

//para saber(nosotros) cuando un usuario se conecta al servidor
io.on('connection', (client) => {
    console.log('Usuario Conectado');

    //para nosotros(servidor) saber cuando se desconecta un usuario
    //recibimos el mismo client que realiza conexión
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    //Escuchar el cliente
    //escuchamos el evento enviarMensaje enviado por el cliente
    client.on('enviarMensaje', (data, callback) => {
        console.log(data.mensaje);

        //con esto le enviamos la información a todos los usuarios
        client.broadcast.emit('enviarMensaje',data);

        //el callback es la función que enviamos desde el servidor
        //en el metodo emit()
/*         if (mensaje.usuario) {
            callback({
                resp: 'TODO SALIO BIEN!!!'
            });
        } else {
            callback({
                resp: 'TODO SALIO MAL!!!!!'
            });
        } */
    });

    //enviamos un mensaje al cliente
    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });

});