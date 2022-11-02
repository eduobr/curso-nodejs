const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        //Propiedades
        //este es el ultimo ticket que se dio
        this.ultimo = 0;
        //saber la fecha de hoy
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        //si en archivo data hoy es igual a this.hoy
        //se lee el archivo y se continua el trabajo que ya existia
        //Y si es otro día diferente se debe reiniciar todo porque 
        //es otro día de trabajo
        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {
            this.reiniciarConteo();
        }
        console.log(data);
    }

    siguiente() {
        this.ultimo += 1;

        //el null es porque no sabemo que escritorio lo va atender
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    //se recibe escritorio
    atenderTicket(escritorio) {
        //se verifican que hayan tickets pendientes
        if (this.tickets.length === 0) {
            return 'No hay Tickets'
        }

        //obtenemos el primer ticket
        let numeroTicket = this.tickets[0].numero;
        //elimina el primer elemento de un arreglo
        this.tickets.shift();

        //creamos un nuevo ticket con su numero y escritorio que lo atenderá
        let atenderTicket = new Ticket(numeroTicket,escritorio);

        //el metodo unshift dará error si no se encuentra
        //en el archivo data.json por lo que tenemos que volver a generar el archivo data
        //o agregar la propiedad
        //agregamos el ticket al inicio del arreglo
        this.ultimos4.unshift(atenderTicket);

        //si el tamaño del arreglo es mayor a 4
        if(this.ultimos4.length > 4){
            this.ultimos4.splice(-1,1); //borra el ultimo elemento
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();
        return atenderTicket;
    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();

    }

    grabarArchivo() {
        //tickets: this.tickets guarda el arreglo de tickets pendientes
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };


        //pasamos el JSON a String
        let jsonDataString = JSON.stringify(jsonData);

        //escribir en el archivo de manera sincrona
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}

module.exports = {
    TicketControl
}