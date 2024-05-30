const jwt=require("jsonwebtoken");
const {request,response}=require("express");
const User=require("../models/interface/users");


const validateJWT=(req=request,res=response, next)=>{


    const token = req.header("Authorization");//en el  parentesis va el campo que queremos acceder
    if(!token)//No recibio el token  o el campo esta vacío 
    {
        res.status(401).json({
            msg:"Token invalido"
        });
        return;
    }

    try{

    const{id}=jwt.verify(token,process.env.SECRET_KEY);
    User.findOne({user:id}).then(

        (result)=>{
            if(result){
                
                req.userActive=result;

                //el token es valido
                next()//si todo salio bien, usamos la variable neext que es una funcion que nos
                //permite seguir con la peticion

            }else{
                //el token no es valido usuario incorrecto

                res.status(401).json({

                    msg:"El token no es valido"
                });
                return;

            }
        }

    ).catch((error)=>{

        res.status(500).json({

            msg:"error"


        });
        return;
    });
    }catch(error){

    
    res.status(401).json({
        msg:"token invalido 3212"
    });

    }
    

    
    
}

module.exports={
    validateJWT
}