let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    usuario:{
        type:String,
        required:[true, 'El usuario es requerido']
    },
    password:{
        type:String,
        required:[true, 'La contraseña es requerida']
    },
    email:{
        type:String,
        required:[true, 'El email es requerido']
    },
    estado:{
        type:Boolean,
        default:true
    }

});

usuarioSchema.methods.toJSON = function(){
    let user = this;

    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

module.exports = mongoose.model('Usuario',usuarioSchema);