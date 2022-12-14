const express = require('express');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const app = express();

app.post('/login',(req,res)=>{
	let body = req.body;
	Usuario.findOne({email:body.email},(err,usuarioDB)=>{
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		//Si el usuario de la BD no existe
		if(!usuarioDB){
			return res.status(400).json({
				ok:false,
				err:{
					message:'(Usuario) o contraseña incorrectos'
				}
			});
		}

		//Si la contraseña dada encriptada no es igual a la constraseña
		//extraida de la base de datos
		if(!bcrypt.compareSync(body.password, usuarioDB.password)){
			return res.status(400).json({
				ok:false,
				err:{
					message:'Usuario o (contraseña) incorrectos'
				}
			});
		}

		//el siguiente token expira en 30 dias
		let token = jwt.sign({
			usuario: usuarioDB //información que queremos almacenar (payload)
		},process.env.SEED,//firma del token
		{expiresIn: process.env.CADUCIDAD_TOKEN}); //60s 60m 24h 30d

		res.json({
			ok:true,
			usuario: usuarioDB,
			token
		});

	});
});

module.exports = app;