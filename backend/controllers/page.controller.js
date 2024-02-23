const Page = require('../models/Page');

exports.addPage = async(req,res)=>{
    try{
        let page = new Page(req.body);
        await page.save();
        res.status(200).json({
            message:"Page added successfully",
            page : page
        })
    }catch(err){
        res.status(500).json({
            message:"Something went wrong",
            error:err.message
        })
    }
}

exports.getPages = async(req,res) => {
    try{
        const pages = await Page.find().populate('UserId').populate('CategoryId').sort({createdAt:-1});
        if( pages.length == 0){
            res.status(404).json({
                message:"No page found."
            })
        } else {
            res.status(200).json({
                message:"Pages fetched successfully.",
                pageData:pages
            })
        }
    }catch (err) {
        res.status(500).json({
            message:"Something went wrong",
            error: err.message
        })
    }
}

exports.getSinglePage = async (req,res) => {
    try {
        const page = await Page.findOne({_id:req.params.pid}).populate('UserId').populate('CategoryId');
        if( page == null){
            res.status(404).json({
                message:"No page found."
            })
        } else {
            res.status(200).json({
                message:"Page fetched successfully.",
                pageData:page
            })
        }
    } catch (err) {
        res.status(500).json({
            message:"Something went wrong",
            error: err.message
        })
    }
}

exports.getPageByCategory = async (req,res)=>{
    try{
        const pages = await Page.find({CategoryId:req.params.cid}).populate('UserId').populate('CategoryId');
        if(pages == null){
            res.status(404).json({message:"No pages found"});
        } else {
            res.status(200).json({
                message:"Pages fetched successfullt",
                pageData:pages
            })
        }
    } catch (e) {
        res.status(500).json({
            message:"Something went wrong",
            error:e.message
        })
    }
}

exports.updatePage = async (req,res)=>{
    try {
        const pageToUpdate = await Page.findOne({_id:req.params.pid});
        if(pageToUpdate == null) {
            res.status(404).json({
                message:"No page found"
            })
        } else {
            await Page.findOneAndUpdate({_id:req.params.pid},{
                $set:{
                    name:req.body.name,
                    CategoryId:req.body.CategoryId
                }})
        }
        res.status(200).json({
            message:"Page updated successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong",
            error:error
        })
    }
}

exports.deletePages = async (req,res)=>{
    try {
        const ids = req.body;
        for(let i = 0 ; i < ids.length ; i++){
            const pageToDel = await Page.findOne({_id:ids[i]});
            if(pageToDel == null){
                res.status(404).json({
                    message:"Page not found"
                })
            } else {
                await Page.deleteOne(pageToDel);
            }
        }
        
        res.status(200).json({
            message:"Page deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong.",
            error:error
        })
    }
}