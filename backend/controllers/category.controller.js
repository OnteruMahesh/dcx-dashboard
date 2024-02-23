const Category = require('../models/Category');
const Page = require('../models/Page');
exports.addCategory = async(req,res)=>{
    try{
        let category = new Category(req.body);
        await category.save();
        res.status(200).json({
            message:"Category added successfully",
            category : category
        })
    }catch(err){
        res.status(500).json({
            message:"Something went wrong",
            error:err.message
        })
    }
}

exports.getCategory = async(req,res)=>{
    try{
        let category = await Category.find().populate('authorId').sort({updatedAt:-1});
            res.status(200).json({
                message:"Categories fetched successfully.",
                categoryData:category
            })
    }catch (err) {
        res.status(500).json({
            message:"Something went wrong",
            error: err.message
        })
    }
}

exports.deleteCategories = async (req,res)=>{
    try{
        const ids = req.body;
        for(let i = 0 ; i < ids.length ; i++){
            const catToDel = await Category.findOne({_id:ids[i]});
            if(!catToDel){
                res.status(404).json({
                    message:"No categories found."
                })
            } else {
                await Page.deleteMany({CategoryId:ids[i]});
                await Category.deleteOne(catToDel);
            }
        }
        
        res.status(200).json({
            message:"Categories deleted successfully."
        })
    }catch (err) {
        res.status(500).json({
            message:"Something went wrong",
            error: err.message
        })
    }

}

exports.updateCategory = async (req,res)=>{
    try {
        const category = await Category.findOne({_id:req.params.cid});
        if(category == null){
            res.status(404).json({
                message:"No category found"
            })
        }else {
            await Category.findOneAndUpdate({_id:req.params.cid},{
                $set:{
                    name:req.body.name
                }
            })
        }
        res.status(200).json({
            message:"Category updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong",
            error: error.message
        })
    }
}

exports.getSingleCategory = async(req,res)=>{
    try {
        const category = await Category.findOne({_id:req.params.cid})
        if(category == null){
            res.status(404).json({
                message:"Category not found"
            })
        }else {
            res.status(200).json({
                message:"Category fetched successfully",
                data:category
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong",
            error:error
        })
    }
}