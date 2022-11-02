const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');

app.get('/usuario/registrarse',(req, res)=>{
    res.render('registro');
});

app.post('/usuario/registrarse', (req, res) => {
    let body = req.body;
    let pass = "";

    if(body.txtPassword===""){
        pass = body.txtPassword;
    }else{
        pass = bcrypt.hashSync(body.txtPassword,10)
    }
    
    let user = new Usuario({
        usuario: body.txtUsuario,
        password: pass,
        email:body.txtEmail,
        estado: true
    });

    user.save((err, usuarioDB) => {
        if (err) {
            console.log(err.message);
            /*return res.status(400).json({
                ok:false,
                err
            });*/
            return res.render('registro',{
                message:err.message.split(':').slice(2)
            });
        }

        res.json({
            ok:true,
            usuarioDB
        });
    });
});



module.exports = app;
