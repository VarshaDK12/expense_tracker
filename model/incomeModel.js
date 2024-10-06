var mongoose= require("mongoose")
var schema = mongoose.Schema

const incomeSchema= new schema({
     income_type:{
        type:String,
        required:true
     },
     income_val:{
        type:Number,
        required:true
     },
     income_date:{
        type:Date,
        required:true
     },
     userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user',
      required:true
     }
})

module.exports= mongoose.model("income", incomeSchema)