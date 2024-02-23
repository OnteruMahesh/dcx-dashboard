const mongoose = require('mongoose');

const PageSchema = mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    name:{
        type:String,
        require:true
    },
    CategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Categories'
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('Pages',PageSchema);