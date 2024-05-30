const {request,response}=require("express");
const usuarios=require("../interface/users");
const { generateJWT } = require("../../helpers/jwt");


const login=(req=request, res=response)=>{

    const{user, password}=req.body;//obtenemos los datos del body

    usuarios.findOne({user:user,password:password}).then(

      (result)=>{

      
        
        if(result){
            //resultado satisfactorio de que si encontro los resulyados

            generateJWT(user).then((token)=>{

                res.status(200).json({
                    msg:"Login/",
                    token,
                    rol:result.rol

                });

            }).catch((error)=>{

                res.status(500).json({
                    msg:"Login/",
                    error
                });}
            )

        }else{

            res.status(500).json({
                msg:"Datos incorrectos"
           });



        }

    }).catch(
      (error)=>{//Algun error

        res.status(401).json({
          msg:"Error al iniciar sesion",
          
        });


      }
    );

    
};

const getUser=(req=request, res=response)=>{
    console.log("entro");

 
    const {searchTerm}=req.query;

    

    console.log(searchTerm)
    
    //{name:RegExp(searchTerm)}

    usuarios.find().then(
      (result)=>{//resultado satisfactorio de que si encontro los resulyados
        res.status(200).json({
          msg:"Controlador API abogados GET/",
          result,
          
        });

      }).catch(
      (error)=>{//Algun error

        res.status(200).json({
          msg:"Controlador API tvShows GET/ error al obtener los datos", error,
          result:[]
        });


      }
    );

    
};

const deleteUser=(req=request, res=response)=>{

  const {user}=req.query;//obtenemos todos los parametros de segmento
  

  
  
  usuarios.deleteOne({ user:user}).then(
    (result)=>{

      res.status(200).json({
        msg:"eliminacion realizada con exito",
        
      });

    }
  ).catch(
    (error)=>{
      res.status(500).json({
        msg:"No se pudo realizar la eliminacion",
        user
        
    });
    }
  )

};

const createUser=(req=request, res=response)=>{

  const {
      user,
      rol,
      password,
    
  } = req.body;//Vemos que habia en el boy para llenar los datos
  console.log(user);

  if(!user||!rol||!password){//hacemos las validaciones
    res.status(400).json({//este codigo de respuesta hace referencia a cuando hacemos peticion con datos incorrectos
      msg:"Datos faltantes o incorrectos",
      
    });
    return;//para que ya no ejecute lo demasD
  }

  const newUser=usuarios({//todos lo elementos que vamos a subir para generar uno nuevo

      user: user,
      rol: rol,
      password: password
    
  })

newUser.save(/*aqui guardamos en la base de datos*/).then(
  ()=>{

    res.status(200).json({
      msg:"Exito al subir el nuevo elemento"
    });

  }
).catch(
  ()=>{

    res.status(500).json({
      msg:"No hubo exito al subir el nuevo elemento"
    });
  }
);
  

    
};

const updateUser=(req=request, res=response)=>{

  const {rol, user } = req.query;//llenar atraves de los que llegan del request body

  if(!rol||!user){//hacemos las validaciones
    res.status(400).json({//este codigo de respuesta hace referencia a cuando hacemos peticion con datos incorrectos
      msg:"Datos faltantes o incorrectos"
    });
    return;//para que ya no ejecute lo demasD
  }
  usuarios.updateOne({user:user},{rol: rol /*filtro por el que se buca y elementos a cambiar*/}).then(
    (result)=>{
      res.status(200).json({
        msg:"Elemento actualizado con exito",
        result
    });
    }
  ).catch(
    (error)=>{
      res.status(500).json({
        msg:"Error al actualizar",
        error
    });
    }
  );    
};
module.exports ={

    login,getUser,deleteUser,createUser,updateUser
   
}
