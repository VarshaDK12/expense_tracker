var expenseService=require("../services/expenseService")
var addExpenses = async (req,res)=>{
    try{
        var status = await expenseService.addExpenseDBService(req.body)
        if(status){
            res.status(201).send({status:201, message:"Expense added successfully"})
        }else{
            res.status(400).send({status:400, message:"Error in adding expense"})
        }
    }catch(err){
        console.log(err)
    }
}
var getAllExpenses= async (req,res)=>{
    try{
        const userId= req.headers['userid']
        console.log(userId, "userId")
        if(!userId || userId == null  || userId == ""){
            res.status(400).send({status:400, message: "User Id is not in headers"})
        }
        else{
            var response = await expenseService.getAllExpensesDBService(userId)
            if(response){
                res.status(200).send({status:200, data:response})
            }else{
                res.status(400).send({status:400, message:"Error in adding expense"})
            }
        }
        
    }catch(err){
        console.log(err)
    }
}
var updateExpense= async (req,res)=>{
    try{
      var response= await expenseService.updateExpenseDBService(req.body)
      if(response){
        res.status(200).send({status:200, id:response._id, message:"Updated successfully"})
      }else{
        res.status(400).send({status:400,  message:"Failed to update"})
      }
    }catch(err){
        console.log(err)
    }
}

var deleteExpense= async (req,res)=>{
    try{
      var response= await expenseService.deleteExpenseDBService(req.body)
      if(response){
        res.status(200).send({status:200, id:response._id, message:"Deleted successfully"})
      }else{
        res.status(400).send({status:400,  message:"Failed to delete"})
      }
    }catch(err){
        console.log(err)
    }
}
module.exports={addExpenses, getAllExpenses, updateExpense, deleteExpense}