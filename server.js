const express= require("express");
var cors= require("cors")
const app=express();
const dotenv= require("dotenv").config()

var routes = require("./routes/routes")

 const connectDb = require("./config/dbConnection");

 connectDb();
 app.use(cors(
    {origin:"http://localhost:4200"}
 ))
 
 app.use(express.json())
 app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use((req, res, next) => {
    res.setTimeout(10000, () => {  // 10 seconds timeout
        console.log("Request has timed out.");
        res.status(408).send("Request Timeout");
    });
    next();
});
app.listen(3000, function check(err){
    if(err){
        console.log(err)
    }else{
        console.log("no error")
    }
})