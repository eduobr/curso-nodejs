import express = require('express');
import path = require('path');

/*El default es por si alguien exporta algo de este archivo esto 
va a ser lo que se exporte por defecto*/
export default class Server {
    //app va a tener los metodos listen, use,etc
    public app: express.Application;
    public port: number;

    constructor(puerto: number) {
        this.port = puerto;
        this.app = express();
    }

    static init(puerto: number) {
        return new Server(puerto);
    }

    private publicFolder(){
        const publicPath = path.resolve(__dirname, '../public');

        this.app.use(express.static(publicPath));
    }

    start(callback: Function) {
        this.app.listen(this.port, callback());
        this.publicFolder();
    }
}