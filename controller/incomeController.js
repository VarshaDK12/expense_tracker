var incomeService=require("../services/incomeService")
var addIncomes = async (req,res)=>{
    try{
        var status = await incomeService.addIncomeDBService(req.body)
        if(status){
            res.status(201).send({status:201, message:"Income added successfully"})
        }else{
            res.status(400).send({status:400, message:"Error in adding Income"})
        }
    }catch(err){
        console.log(err)
    }
}
var getAllIncomes= async (req,res)=>{
    try{
        const userId= req.headers['userid']
        console.log(userId, "userId")
        if(!userId || userId == null  || userId == ""){
            res.status(400).send({status:400, message: "User Id is not in headers"})
        }
        else{
            var response = await incomeService.getAllIncomesDBService(userId)
            if(response){
                res.status(200).send({status:200, data:response})
            }else{
                res.status(400).send({status:400, message:"Error in adding Income"})
            }
        }
        
    }catch(err){
        console.log(err)
    }
}
var updateIncome= async (req,res)=>{
    try{
      var response= await incomeService.updateIncomeDBService(req.body)
      if(response){
        res.status(200).send({status:200, id:response._id, message:"Updated successfully"})
      }else{
        res.status(400).send({status:400,  message:"Failed to update"})
      }
    }catch(err){
        console.log(err)
    }
}

var deleteIncome= async (req,res)=>{
    try{
      var response= await incomeService.deleteIncomeDBService(req.body)
      if(response){
        res.status(200).send({status:200, id:response._id, message:"Deleted successfully"})
      }else{
        res.status(400).send({status:400,  message:"Failed to delete"})
      }
    }catch(err){
        console.log(err)
    }
}

var monthlySavings= async (req,res)=>{
    try{
        const curr_month = req.headers['month'] ? parseInt(req.headers['month']) : new Date().getMonth() + 1; // Default to current month
        const curr_year = req.headers['year'] ? parseInt(req.headers['year']) : new Date().getFullYear(); 
        console.log(curr_month, curr_year)
      var response= await incomeService.monthlySavingsDBService(curr_month, curr_year)
      if(response){
        console.log(response)
        res.status(200).send({response})
      }else{
        res.status(400).send({status:400,  message:"Failed to fetch savings"})
      }
    }catch(err){
        console.log(err)
    }
}
module.exports={addIncomes, getAllIncomes, updateIncome, deleteIncome, monthlySavings}