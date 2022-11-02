require('./config/config');

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const hbs = require('hbs');

const bodyParser = require('body-parser');

app.use(express.static(__dirname+'/public'));

app.use(bodyParser.urlencoded({extended:false}));

hbs.registerPartials(__dirname+'/views/parciales');
app.set('view engine','hbs');

const {verificaToken} = require('./middlewares/autenticacion');

app.use(require('./routes/producto'));
app.use(require('./routes/usuario'));
app.use(require('./routes/login'));
//console.log(__dirname);


app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/parrillas',(req,res)=>{
    res.render('parrillas');
});


mongoose.connect('mongodb://127.0.0.1/parrillas',{ useNewUrlParser:true, useUnifiedTopology:true },(err,res)=>{
    console.log('Base de Datos Online');
});

app.listen(process.env.PORT,()=>{
    console.log(`Escuchando el puerto: ${process.env.PORT}`);
});



