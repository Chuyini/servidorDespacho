const express=require("express");
const cors=require("cors");
const mongosse=require("mongoose");




class Server{

    
    //esto es para que cuando instancie la clase, se manden llamar todas esta
    //variables y se configuren
    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        this.connection_string=process.env.CONNECTION_STRING;//base de datos link
        
        this.lawyerPath="/api/lawyer";
        this.userPath="/api/auth2";
        this.middlewares();
        this.routes();
        this.db();
    
    }

    //En este método estarán todas las rutas
    routes(){

        this.app.use(this.lawyerPath,require("./routes/lawyers"));
        this.app.use(this.userPath,require("./routes/auth"));

        
    }
    //Nos va a ayudar a hacer configuraciones a nuestro servidor
    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        
    }
   
    //Este metodo listen, no va dentro del constructor, ya nosotros decidimos donde hacerlo, no el constructor
    //eso nos da la flexibilidad de determinar en que situacion lo hacemos
    listen(){

        this.app.listen(this.port,()=>{//escuchar este puerto del construtor con este callback
            console.log(`servidor corriendo en el puerto ${this.port}`);
        });
    }

    db(){
         
        mongosse.connect(this.connection_string).then(//Que se haya podido conectar bien

            ()=>{
                console.log("conexion exitosa con la db");
            }
        ).catch(//Que se haya conectado mal
            (error)=>{
                console.log("Error al conectar con db",error);
            }

        )
    }
    
}

module.exports=Server;//Exportamos el archivo para que pueda ser usado en otros archivos