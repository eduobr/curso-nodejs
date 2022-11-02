
//const multiplicar = require('./multiplicar/multiplicar'); Si lo definimos de esta forma
//                      luego debemos llamar al metodo así multiplicar.crearArchivo(base)

//ocupamos la destructuración de objetos
const {crearArchivo,listar} = require('./multiplicar/multiplicar')

//le asignamos directamente el .argv para despues no tener que declarar argv.argv.base,etc
const argv = require('./config/yargs').argv;

const colors = require('colors/safe');


let comando = argv._[0];

switch (comando) {
	case 'listar':
		console.log('Listar');
		listar(argv.base,argv.limite)
		break;
	case 'crear':
		console.log('Crear');
		crearArchivo(argv.base,argv.limite)
			.then(archivo =>console.log(`Archivo creado:`,colors.green(archivo)))
			.catch(e=>console.log(e));
		break;
	default:
		console.log('Comando no reconocido');
		break;
}

//console.log(argv)

/*let parametro=argv[2];//guardamos lo que mandemos por parametro en consola
let base = parametro.split('=')[1]; //tomamos solamente nuestro numero*/



