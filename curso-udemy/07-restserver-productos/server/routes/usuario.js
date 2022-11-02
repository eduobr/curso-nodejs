const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

//Usuario del modelo 
const Usuario = require('../models/usuario');

const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();

//verificaToken es un middleware
app.get('/usuario', verificaToken, function (req, res) {
	let desde = req.query.desde || 0; //si no se envia el param, este será 0
	desde = Number(desde);

	let limite = req.query.limite || 5;
	limite = Number(limite);

	//Muestra solo a los usuarios que tengan un estado true
	//Y solo muestra los campos nombre, email, role, estado, google, img
	Usuario.find({ estado: true }, 'nombre email role estado google img')
		.skip(desde) //se salta los primeros 5 registros
		.limit(limite) //para obtener 5 usuarios
		.exec((err, usuarios) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				})
			}

			Usuario.count({ estado: true }, (err, conteo) => {
				res.json({
					ok: true,
					cuantos: conteo,
					usuarios
				});
			});

		});

	//El req.usuario viene desde el verificaToken por lo que podemos
	//obtener todas las propiedades del usuario
	/*return res.json({
		  usuario:req.usuario,
		  nombre:req.usuario.nombre,
		  email:req.usuario.email
	});*/

});

app.post('/usuario', [verificaToken, verificaAdmin_Role], function (req, res) {
	let body = req.body;

	let usuario = new Usuario({
		nombre: body.nombre,
		email: body.email,
		password: bcrypt.hashSync(body.password, 10),
		role: body.role
	});

	//Si el usuario se guardo correctamente me retorna un usuarioDB
	usuario.save((err, usuarioDB) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			})
		}

		usuarioDB.password = null;

		res.json({
			ok: true,
			usuario: usuarioDB
		})
	});
});

app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], function (req, res) {
	let id = req.params.id;
	//con el paquete underscore validamos que solo las propiedades dentro del []
	//se puedan actualizar
	let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

	//Eliminar Propiedades para que no puedan ser actualizadas
	//delete body.password;
	//delete body.google;

	//con {new:true} enviamos el objeto luego de la modificación
	Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {

		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			usuario: usuarioDB
		})

	});

});

app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], function (req, res) {
	let id = req.params.id;

	let cambiaEstado = {
		estado: false
	};
	//
	Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioDB) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			usuario: usuarioDB
		})

	});

	//Eliminar Usuario de la DB
	/*Usuario.findByIdAndRemove(id,(err,usuarioBorrado)=>{
		  if(err){
			  return res.status(400).json({
				  ok:false,
				  err
			  });
		  }
  
		  if(!usuarioBorrado){
			  return res.status(400).json({
				  ok:false,
				  err:{
					  message:'Usuario no encontrado'
				  }
			  });
		  }
		  res.json({
			  ok:true,
			  usuario:usuarioBorrado
		  })
	})
	*/
});

module.exports = app