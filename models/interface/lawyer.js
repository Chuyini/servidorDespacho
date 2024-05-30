const  mongoose  = require("mongoose");

lawyerSchema=mongoose.Schema({

    name:String,
    specialty:String,
    description:String,
    hourlyRate:Number,
    image:String,
    id:Number,
    phone:String


});

module.exports=mongoose.model("abogados",lawyerSchema);