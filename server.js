// Yaha Hum Saara Require wala Kamm Karenge 

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
//const ejs = require("ejs");
const app = express();
const port = 8080;
const Student = require("./backend/data/student.js");
const Admin = require("./backend/data/admin.js");
const PlacementDrive = require("./backend/data/placementDrive.js");
//==================================================================================

//Yaha Hum Saara Middleware wala kaaam karenge
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"frontend/views"));
app.use(express.static(path.join(__dirname,"frontend/public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
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

//=================================================================================================================

//Yaha Hum Admin ka login karwaenge aur uske baad usko saari currently running placement dives dikhayenge 
app.post("/admin/login", async function(req,res){
    let {email,password} = req.body;
    //console.log(email,password);
    let searchedAdmin = await Admin.findOne({email:email, password:password});

   // console.log(searchedAdmin);
    if(!searchedAdmin){
       return res.send("Invalid Credentials")
    };
    res.redirect("/admin")
});
//================================================================================================================================

app.get("/admin", async function(req,res){
    let allPlacementDrive = await PlacementDrive.find({});
    //console.log(allPlacementDrive);
    
    //let adminId = searchedAdmin._id;
    
    res.render("admin.ejs",{allPlacementDrive});

})

//================================================================================================================================

//Yaha Hum Admin Se New Drive Add karne ke liye usko form denge 
app.get("/admin/new", async function(req,res){
    res.render("newDrive.ejs");

});
//===============================================================================================================================

//Yaha Hum New Drive ka Form  ka data ko DB mei daalenge 
app.post("/admin/new", async function(req,res){
    let {companyName,companyLocation,ctc,jobDescription,minimumCgpa} = req.body;
    //console.log(companyName,companyLocation,ctc,jobDescription,minimumCgpa);
    let newDrive = new PlacementDrive({
        companyName:companyName,
        companyLocation:companyLocation,
        ctc:ctc,
        jobDescription:jobDescription,
        minimumCgpa:minimumCgpa,
    });
    await newDrive.save();
    res.redirect("/admin");
});
//================================================================================================================================

//Yaha Hum Drive Ko delete karne ke liye route likhenge 
app.delete("/admin/:id", async function(req,res){
    let {id} =req.params;
   let deletedDrive = await PlacementDrive.findByIdAndDelete(`${id}`);
   console.log(deletedDrive);
    console.log("Drive Deleted");
    res.redirect("/admin");
});
//================================================================================================================================

//Yaha Hum Drive Ko Edit Karne Ka Route Likenge 
app.get("/admin/:id/edit", async function(req,res){
    let {id} = req.params;
    let searchedDrive = await PlacementDrive.findById(`${id}`);
    res.render("editDrive",{searchedDrive});
});

app.put("/admin/:id/edit" , async function(req,res){
    let {id} = req.params;
    let {companyName,companyLocation,ctc,jobDescription,minimumCgpa} = req.body;
    let updatedDrive = await PlacementDrive.findByIdAndUpdate(`${id}`,{
        companyName:companyName,
        companyLocation:companyLocation,
        ctc:ctc,
        jobDescription:jobDescription,
        minimumCgpa:minimumCgpa,
    },{new:true});
    console.log("Drive Updated SucessFully and Loged into the console",updatedDrive);
    res.redirect("/admin");
});



app.get("/admin/all/students", async function(req,res){
    let allStudents = await Student.find({});
    res.render("allStudents",{allStudents}   );
    
});
//============================================================================================================






































































//🧑‍🎓🧑‍🎓🧑‍🎓🧑‍🎓🧑‍🎓Yaha Hum Student ka Saara kaam karenge 

app.get("/student/login",async function(req,res){
    res.render("studentLogin");
});

app.post("/student/login", async function(req,res){
    let {email,password} = req.body;
    //console.log(email,password);
    let searchedStudent = await Student.findOne({email:email, password:password});
    //console.log(searchedStudent);


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
    //console.log(searchedStudent);
    let allPlacementDrive = await PlacementDrive.find({});
    //console.log(allPlacementDrive);

    res.render("student.ejs",{allPlacementDrive,searchedStudent});

});

app.get("/student/:stuId/apply/:jobId", async function(req,res){
    let {stuId,jobId} = req.params;
    let stu = await Student.findById(`${stuId}`);
    let job = await PlacementDrive.findById(`${jobId}`);

    if(stu.companyApplied.includes(jobId)){
        //console.log(stu,job)
       return res.send("Already Applied Don't Worry!!")
    }
    await stu.companyApplied.push(jobId);
    await job.studentsApplied.push(stuId);
    await stu.save();
    await job.save();

    res.send("See Console");
    //console.log(stu,job);
    


});






