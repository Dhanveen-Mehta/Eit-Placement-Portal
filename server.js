// Yaha Hum Saara Require wala Kamm Karenge 

const express = require("express");
const mongoose = require("mongoose");
const path = require("path")
//const ejs = require("ejs");
const app = express();
const port = 8080;
const Student = require("./backend/data/student.js");
const Admin = require("./backend/data/admin.js");
//==================================================================================

//Yaha Hum Saara Middleware wala kaaam karenge
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"frontend/views"));
app.use(express.static(path.join(__dirname,"frontend/public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//======================================================================================

//Yaha Hum Database se connect karenge 
try{
    async function main(){
         await mongoose.connect('mongodb://127.0.0.1:27017/placementportal');
    }
    main();
    console.log("Database was Sucessfully Connected");
}catch(err){
    console.log("An Error Occured while connecting to Database",err);
};
//=========================================================================================================

//Yaha Hum Server start karnge 
app.listen(port, function(){
    console.log(`Server Started and running on port ${port}`);
});

//==========================================================================================================

// Yaha Hum Routes Create Karenge 
app.get("/",function(req,res){
    res.render("homePage");
});

//===============================================================================================================

//Yaha Admin Route ka saara kaam karenge 
app.get("/admin/login", async function(req,res){
    res.render("adminLogin.ejs");
});

app.post("/admin/login", async function(req,res){
    let {email,password} = req.body;
    console.log(email,password);
    let searchedAdmin = await Admin.findOne({email:email, password:password});

    console.log(searchedAdmin);
    if(!searchedAdmin){
       return res.send("Invalid Credentials")
    };
    
    let adminId = searchedAdmin._id;
    
    res.send("See Console");

})



app.get("/admin/all/students", async function(req,res){
    let allStudents = await Student.find({});
    res.render("allStudents",{allStudents}   );
    
});
//============================================================================================================

//Yaha Hum Student ka Saara kaam karenge 

app.get("/student/login",async function(req,res){
    res.render("studentLogin");
});

app.post("/student/login", async function(req,res){
    let {email,password} = req.body;
    //console.log(email,password);
    let searchedStudent = await Student.findOne({email:email, password:password});
    console.log(searchedStudent);


    if(!searchedStudent){
        res.send("Invalid Credentials");
    };

    let stuId = searchedStudent._id;
    res.redirect(`/student/${stuId}`);
    

})

app.get("/student/:id", async function(req,res){
    let {id} = req.params;
    if(!id){
        res.send("Inavlid Credentials Please Check again");
    }
    let searchedStudent = await Student.findOne({_id:id});
    console.log(searchedStudent);
    res.send("See Console");

});






