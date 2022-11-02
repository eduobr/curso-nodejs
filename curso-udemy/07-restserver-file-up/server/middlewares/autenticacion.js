const jwt = require('jsonwebtoken');

// ========================
// Verificar Token
// ========================

let verificaToken = (req,res, next) =>{
	//Obtenemos el header llamado 'token'
	let token = req.get('token');

	//Verificar la veracidad del token
	//En el decoded se encuentra la información del usuario
	jwt.verify(token,process.env.SEED,(err,decoded)=>{
		if (err) {
			//No autorizado
			return res.status(401).json({
				ok:false,
				err:{
					message:'Token no valido'
				}
			});
		}

		req.usuario = decoded.usuario;

		next();
	});

	//Muestra el token
	/*res.json({
		token:token
	});*/
}

let verificaAdmin_Role = (req, res, next) =>{
	let usuario = req.usuario;

	if (usuario.role === "ADMIN_ROLE") {
		next();
	}else{
		return res.json({
			ok:false,
			err:{
				message:'El usuario no es administrador'
			}
		});
	}

}

// ========================
// Verificar Token para imagen
// ========================

let verificaTokenImg = (req,res, next) =>{
	let token = req.query.token;

		jwt.verify(token,process.env.SEED,(err,decoded)=>{
		if (err) {
			//No autorizado
			return res.status(401).json({
				ok:false,
				err:{
					message:'Token no valido'
				}
			});
		}

		req.usuario = decoded.usuario;

		next();
		
	});

	/*res.json({
		token
	})*/
}

module.exports = {
	verificaToken,
	verificaAdmin_Role,
	verificaTokenImg
}