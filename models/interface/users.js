const  mongoose  = require("mongoose");

userSchema=mongoose.Schema({

    user:String,
    password:String,
    rol:String


});

module.exports=mongoose.model("usuarios",userSchema);