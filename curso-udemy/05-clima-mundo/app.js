const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

//lo movimos a lugar.js
//const axios = require('axios'); 

//con esto configuramos argumentos directamente
//en la raiz de la aplicación
const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener el clima',
        demand: true
    }
}).argv;

//Parametro ingresado
//console.log(argv.direccion);


//lo movimos a lugar.js
//escapamos los espacios que pueda tener nuestro address
//a su forma html
// let encodedUrl = encodeURI(argv.direccion);

// //debemos especificar la url del servicio a llamar
// axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUrl}`)
//     .then(resp => {
//         //console.log(resp.data);  //vemos la parte del result
//         //console.log(JSON.stringify(resp.data, undefined, 2)); //vemos los arreglos 
//         // del result y los formatea con 2 espacios

//         // console.log(resp.status);

//         //Esta es una forma de lograr lo que está abajo
//         let direccion = resp.data.results[0].formatted_address;
//         let lat = resp.data.results[0].geometry.location.lat;
//         let lng = resp.data.results[0].geometry.location.lng;

//         let location = resp.data.results[0];
//         let coors = location.geometry.location;
//         console.log(`Dirección: ${location.formatted_address}`);
//         console.log(`lat: ${coors.lat}`);
//         console.log(`lng: ${coors.lng}`);

//         /*Si el codigo no funciona volver a intentar, recordar
//         que la key de la api es gratis*/

//     })
//     .catch(e => console.log('Error!!!', e));

let getInfo = async (direccion) => {
    try {
        let coors = await lugar.getLugarLatLng(direccion);
        let temp = await clima.getClima(coors.lat, coors.lng);
        return `El clima en ${coors.direccion} es de ${temp}`;
    } catch (e) {
        return `No se pudo determinar el clima en ${direccion}`;
    }



}

getInfo(argv.direccion)
    .then(mensaje => console.log(mensaje))
    .catch(e => console.log(e))

// lugar.getLugarLatLng(argv.direccion)
// 	//esta respuesta es el return de la función
// 	.then(resp=>{
// 		console.log(resp);
// 	})
// 	.catch(e=>console.log(e));


// clima.getClima(35,139)
// 	.then(temp=>{
// 		console.log(temp);
// 	})
// 	.catch(e=>console.log(e));