const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'descripción de la tarea por hacer'
};
const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente la tarea'
}

const argv = require('yargs')
    .command('crear', 'Crea un elemento por hacer', {
        descripcion
    })
    .command('listar','Listar tareas por hacer',{
    	completado:{
    		alias:'c'
    	}
    })
    .command('actualizar', 'Actualiza el estado de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Borra una tarea', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv,
}