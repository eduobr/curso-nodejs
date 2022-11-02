'use strict'

//requerimos nuestro archivo de conexión movies(myexpressconnection)
var movies = require('../models/movies'), 
	express = require('express'),
    router = express.Router();

function error404(req, res, next)
{
	let error = new Error()
	let locals={
		title:'Error 404',
		description: 'Recurso no encontrado',
		error: error
	}
	error.status = 404
	res.render('error',locals)
	next() //ejecuta el siguiente middleware dentro de la pila de middleware
}



router
	//ya que todas las rutas usan la conexion tenemos que decirle a 
	//router que usa movies
	.use(movies)
	//generamos el middleware que va a trabajar en el home via get
	.get('/',(req,res,next)=>{
		//llamamos a la variable movies que requiere nuestro archivo de conexión
		//recibe un error o los datos
		req.getConnection((err, movies)=>{
			//el callback devuelve un error y si no devuelve las filas
			movies.query("SELECT * FROM movie", (err,rows)=>{
				if (err) {
					next(new Error('No hay registros de Películas'))
				}else{
					let locals = {
						title : 'Lista de Películas',
						data : rows
					}
				}
				res.render('index',locals)
			})
		})
		//no tenemos que ejecutar el siuiente middleware en el stack del archivo
		//ya que solamente son rutas, solamente debemos ejecutarlo cuando
		//tenga dependencias de un middleware a otro
		//next()
	})
	.get('/agregar',(req,res,next)=>{
		res.render('add-movie',{title : 'Agregar Película'})
	})
	.post('/', (req,res,next) =>{
		req.getConnection((err,movies)=>{
			let movie = {
				//recojemos los elementos del formulario y los guardamos en movie
				movie_id : req.body.movie_id,
				title:req.body.title,
				release_year:req.body.release_year,
				rating:req.body.rating,
				image:req.body.image
				}
			console.log(movie)
			//esta es una variante del Insert into
			movies.query('INSERT INTO movie SET ?',movie,(err,rows)=>{
				return (err) ? next(new Error('Error al Insertar')) : res.redirect('/')
			})
		})
	})
	//el paso de paramatros en express es con :
	.get('/editar/:movie_id',(req,res,next)=>{
		let movie_id = req.params.movie_id
		console.log(movie_id)
		req.getConnection((err,movies)=>{
			//si el query está bien envia los datos a rows
			movies.query('SELECT * FROM movie WHERE movie_id = ?',movie_id,(err,rows)=>{
				//rows es un arreglo con los datos de la pelicula
				console.log(err,'---',rows)
				if (err) {
					next(new Error('Registro No Encontrado'))
				}else{
					let locals={
						title : 'Editar Película',
						data : rows
					}
					res.render('edit-movie',locals)
				}
			})
		})
	})
	.post('/actualizar/:movie_id',(req,res,next)=>{
		req.getConnection((err,movies)=>{
			let movie = {
				//recojemos los elementos del formulario y los guardamos en movie
				movie_id : req.body.movie_id,
				title:req.body.title,
				release_year:req.body.release_year,
				rating:req.body.rating,
				image:req.body.image
				}
			console.log(movie)
			//como vamos a pasar mas de un comodin(?) debemos pasar como arreglo
			//el primero son todas las propiedades de movie y el segundo solo el id
			movies.query('UPDATE movie SET ? WHERE movie_id=?',[movie,movie.movie_id],(err,rows)=>{
				return (err) ? next(new Error('Error al Actualizar')) : res.redirect('/')
			})
		})
		.post('/eliminar/:movie.movie_id',(req,res,next)=>{
			let movie_id = req.params.movie_id
			console.log(movie_id)
			req.getConnection((err,movies)=>{
				//si el query está bien envia los datos a rows
				movies.query('Delete * FROM movie WHERE movie_id = ?',movie_id,(err,rows)=>{
					return (err) ? next(new Error('Registro No Encontrado')) : res.redirect('/')
				})
			})
		})
	})
	.use(error404) //este middleware de error tiene que estar al final de las rutas

module.exports = router