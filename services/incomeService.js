var incomeModel= require("../model/incomeModel")
var expenseModel=require("../model/expenseModel")

module.exports.addIncomeDBService=(incomeDetails)=>{

    return new Promise(function myFn(resolve,reject){
        var incomeModelData= new incomeModel()
        incomeModelData.userId= incomeDetails.userId
        incomeModelData.income_type= incomeDetails.income_type;
        incomeModelData.income_val= incomeDetails.income_val;
        incomeModelData.income_date= incomeDetails.income_date;

        incomeModelData.save()
        .then(()=> {
            console.log("income added successfully");
            resolve(true)
         })
         .catch(err=>{
            console.log("Error in adding income:", err);
            reject(err);  
         })
    }) 


}

module.exports.getAllIncomesDBService=(userId)=>{
    return new Promise(function myFn(resolve, reject){
        console.log(userId)
        incomeModel.find({userId:userId})
        .then((income)=>{
            console.log("All incomes received", income);
            resolve(income)
        })
        .catch(err=>{
            console.log("Error in fetching incomes");
            reject(err)
        })
    })
}

module.exports.updateIncomeDBService=(incomeDetail)=>{
    return new Promise(function myFn(resolve,reject){
       incomeModel.findOne({_id:incomeDetail._id})
       .then((response)=>{
         console.log(response)

         response.income_val=incomeDetail.income_val
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

module.exports.deleteIncomeDBService=(incomeDetail)=>{
    return new Promise(function myFn(resolve,reject){
       incomeModel.findOne({_id:incomeDetail._id})
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

module.exports.monthlySavingsDBService=(curr_month, curr_year)=>{
    return new Promise(function myFn(resolve, reject){
        console.log(curr_month, curr_year)
         const incomePromise= incomeModel.aggregate([
           {
                $addFields:{
                    incomeMonth:{$month:"$income_date"},
                    incomeYear:{$year:"$income_date"}
                }
            },
            {
                $match:{
                    incomeMonth:curr_month,
                    incomeYear:curr_year
                }
            },
            {
                $group:{
                    _id:null,
                    totalIncome: {
                       $sum:"$income_val" 
                    }
                }
            }
        ]

        )

        const expensePromise= expenseModel.aggregate([
            {
                 $addFields:{
                     expenseMonth:{$month:"$expense_date"},
                     expenseYear:{$year:"$expense_date"}
                 }
             },
             {
                 $match:{
                     expenseMonth:curr_month,
                     expenseYear:curr_year
                 }
             },
             {
                 $group:{
                     _id:null,
                     totalExpense: {
                        $sum:"$expense_val" 
                     }
                 }
             }
         ]
 
         )
       
         Promise.all([incomePromise, expensePromise])
         .then(([totalIncomeRes, totalExpenseRes])=>{
           
            const totalIncome= totalIncomeRes.length>0 ? totalIncomeRes[0].totalIncome :0
            const totalExpense= totalExpenseRes.length>0 ? totalExpenseRes[0].totalExpense:0
            console.log(totalIncome, totalExpense)
            const monthlySaving= totalIncome-totalExpense
            console.log(monthlySaving)
            resolve({totalIncome:totalIncome, totalExpense:totalExpense , saving:monthlySaving})
         })
         .catch(err=>{
            console.log(err)
            reject(err)
         })
        
    })
}