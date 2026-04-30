import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String
    },
    lastLogin:{
        type:Date,
        default:Date.now()
    },
    isverified:{
        type:Boolean,
        default:false
    },
    resetPaaswordToken:String,
    resetPaaswordExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date,
},{timestamps:true})


export const User=mongoose.model("User",userSchema)