var mongoose=require("mongoose")
var Schema = mongoose.Schema

var userSchema= new Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type: Boolean,
        required:false,
        default:false
    }
})

module.exports=mongoose.model('user', userSchema)