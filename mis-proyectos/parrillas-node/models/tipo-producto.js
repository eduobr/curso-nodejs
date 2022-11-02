let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/*
    Tipo producto:-Parrilla
                  -Campana
                  -Espada
*/

let tipoProductoSchema = new Schema({
    descripcion:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Tipo',tipoProductoSchema);