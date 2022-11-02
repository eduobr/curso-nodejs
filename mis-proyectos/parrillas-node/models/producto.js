const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productoSchema = new Schema({
    tipoProducto:{
        type: Schema.Types.ObjectId, ref:'Tipo',
        required:true
    },
    nombre:{
        type: String,
        required: true
    },
    descripcion:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required: true
    },
    stock:{
        type:Number,
        default:0,
        required: true
    },
    img:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Producto',productoSchema);


