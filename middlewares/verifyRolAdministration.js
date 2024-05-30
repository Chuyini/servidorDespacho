const {response, request} =require("express");
jwt=require("jsonwebtoken");
User=require("../models/interface/users");


const verifyAdminRol=(req=request,res=response,next)=>{

    if(!req.userActive){

        res.status(401).json({
            msg:"Permiso denegado"
        });

        return;
    }

    if(req.userActive.rol!="admin")
    {
        res.status(401).json({
            msg:"permiso denegado"
        });
        return;
    }

    next();


}

module.exports={verifyAdminRol}