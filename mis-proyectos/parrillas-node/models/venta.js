const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ventaSchema = new Schema({
    persona:{
        type: Schema.Types.ObjectId, ref:'Persona',
        required:true
    },
    productos:[
        {
            type: Schema.Types.ObjectId, ref: 'Producto',
            required:true
        }
    ],
    total:{
        type:Number,
        required:true
    },
    fecha:{
        type:Date,
        required:true
    }
});

module.exports = mongoose.model('Venta',ventaSchema);