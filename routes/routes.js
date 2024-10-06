const express= require("express")

let userController= require("../controller/user")
const expenseController=require("../controller/expenseController")
const incomeController=require("../controller/incomeController")
const router = express.Router()

 router.post('/register',userController.createUser)
 router.post('/login', userController.loginUser)

 router.post('/addExpense', expenseController.addExpenses)
 router.get('/getAllExpenses', expenseController.getAllExpenses)
 router.post('/updateExpense', expenseController.updateExpense)
 router.delete('/delExpense', expenseController.deleteExpense)


 router.post('/addIncome', incomeController.addIncomes)
 router.get('/getAllIncomes', incomeController.getAllIncomes)
 router.post('/updateIncome', incomeController.updateIncome)
 router.delete('/delIncome', incomeController.deleteIncome)


 router.get('/monthlySavings', incomeController.monthlySavings)

module.exports=router