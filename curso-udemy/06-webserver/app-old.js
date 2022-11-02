const http = require('http');

//crea un servidor que recibe como callback un request(solicitudes) y las respuestas
http.createServer((req,res)=>{
	res.writeHead(200,{'Content-Type':'application/json'});
	let salida = {
		nombre:'Eduardo',
		edad:23,
		url: req.url //url que solicita el usuario
	}
	res.write(JSON.stringify(salida));
	//res.write('Hola Mundo');
	//con lo siguiente le decimos que ya terminamos de crear la respuesta
	res.end();
})
.listen(8083); //el puerto que está escuchando, tiene que estar libre
console.log('Escuchando el puerto 8083');