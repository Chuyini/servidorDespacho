require("dotenv").config();//solicitamos  la dependecia


const Server=require("./models/server");//importamos el archivo

const server=new Server();//instanciamos un objeto de la clase

server.listen();//hacemos uso del método listen