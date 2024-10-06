var expenseModel= require("../model/expenseModel")
var mongoose= require("mongoose")
const ObjectId = mongoose.Types.ObjectId;

module.exports.addExpenseDBService=(expenseDetails)=>{

    return new Promise(function myFn(resolve,reject){
        var expenseModelData= new expenseModel()
        expenseModelData.userId= expenseDetails.userId
        expenseModelData.expense_type= expenseDetails.expense_type;
        expenseModelData.expense_val= expenseDetails.expense_val;
        expenseModelData.expense_date= expenseDetails.expense_date;

        expenseModelData.save()
        .then(()=> {
            console.log("Expense added successfully");
            resolve(true)
         })
         .catch(err=>{
            console.log("Error in adding expense:", err);
            reject(err);  
         })
    }) 


}

module.exports.getAllExpensesDBService=(userId)=>{
    return new Promise(function myFn(resolve, reject){
        console.log(userId, "123")
        expenseModel.find({userId:userId})
        .then((expense)=>{
            console.log("All expenses received", expense);
            resolve(expense)
        })
        .catch(err=>{
            console.log("Error in fetching expenses");
            reject(err)
        })
    })
}

module.exports.updateExpenseDBService=(expenseDetail)=>{
    return new Promise(function myFn(resolve,reject){
       expenseModel.findOne({_id:expenseDetail._id})
       .then((response)=>{
         console.log(response)

         response.expense_val=expenseDetail.expense_val
          return response.save()
       })
       .then((updatedRes)=>{
          resolve(updatedRes)
       })
       .catch((err)=>{
        console.log(err);
        reject(err)
      })
    })
}

module.exports.deleteExpenseDBService=(expenseDetail)=>{
    return new Promise(function myFn(resolve,reject){
       expenseModel.findOne({_id:expenseDetail._id})
       .then((response)=>{
         console.log(response)
          return response.deleteOne()
       })
       .then((updatedRes)=>{
          resolve(updatedRes)
       })
       .catch((err)=>{
        console.log(err);
        reject(err)
      })
    })
}