const { string } = require('joi');
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema ({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:"Regular"
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('Users',UserSchema);