const express = require('express');
const cors = require('cors');

const { connectionDb } = require('../database/config');
 
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //conectar a base de datos
        this.conectarBD();
        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    async conectarBD() {
        await connectionDb();
    }

    middlewares() {
        //Cors
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        //directorio público
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user')); 
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }
}

module.exports = Server;