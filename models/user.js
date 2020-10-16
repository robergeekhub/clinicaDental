const mongoose = require("mongoose");

const UserSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique: true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:Number,
        required:false
    },
    token:{
        type:String,
        required:true
    }
})

const UserModel = mongoose.model('user',UserSchema);

module.exports = UserModel;