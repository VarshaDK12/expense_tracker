var mongoose= require("mongoose")
var schema = mongoose.Schema

const expenseSchema= new schema({
     expense_type:{
        type:String,
        required:true
     },
     expense_val:{
        type:Number,
        required:true
     },
     expense_date:{
        type:Date,
        required:true
     },
     userId:{
      type:String,
      ref:'user',
      required:true
     }
})

module.exports= mongoose.model("expense", expenseSchema)