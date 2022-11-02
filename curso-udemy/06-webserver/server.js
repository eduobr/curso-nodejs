const express = require('express');
const app = express();

const hbs = require('hbs');

//si el objeto no existe le da el valor de 3000
const port = process.env.PORT || 3000;

require('./hbs/helpers');
//__dirname apunta al path de la aplicación
app.use(express.static(__dirname+'/public'));

//Express HBS engine
hbs.registerPartials(__dirname+'/views/parciales'); //decimos donde estarán nuestros parciales
app.set('view engine','hbs');



//si queremos llamar a nuestra pagina home.html debemos
//escribir en el path http://localhost:3000/home.html

//configuramos una solicitud get cuando el path sea un / 
app.get('/', (req, res) => {
    //res.send('Hola Mundo');
    // let salida = {
    //     nombre: 'Eduardo',
    //     edad: 23,
    //     url: req.url //url que solicita el usuario
    // }

    //send detecta que es un objeto y lo serializa a formato JSON
    //res.send(salida);

    //renderiza el archivo home.hbs
    res.render('home',{
    	nombre:'eduardo'
    })
})

app.get('/about',(req,res)=>{
	res.render('about');
})

app.get('/data', (req, res) => {
    res.send('Hola Data');
})

app.listen(port,()=>{
	console.log(`Escuchando peticiones en el puerto ${port}`);
});