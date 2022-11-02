const mongoose = require('mongoose');

const uniqueValidator =  require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
	descripcion:{
		type: String,
		unique: true,
		required: [true,'La descripción de la categoria es requerido']
	},
	id_usuario:{
		type: Schema.Types.ObjectId, ref: 'Usuario',
		required:true
	}
});

categoriaSchema.plugin(uniqueValidator,{message:'{PATH} debe ser unico'});

module.exports = mongoose.model('Categoria',categoriaSchema);