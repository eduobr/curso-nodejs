'use strict'

function singleThread()
{
	process.argv[2]='Estamos aprendiendo Node.js'
	process.argv[3]=19
	process.argv[4]=null
	process.argv[5]=true

	console.log('-----------------------------------------')
    console.log('         El PROCESO DE NODE.JS')
    console.log('Id del proceso..............'+process.pid)       //node les da un id de proceso
    console.log('Titulo......................'+process.title)     //titulo del proceso, depende de donde se ejecute
    console.log('Directorio de Node..........'+process.execPath)  //donde de se ejecuta node
    console.log('Directorio Actual...........'+process.cwd())
    console.log('Versión de Node.............'+process.version)
    console.log('Versiones de Dependencias...'+process.versions)
    console.log('Plataforna (S.O)............'+process.platform)
    console.log('Arquitectura(S.O)...........'+process.arch)
    console.log('Tiempo activo de Node.......'+process.uptime())
    console.log('Arumentos del proceso.......'+process.argv)      //argv es un arreglo muestra la ruta de nuestro archivo y el de node
    console.log('----------------------------------------------')

    for (var key in process.argv) {
    	console.log(process.argv[key])
    }
}

singleThread()