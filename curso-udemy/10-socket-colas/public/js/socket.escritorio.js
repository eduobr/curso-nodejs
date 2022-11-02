var socket = io();

//funcion valida de JS para obtener los parametros
//pero internet explorer y edge no la soportan
//le mandamos todos los parametros opcionales que vienen por el url
var searchParams = new URLSearchParams(window.location.search);

//si no existe el parametro de escritorio
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    //el codigo no se seguirá ejecutando
    //como no tenemos el return ya que no estamos dentro de una función colocamos throw new Error()
    throw new Error('El escritorio es necesario');
}

//obtenemos el valor que tiene el parametro
var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log(escritorio);

$('h1').text('Escritorio ' + escritorio)

$('button').on('click', function () {
    //{ escritorio: escritorio } es una syntaxis de ecmascript5 
    //que es mas compatible con todos los navegadores
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp){
        console.log(resp);

        if(resp==='No hay Tickets'){
            alert(resp);
            label.text(resp);
            return;
        }

        label.text('Ticket '+resp.numero);
    });


});
