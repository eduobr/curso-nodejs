//.command('nombreComando','Información de ayuda',{objeto que recibe los parametros(flag)})
//demand es si el copmando es obligatorio
const opts = {
    base: {
        demand: true,
        alias: 'b'
    },
    limite: {
        alias: 'l',
        default: 10 //si no se introduce un valor se pondrá un 10
    }
}

const argv = require('yargs')
    .command('listar', 'Imprime en consola la tabla de multiplicar',opts)
    .command('crear', 'Genera un archivo con la tabla de multiplicar',opts)
    .help()
    .argv;

module.exports = {
	argv
}