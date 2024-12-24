const mongoose = require("mongoose")

const set_sch = new mongoose.Schema({
  service_Id:{   //Gig
    type:mongoose.Schema.Types.ObjectId,
    ref:"Gig"
  },fees:{
    type:Number,
    required:true
  },gst:{
    type:String,
    required:true
  },
  delivery_charge:{
    type:Number,
    required:true
  },
  maxPrice:{
    type:Number,
    required:true
  },
  minPrice:{
    type:Number,
    required:true
  }


})

const settingModel = mongoose.model("setting_schema",set_sch)

module.exports = settingModel




// create
//  upadte any one
// service and setting deono ek sath dek na h