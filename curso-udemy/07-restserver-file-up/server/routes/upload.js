const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('../models/usuario');

const Producto = require('../models/producto');

const fs = require('fs');
const path = require('path');

app.use(fileUpload({ useTempFiles: true }));

app.put('/upload/:tipo/:id', function (req, res) {
	let tipo = req.params.tipo;
	let id = req.params.id;

	//si no vienen archivos
	if (!req.files) {
		return res.status(400)
			.json({
				ok: false,
				err: {
					message: 'No se ha seleccionado ningun archivo'
				}
			});
	}

	//Validar Tipo
	let tiposValidos = ['productos', 'usuarios'];
	if (tiposValidos.indexOf(tipo) < 0) {
		return res.status(400).json({
			ok: false,
			err: {
				message: 'Las tipos permitidos son ' + tiposValidos.join(', '),
				tipos: tipo
			}
		});
	}


	// The name of the input field (i.e. "archivo") is used to retrieve the uploaded file
	let archivo = req.files.archivo;

	//Extensiones permitidas
	let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
	let nombreCortado = archivo.name.split('.');

	let extension = nombreCortado[nombreCortado.length - 1];

	if (extensionesValidas.indexOf(extension) < 0) {
		return res.status(400).json({
			ok: false,
			err: {
				message: 'Las extensiones permitidas son ' + extensionesValidas.join(', '),
				ext: extension
			}
		});
	}

	//Cambiar nombre al archivo
	let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

	//${archivo.name}
	// Usa mv() para colocar el archivo
	archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
		if (err)
			return res.status(500).json({
				ok: false,
				err
			});

		if (tipo === 'usuarios') {
			imagenUsuario(id, res, nombreArchivo);
		} else if (tipo === 'productos') {
			imagenProducto(id, res, nombreArchivo);
		}
		//Aquí imagen cargada

		/*res.json({
			ok:true,
			message:'Imagen subida correctamente'
		});*/
	});
});

function imagenUsuario(id, res, nombreArchivo) {
	Usuario.findById(id, (err, usuarioDB) => {
		if (err) {
			//si sucede un error la imagen igual se sube
			//por lo que debemos borrarla
			borrarArchivo(nombreArchivo, 'usuarios');
			return res.status(500).json({
				ok: false,
				err
			});
		}

		if (!usuarioDB) {
			borrarArchivo(nombreArchivo, 'usuarios');
			return res.status(400).json({
				ok: false,
				err: {
					message: 'Usuario no existe'
				}
			});
		}

		//revisamos si existe el path
		/*let pathImagen = path.resolve(__dirname,`../../uploads/usuarios/${usuarioDB.img}`);
		if (fs.existsSync(pathImagen)) {
			//borramos la imagen existente
			fs.unlinkSync(pathImagen);
		}*/

		borrarArchivo(usuarioDB.img, 'usuarios');

		usuarioDB.img = nombreArchivo;

		usuarioDB.save((err, usuarioGuardado) => {
			res.json({
				ok: true,
				usuario: usuarioGuardado,
				img: nombreArchivo
			});
		});
	})
}


function imagenProducto(id, res, fileName) {
	let updatePic = {
		img: fileName
	}

	Producto.findOneAndUpdate({ _id: id }, updatePic, (err, oldProduct) => {
		if (err) {
			borrarArchivo(fileName, 'productos');
			return res.status(500).json({
				ok: false,
				err
			});
		}

		borrarArchivo(oldProduct.img, 'productos');

		res.json({
			ok: true,
			producto: oldProduct,
			img: fileName
		})
	})
}

/*function imagenProducto(id, res, nombreArchivo){
	Producto.findById(id, (err,productoDB)=>{
			if (err) {
			//si sucede un error la imagen igual se sube
			//por lo que debemos borrarla
			borrarArchivo(nombreArchivo, 'productos');
			return res.status(500).json({
				ok:false,
				err
			});
		}

		if (!productoDB) {
			borrarArchivo(nombreArchivo, 'productos');
			return res.status(400).json({
				ok:false,
				err:{
					message:'Producto no existe'
				}
			});
		}

		productoDB.save((err,productoGuardado)=>{
			res.json({
				ok:true,
				producto:productoGuardado,
				img:nombreArchivo
			})
		});
	});
}*/

function borrarArchivo(nombreImagen, tipo) {
	let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);

	if (fs.existsSync(pathImagen)) {
		//borramos la imagen existente
		fs.unlinkSync(pathImagen);
	}
}


module.exports = app;