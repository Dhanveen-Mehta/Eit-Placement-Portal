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

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        max:20,
        min:2
    },
    rollNumber:{
        type:Number,
        required:true,
        
    },
    course:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    cgpa:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,
    },
    companyApplied:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"PlacementDrive",
    }]
    
});
//================================================================================================================


// Yaha hum Student Model Banayenge Taaki ham Student collection mei CRUD Perform karr paaye 
const Student = new mongoose.model("Student",studentSchema);

//====================================================================================================================
async function intialData(){
   const students = await Student.insertMany([
        {
            name:"Dhanveen Mehta",
            rollNumber:20,
            course:"B.Tech",
            branch:"CSE",
            phoneNumber:9599317073,
            cgpa:8.995,
            email:"25-cse-020dhanveen@eitfaridabad.co.in",
            password:"Dhanveen@123"
        },
        {
            name:"Arjun Bhargav",
            rollNumber:8,
            course:"B.Tech",
            branch:"CSE",
            phoneNumber:8822557766,
            cgpa:7,
            email:"25-cse-008arjun@eitfaridabad.co.in",
            password:"Arjun@123"
        },
        {
            name:"Garvit Tyagi",
            rollNumber:23,
            course:"B.Tech",
            branch:"CSE",
            phoneNumber:1122334455,
            cgpa:7.5,
            email:"25-cse-023garvit@eitfaridabad.co.in",
            password:"Garvit@123"
        },
        {
            name:"Piyush Singh",
            rollNumber:35,
            course:"B.Tech",
            branch:"CSE",
            phoneNumber:6969696969,
            cgpa:8.2,
            email:"25-cse-035piyush@eitfaridabad.co.in",
            password:"Piyush@123"
        },
        {
            name:"Ujjwal Kumar",
            rollNumber:52,
            course:"B.Tech",
            branch:"CSE",
            phoneNumber:7788994455,
            cgpa:7.78,
            email:"25-cse-052ujjwal@eitfaridabad.co.in",
            password:"Ujjwal@123"
        },
        {
            name:"Rohaan Ahmead Quadri",
            rollNumber:44,
            course:"B.Tech",
            branch:"CSE",
            phoneNumber:2020202020,
            cgpa:6.5,
            email:"25-cse-045rohaan@eitfaridabad.co.in",
            password:"Rohaan@123"
        },
        {
            name:"Avinash Kumar Tiwari",
            rollNumber:13,
            course:"B.Tech",
            branch:"CSE",
            phoneNumber:3030303030,
            cgpa:6.5,
            email:"25-cse-013avinash@eitfaridabad.co.in",
            password:"Avinash@123"
        },
    ])
};

async function clearData(){
    await Student.deleteMany({});
}

//==================================================================================================

// Yeh Function ham Sirf Temprary Data ko Feed karne ke liye call karenge 

/*try{
    intialData();
    console.log("Temp Data Fed Into Database");
   // mongoose.connection.close();
        
}catch(err){
    console.log("Some Error encountered");
}*/

//====================================================================================================================

/* try{
    //clearData();
    console.log("Database Cleared");
    mongoose.connection.close();

}catch(err){
    console.log("Error Encountered while Clearing Database")
}*/


//==================================================================================================

// Yaha Hum Student model ko export karenge taaki bhar bhi use karr sakke 
module.exports= Student;
//==================================================================================================