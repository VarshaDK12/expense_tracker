const userModel= require("../model/userModel")
var key="1357924680qwertyabcd"
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService= (userDetails)=>{
    console.log(userDetails)
return new Promise(function myFn(resolve, reject){
    var userModelData= new userModel();
    userModelData.fname= userDetails.fname
    userModelData.lname= userDetails.lname
    userModelData.email= userDetails.email
    userModelData.password= userDetails.password
    userModelData.status= false
    var encrypted= encryptor.encrypt(userDetails.password)
    userModelData.password= encrypted;

     userModelData.save()
     .then(()=> {
        console.log("User saved successfully");
        resolve(true)
     })
     .catch(err=>{
        console.log("Error saving user:", err);
        reject(err);  
     })
})

}


// module.exports.loginUserDbService= (loginDetails)=>{
//     console.log(loginDetails)
//     return new Promise(function myFn(resolve,reject){
//      userModel.findOne({email:loginDetails.email})
//      .then((user)=>{
//         if(!user){
//             console.log("User not found")
//             reject({status:false, message: "User not found" });
//         }else{
//             var descryptedPassword= encryptor.decrypt(user.password)
//             if(loginDetails.password == descryptedPassword){
//                 console.log("login success")
//                 resolve({status:true, message: "User found" })
//             }else{
//                 console.log("login failed")
//                 reject({status:false, message: "Incorrect password" });
//             }
//         }
//      })
//      .catch((err)=>{
//         //console.log(err)
//         reject(err)
//      })
//     })

// }
module.exports.loginUserDbService = (loginDetails) => {
    return new Promise((resolve, reject) => {
      userModel.findOne({ email: loginDetails.email })
        .then((result) => {
          if (!result) {
            // If the user is not found
            return reject({ status: false, msg: "Incorrect user details" });
          }
          
          // Decrypt the password and check if it matches
          const decryptedPassword = encryptor.decrypt(result.password);
          if (loginDetails.password === decryptedPassword) {
            result.status=true
            result.save()
            .then(()=>{
              console.log("login success", result._id)
              resolve({ status: true, msg: "Login successfull", userId:result._id });
            })
            .catch((err)=>{
              console.log(err)
              reject({ status: false, msg: "Error in updating status" });
            })
          } else {
            console.log("login failed");
            reject({ status: false, msg: "Incorrect password" });
          }
        })
        .catch((err) => {
          // Handle any database error
          console.log(err);
          reject({ status: false, msg: "Invalid data" });
        });
    });
  };
  

