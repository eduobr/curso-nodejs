const jwt = require('jsonwebtoken');

let verificaToken = (req,res,next)=>{
    let token = req.query.token;
    jwt.verify(token,'token-parrillas',(err,decoded)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                err:{
                    message:'Token no valido'
                }
            })
        }

        req.usuario = decoded.usuario;

        next();
    });
}

module.exports = {
    verificaToken
}