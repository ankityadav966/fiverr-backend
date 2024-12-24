// contact table - 
// user_id 
// desc
// email
// phone
// query_solved - true and false  default - false 
// result - string

const mongoose = require("mongoose");

const contactsccheema = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    phone:{
        type:Number
    },
    query_solved:{
        type: Boolean,
        default:false,
    },
    result:{
        type:String
    }
})


const contactmodal = mongoose.model("contact",contactsccheema)


module.exports =contactmodal;