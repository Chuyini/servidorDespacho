const {request,response}=require("express");
const abogados=require("../interface/lawyer");



const createLawyers=(req=request, res=response)=>{

    const {
        name,
        specialty,
        hourlyRate,
        description,
        image,
        id,
        phone
    } = req.body;//Vemos que habia en el boy para llenar los datos
    console.log(id);
  
    if(!name||!id||!specialty||!image||!hourlyRate||!description||!phone){//hacemos las validaciones
      res.status(400).json({//este codigo de respuesta hace referencia a cuando hacemos peticion con datos incorrectos
        msg:"Datos faltantes o incorrectos",
        
      });
      return;//para que ya no ejecute lo demasD
    }
  
    const newLawyer=abogados({//todos lo elementos que vamos a subir para generar uno nuevo
  
        specialty: specialty,
        hourlyRate: hourlyRate,
        description: description,
        image: image,
        phone: phone,
        name:name,
        id:id
    })
  
  newLawyer.save(/*aqui guardamos en la base de datos*/).then(
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

const updateLawyers=(req=request, res=response)=>{

    const {Id}=req.params;
    console.log("parametro"+Id);

    const {
        name,
        specialty,
        hourlyRate,
        description,
        image,
        id,
        phone
    } = req.body;//llenar atraves de los que llegan del request body

   

    if(!name||!id||!specialty||!image||!hourlyRate||!description||!phone){//hacemos las validaciones
      res.status(400).json({//este codigo de respuesta hace referencia a cuando hacemos peticion con datos incorrectos
        msg:"Datos faltantes o incorrectos"
      });
      return;//para que ya no ejecute lo demasD
    }
    abogados.updateOne({id:Id},{name: name,
        specialty: specialty,
        hourlyRate: hourlyRate,
        description: description,
        image: image,
        phone: phone /*filtro por el que se buca y elementos a cambiar*/}).then(
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
const deleteLawyers=(req=request, res=response)=>{

    const {id}=req.params;//obtenemos todos los parametros de segmento
  
    
    abogados.deleteOne({ id:id }).then(
      (result)=>{
  
        res.status(200).json({
          msg:"eliminacion realizada con exito",
          
        });
  
      }
    ).catch(
      (error)=>{
        res.status(500).json({
          msg:"No se pudo realizar la eliminacion",error
          
      });
      }
    )
  
  };


const getLawyers=(req=request, res=response)=>{
    console.log("entro");

 
    const {searchTerm}=req.query;

    console.log(searchTerm)
    
    

    abogados.find({name:RegExp(searchTerm)}).then(
      (result)=>{//resultado satisfactorio de que si encontro los resulyados
        res.status(200).json({
          msg:"Controlador API abogados GET/",
          result,
          searchTerm
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




module.exports ={

         getLawyers,updateLawyers,deleteLawyers,createLawyers
        
}