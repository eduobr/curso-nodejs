const express = require('express');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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


//Configuraciones de Google
async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  //en el payload esta toda la informacion del usuario
  const payload = ticket.getPayload();
  //const userid = payload['sub'];

  return {
  	nombre:payload.name,
  	email:payload.email,
  	img:payload.picture,
  	google:true
  }
}

app.post('/google',async (req,res)=>{
	let token = req.body.idtoken;

	let googleUser = await 	verify(token)
								.catch(e=>{
									return res.status(403).json({
										ok:false,
										err:e
									});
							});

	Usuario.findOne({email:googleUser.email},(err,usuarioDB)=>{
		if (err) {
			return res.status(500).json({
				ok: false,
				err
			});
		}

		//Si existe el usuario
		if (usuarioDB) {
			//si no se ha autenticado por google
			if (usuarioDB.google===false) {
					return res.status(400).json({
					ok: false,
					err:{
						message:'Debe de usar su atenticación normal'
					}
				});
			}else{
			//Usuario atenticado previamente pero se le renueva el token
				let token = jwt.sign({
								usuario: usuarioDB
							},process.env.SEED,
							{expiresIn: process.env.CADUCIDAD_TOKEN});

				return res.json({
					ok:true,
					usuario:usuarioDB,
					token
				});
			}
		}else{
			//Si el usuario no existe en nuestra base de datos
			let usuario = new Usuario();
			usuario.nombre = googleUser.nombre;
			usuario.email = googleUser.email;
			usuario.img = googleUser.img;
			usuario.google = true;
			usuario.password = ':)';

			usuario.save((err,usuarioDB)=>{
				if (err) {
					return res.status(500).json({
						ok: false,
						err
					});
				}

				let token = jwt.sign({
								usuario: usuarioDB
							},process.env.SEED,
							{expiresIn: process.env.CADUCIDAD_TOKEN});

				return res.json({
					ok:true,
					usuario:usuarioDB,
					token
				});

			});
		}
	});
	
	/*res.json({
		usuario:googleUser
	});*/
});

module.exports = app;