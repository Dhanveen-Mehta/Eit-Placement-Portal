const mongoose = require("mongoose");

// Yaha Hum Schema Declare Karenge Students ka Ki uske paas kya kya information hogi
try{
    async function main(){
         await mongoose.connect('mongodb://127.0.0.1:27017/placementportal');
    }
    main();
     //console.log("Database was Sucessfully Connected");
}catch(err){
    console.log("An Error Occured while connecting to Database",err);
};


const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});




const Admin = mongoose.model("Admin",adminSchema);


// async function inputAdmin(){
//         await Admin.insertOne({
//                 email:"admin@gmail.com",
//                 password:"admin",
//         });
        
        
// }
       
// inputAdmin();

module.exports = Admin;