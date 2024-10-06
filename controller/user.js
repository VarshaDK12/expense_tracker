const userService= require("../services/userService")
var createUser= async (req,res)=>{
   
   try{
      console.log(req.body)
       let status = await userService.createUserDBService(req.body)
       console.log(status)
       if(status){
         res.status(200).send({ status: "200", message: "User created successfully" });
       }else{
         res.status(400).send({ status: "400", message: "User created failed!" });
       }
   }
   catch(err){
      console.log(err)
   }
}

var loginUser = async(req,res)=>{
   try{
      console.log(req.body, "reqbody")
      let result = await userService.loginUserDbService(req.body)
      console.log(result, "response")
      if(result){
         res.status(200).send({status:"200", message:"User logged in successfully"})
      }else{
         res.status(400).send({status:"400", message:"User unable to login"})
      }
   }catch(err){
      console.log(err)
   }
}
module.exports={createUser, loginUser};