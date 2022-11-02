const express = require('express');

const {verificaToken} = require('../middlewares/autenticacion');

let app = express();
let Producto = require('../models/producto');
//===========================================
// Buscar productos
//===========================================
app.get('/productos/buscar/:termino',(req,res)=>{
	let termino = req.params.termino;

	//Para que la busqueda mas flexible
	//al colocarle 'i' le decimos 'case-insensitive' (no sensible a mayúsculas).
	let regex =  new RegExp(termino,'i');

	Producto.find({'nombre':regex})
		.populate('categoria','nombre')
		.exec((err,productos)=>{
			if (err) {
				return res.status(500).json({
					ok:false,
					err
				});
			}

			res.json({
				ok:true,
				productos
			})
		})
});

//===========================================
// Obtener Productos
//===========================================
app.get('/productos',(req,res)=>{
	//trae todos los productos
	//populate: usuario categoria
	//paginado

	let desde = req.query.desde || 0;
	desde = new Number(desde);

	Producto.find({disponible:true})
			.skip(desde)
			.limit(5)
			.populate('usuario','nombre email')
			.populate('categoria', 'descripcion')
			.exec((err,productos)=>{
				if (err) {
					return res.status(500).json({
						ok:false,
						err
					});
				}
				res.json({
					ok:true,
					productos
				});
			});

});


//===========================================
// Obtener un producto por ID
//===========================================
app.get('/productos/:id',(req,res)=>{
	//populate: usuario categoria
	//paginado

	let id = req.params.id;

	Producto.findById(id)
					.populate('usuaro','nombre email')
					.populate('categoria','nombre')
					.exec((err,productoDB)=>{
						if (err) {
									return res.status(500).json({
										ok:false,
										err
									});
						}

						res.json({
							ok:true,
							producto:productoDB
						})
					});
	

});


//===========================================
// Crear un nuevo producto
//===========================================
app.post('/productos',verificaToken,(req,res)=>{
	//grabar el usuario
	//grabar una categoria del listado
	let body = req.body;
	let producto = new Producto({
		nombre:body.nombre,
		precioUni:body.precioUni,
		descripcion:body.descripcion,
		disponible:body.disponible,
		categoria:body.categoria,
		usuario:req.usuario._id
	});

	producto.save((err,productoDB)=>{
		if (err) {
			return res.status(500).json({
				ok:false,
				err
			});
		}

		res.status(201).json({
			ok:true,
			producto:productoDB
		})
	});
});

//===========================================
// Actualizar un nuevo producto
//===========================================
app.put('/productos/:id',(req,res)=>{
	//actualizar el usuario
	//actualizar una categoria del listado

	let id = req.params.id;
	let body = req.body;

	Producto.findById(id,(err,productoDB)=>{
		if (err) {
			return res.status(500).json({
				ok:false,
				err
			});
		}
		if (!productoDB) {
			return res.status(500).json({
				ok:false,
				err:{
					message:'El ID no existe'
				}
			});
		}

		productoDB.nombre = body.nombre
		productoDB.precioUni = body.precioUni
		productoDB.descripcion = body.descripcion
		productoDB.disponible = body.disponible
		productoDB.categoria = body.categoria
		
		productoDB.save((err,productoGuardado)=>{
			if (err) {
				return res.status(500).json({
					ok:false,
					err
				});

			}
			res.json({
				ok:true,
				producto:productoGuardado
			});
		});

	})
});

//===========================================
// Borrar un producto
//===========================================
app.delete('/productos/:id',(req,res)=>{
	//cambiar estado de disponible
	let id = req.params.id;

	Producto.findById(id,(err,productoDB)=>{
						if (err) {
							return res.status(500).json({
								ok:false,
								err
							});
						}

						if (!productoDB) {
							return res.status(500).json({
								ok:false,
								err:{
									message:'El ID no existe'
								}
							});
						}

						productoDB.disponible = false;

						productoDB.save((err,productoBorrado)=>{
							if (err) {
								return res.status(500).json({
									ok:false,
									err
								});
							}

							res.json({
								ok:true,
								producto:productoBorrado,
								mensaje:'Producto Borrado'
							})
						});
					});

});

module.exports = app;