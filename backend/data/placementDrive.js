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
    }
});

const PlacementDrive = mongoose.model("PlacementDrive",placementDriveSchema);

module.exports = PlacementDrive ; 