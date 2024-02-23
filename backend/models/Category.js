const mongoose = require('mongoose');
const User = require('./User');

const CategorySchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('Categories',CategorySchema);