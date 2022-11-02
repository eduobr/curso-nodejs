const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos={
	values:['ADMIN_ROLE','USER_ROLE'],
	message:'{VALUE} no es un rol válido'
}

let usuarioSchema = new Schema({
	nombre:{
		type: String,
		required:[true, 'El nombre es necesario']
	},
	email:{
		type: String,
		unique:true,
		required:[true, 'El correo es necesario']
	},
	password:{
		type:String,
		required:[true, 'La constraseña es obligatoria']
	},
	img:{
		type:String,
		required:false
	},
	role:{
		type:String,
		default:'USER_ROLE',
		enum: rolesValidos
	},
	estado:{
		type:Boolean,
		default:true
	},
	google:{
		type:Boolean,
		default:false
	}
});

//el metodo toJSON es llamado cada vez que se imprime el objeto
usuarioSchema.methods.toJSON = function(){
	let user=this;

	//con esto obtenemos todas las propiedades y metodos
	let userObject = user.toObject();
	delete userObject.password;

	return userObject;
}


//Para personalizar el mensaje de error, PATH es el email
usuarioSchema.plugin(uniqueValidator,{message:'{PATH} debe de ser unico'})

module.exports=mongoose.model('Usuario',usuarioSchema);