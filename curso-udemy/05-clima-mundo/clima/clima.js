const axios = require('axios');

const getClima = async(lat,lng)=>{
	let resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=a8b8b6b387924d1985d6d8f170a9066c`);
	return resp.data.main.temp
	
}

module.exports = {
	getClima,
}