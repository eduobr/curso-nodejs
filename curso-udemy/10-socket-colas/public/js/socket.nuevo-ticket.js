//Comando para establecer la conexión
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect',()=>{
  console.log('conectado al servidor');
})

socket.on('disconnect',()=>{
    console.log('Desconectado del servidor');
});

socket.on('estadoActual',function(resp){
  label.text(resp.actual);
});

$('button').on('click',function(){
  //function(siguienteTicket) se va ejecutar al final de todo
  //se la mandamos como un callback desde el socket.js (servidor)
  socket.emit('siguienteTicket', null, function(siguienteTicket){
    label.text(siguienteTicket);
  });
});

