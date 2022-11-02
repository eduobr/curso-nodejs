const express = require('express');

const _ = require('underscore');

let {verificaToken,verificaAdmin_Role} = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');

//=============================
// Mostrar todas las categorias
//=============================
app.get('/categoria',(req,res)=>{
	Categoria.find({})
			//para ordenar los elementos por la descripción
			.sort('descripcion')
			//con populate podemos mostrar las propiedades de un Schema relacionado
			.populate('id_usuario')
			.exec((err,categorias)=>{
		if (err) {
			return res.status(400).json({
				ok:false,
				err
			});
		}

		res.json({
			ok:true,
			categorias
		});
	});
});


//=============================
// Mostrar una categoria por ID
//=============================
app.get('/categoria/:id', (req, res)=>{
	//Categoria.findById(.....)
	let id = req.params.id;
	Categoria.findById(id,(err,categoriaDB)=>{
		if (err) {
			res.status(500).json({
				ok:false,
				err
			});
		}

		if (!categoriaDB) {
			res.status(500).json({
				ok:false,
				err:{
					message:'El ID no es correcto'
				}
			});
		}

		res.json({
			ok:true,
			categoriaDB
		});
	});
});

//=============================
// Crear nueva categoria
//=============================
app.post('/categoria', verificaToken,(req,res)=>{
	//crea la nueva categoria
	let body = req.body;
	
	let categoria = new Categoria({
		descripcion:body.descripcion,
		id_usuario:req.usuario._id
	});

	categoria.save((err,categoriaDB)=>{
		if (err) {
			return res.status(500).json({
				ok:false,
				err
			});
		}

		if (!categoriaDB) {
			return res.status(400).json({
				ok:false,
				err
			})
		}

		res.json({
			ok:true,
			categoria:categoriaDB
		});
	});
});


//=============================
// Actualizar Categoria
//=============================
app.put('/categoria/:id',(req,res)=>{
	let id = req.params.id;
	let body = _.pick(req.body,['descripcion']);

	Categoria.findByIdAndUpdate(id,body,{new:true, runValidators:true, context: 'query'},(err,categoriaDB)=>{
		if (err) {
			return res.status(500).json({
				ok:true,
				err
			});
		}

		if (!categoriaDB) {
			return res.status(400).json({
				ok:false,
				err
			})
		}

		res.json({
			ok:true,
			categoriaDB
		})
	})
});


app.delete('/categoria/:id', [verificaToken,verificaAdmin_Role], (req, res) => {
	//Solo un administrador puede borrar categorias
	//Categoria.findByIdAndRemove
	let id = req.params.id;

	Categoria.findByIdAndRemove(id,(err,categoriaBorrada)=>{
		if (err) {
			return res.status(400).json({
				ok:false,
				err
			});
		}
		if (!categoriaBorrada) {
			return res.status(400).json({
				ok:false,
				err:{message:'Categoria no encontrada'}
			})
		}
		res.json({
			ok:true,
			categoriaBorrada
		});
	});
});

module.exports=app;