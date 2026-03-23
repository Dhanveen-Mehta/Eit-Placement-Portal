const mongoose = require("mongoose");

const placementDriveSchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true,
    },
    companyLocation:{
        type:String,
        required:true,
    },
    ctc:{
        type:Number,
        required:true,
        
    },
    jobDescription:{
        type:String,
        required:true,
        
    },
    minimumCgpa:{
        type:Number,
        required:true,
        default:0,
    },
    studentsApplied:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Student",
        }
    ]
});

const PlacementDrive = mongoose.model("PlacementDrive",placementDriveSchema);

// const tempData =[

// {
//     companyName: "Google",
//     companyLocation: "Bangalore",
//     ctc: 3000000,
//     jobDescription: "Backend + distributed systems development",
//     minimumCgpa: 8.5
// },

// {
//     companyName: "Amazon",
//     companyLocation: "Hyderabad",
//     ctc: 2500000,
//     jobDescription: "SDE role with focus on APIs and cloud",
//     minimumCgpa: 7.5
// },

// {
//     companyName: "Microsoft",
//     companyLocation: "Noida",
//     ctc: 2800000,
//     jobDescription: "Software Engineer working on Azure services",
//     minimumCgpa: 8.0
// },

// {
//     companyName: "Infosys",
//     companyLocation: "Pune",
//     ctc: 600000,
//     jobDescription: "System Engineer role for enterprise apps",
//     minimumCgpa: 6.5
// },

// {
//     companyName: "TCS",
//     companyLocation: "Delhi",
//     ctc: 500000,
//     jobDescription: "Assistant System Engineer training program",
//     minimumCgpa: 6.0
// },

// {
//     companyName: "Wipro",
//     companyLocation: "Gurgaon",
//     ctc: 550000,
//     jobDescription: "Project Engineer role with client projects",
//     minimumCgpa: 6.5
// }

// ];

// try{
//     async function main(){
//         await mongoose.connect('mongodb://127.0.0.1:27017/placementportal');
//         //let all = await PlacementDrive.find({});
//         //console.log(all);
//     }
//     main();
//     //console.log("Database was Sucessfully Connected");
// }catch(err){
//     console.log("An Error Occured while connecting to Database",err);
// };

// async function temp(){
//     const existing = await PlacementDrive.find();

//     if(existing.length === 0){
//         await PlacementDrive.insertMany(tempData);
//         console.log("Data Inserted ✅");
//     } else {
//         console.log("Data already exists ❌");
//     }
// }
// temp();





module.exports = PlacementDrive ; 