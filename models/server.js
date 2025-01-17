const express = require('express')
const cors = require('cors')
const routes = require('../routes/pokemon')


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT

        //Middlewares
        this.middlewares();

        //Application Routes
        this.routes();

        this.app.use('/api', routes);


    }


    middlewares(){

        //CORS
        this.app.use( cors() );

        //Public Folder
        this.app.use( express.static('public') );

        this.app.use(express.json());


    }

    routes(){
        this.app.get('/api', (req, res)=>{
            res.json({
                "msg": "get API"
            })
        })

        this.app.put('/api', (req, res)=>{
            res.status(400).json({
                "msg": "put API"
            })
        })

        this.app.post('/api', (req, res)=>{
            res.status(201).json({
                "msg": "post API"
            })
        })

        this.app.delete('/api', (req, res)=>{
            res.json({
                "msg": "delete API"
            })
        })

        this.app.patch('/api', (req, res)=>{
            res.json({
                "msg": "patch API"
            })
        })
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Servidor corriendo en puerto", this.port)
        })
    }

}


module.exports = Server