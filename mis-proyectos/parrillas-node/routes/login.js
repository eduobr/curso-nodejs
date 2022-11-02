const express = require('express');
const app = express();
let jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario'); 

app.get('/login',(req,res)=>{
    res.render('login',{
        title:'Login'
    });
})

app.get('/login-user',(req,res)=>{
    let usuario = req.query.usuario;
    let password = req.query.password;

    Usuario.findOne({usuario},(err,usuarioDB)=>{
        if(err){
            return res.render('login',{
                message:err
            });
            /*res.status(400).json({
                ok:false,
                err
            });*/
            
        }

        if(!usuarioDB){
            return res.render('login',{
                message:'(Usuario) o constraseña incorrectos'
            });
            /*res.status(401).json({
                ok:false,
                err:{
                    message:'(Usuario) o constraseña incorrectos'
                }
            });*/
            
        }
        

        if(usuarioDB.password != password){
            return res.render('login',{
                message:'Usuario o (constraseña) incorrectos'
            });
            /*res.status(401).json({
                ok:false,
                err:'La contraseña es incorrecta'
            });*/
        }

        let token = jwt.sign({
            usuario: usuarioDB
        },'token-parrillas',
        {expiresIn:"24h"});

        res.render('home',{
            message:'Bienvenido: '+usuarioDB.usuario,
            token:token
        })

        /*res.json({
            ok:true,
            usuario:usuarioDB,
            token
        });*/
        
    });
    
});

module.exports = app;