const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utitlidades');

const usuarios = new Usuarios()

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {
        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        //.join es para unir un cliente a una sala
        client.join(data.sala);

        //let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);
        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        //cuando una persona se conecta al chat se dispara este evento para todos los usuarios
        //client.broadcast.emit('listaPersona', usuarios.getPersonas());

        //enviar solamente a los conectados a la sala
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${data.nombre} se unió`));
        
        callback(usuarios.getPersonasPorSala(data.sala));
        
    });
    
    client.on('crearMensaje', (data, callback) => {
        
        let persona = usuarios.getPersona(client.id);
        
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        
        //client.broadcast.emit('crearMensaje', mensaje);
        
        //Envía solo a las personas que esten en la misma sala
        //client.broadcast.to(persona.sala).emit('listaPersona', usuarios.getPersonas());
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

        callback(mensaje);
    })

    //si el usuario se desconecta y se vuelve a conectar se crea otra instancia
    //por lo que para no tener usuarios duplicados debemos borrar al usuario al momento
    //de desconectarse
    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        //client.broadcast.emit('crearMensaje', { usuario: 'Administrador', mensaje: `${personaBorrada.nombre} abandonó el chat` });

        //client.broadcast.emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`));
        //client.broadcast.emit('listaPersona', usuarios.getPersonas());
        
        //envia mensaje del nombre de la persona que se desconectó
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`));
        //envia lista de personas conectada a la sala
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));
    
    
    });

    //Mensajes privados
    client.on('mensajePrivado', data => {

        //obtenemos la persona que lo envia
        let persona = usuarios.getPersona(client.id);

        //data.para es el id de la persona que le enviaremos el mensaje
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

        /*el cliente debe emitir esto:
        socket.emit('mensajePrivado',{
            nombre:'sadasd', mensaje:'Hola a todos', para:'fgntPcD7eEAmMJENAAAD'
        });
        */


    });
});