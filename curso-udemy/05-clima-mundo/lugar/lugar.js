const axios = require('axios');

const getLugarLatLng = async (direccion) => {

    let encodedUrl = encodeURI(direccion);

    //espera a que la petición regresa y lo deja dentro de resp
    let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUrl}`)

    if (resp.data.status === "ZERO_RESULTS") {
        throw new Error(`No hay resultados para la ciudad ${direccion}`);
    }

    let location = resp.data.results[0];
    let coors = location.geometry.location;

    //Retornar resultado esperado
    return {
        direccion: location.formatted_address,
        lat: coors.lat,
        lng: coors.lng
    }
}

module.exports = {
	getLugarLatLng,
}