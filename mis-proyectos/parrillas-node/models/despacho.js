const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Si lo retira en la tienda, las tres fechas son la misma

let despachoSchema = new Schema({
    fechaTansito:{
        type:Date
    },
    fechaDespacho:{
        type:Date
    },
    fechaRecepcion:{
        type:Date
    },
    estado:{
        type:String,
        required:true
    },
    venta:{
        type:Schema.Types.ObjectId, ref:'Venta'
    }
});

module.exports = mongoose.model('Despacho',despachoSchema);