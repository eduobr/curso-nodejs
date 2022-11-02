import mysql = require('mysql');

export default class MySQL {
    private static _instance:MySQL;
    cnn: mysql.Connection;
    conectado:boolean = false;

    constructor(){
        console.log('Clase inicializada');

        this.cnn = mysql.createConnection({
            host:'localhost',
            user:'node_user',
            password:'123456',
            database:'node_db'
        });

        //this.cnn.connect();
        this.conectarDB();
    }

    public static get instance(){
        //cuando se haga el get instance se va a verificar que haya una instancia
        //si no existe va a llamar el constructor y va a inicializarlo
        //y toda la clase va a ser almacenada en this._instance
        return this._instance || (this._instance = new this());
    }

    //si creamos un metodo estatico puede que las propiedades no esten inicializadas
    //por eso llamamos this.instance
    static ejecutarQuery(query:string, callback:Function){
        //con el instance llamamos al get e inicializamos la clase
        this.instance.cnn.query(query, (err, results:Object[], fields)=>{
            if(err){
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }

            if(results.length===0){
                callback('El registro solicitado no existe');
            }else{
                callback(null, results);
            }
        })
    }

    private conectarDB(){
        this.cnn.connect((err:mysql.MysqlError)=>{
            if(err){
                console.log(err.message);
                return;
            }

            this.conectado = true;
            console.log('Base de datos online!');
        });
    }
}