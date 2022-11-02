//para iniciar el servidor debemos ejecutar: nodemon dist/index
import Server from "./server/server";
import router from "./router/router";
import MySQL from "./mysql/mysql";

console.log('Código de Typescript');

const server = Server.init(3000);

server.app.use(router);

//const mysql = new MySQL();
//lo siguiente va a llamar al get por lo que no será necesaria la linea anterior
MySQL.instance;

server.start(()=>{
    console.log('Servidor corriendo en el puerto 3000');
})

