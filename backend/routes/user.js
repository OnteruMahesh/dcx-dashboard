const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const Page = require('../models/Page');
const User = require('../models/User');
const Category = require('../models/Category');
const { check } = require('../middleware/auth');

//This will be used for new user registration
router.post('/register',userController.userRegister)

//This will be used for user login
router.post('/login',userController.userLogin)

router.get('/current/:uid',userController.getSingleUser)

router.get('/',userController.getUsers)

router.post('/:uid',userController.updateUser)

router.get('/search/:sname',async(req,res)=>{
    try {
        const name = req.params.sname;
        const pages= await Page.find({ $text: { $search: name } }).populate('UserId').populate('CategoryId');
        const users = await User.find({ $text: { $search: name } });
        const categories = await Category.find({ $text: { $search: name } }).populate('authorId');

        res.status(200).json({
            message:"Records getched successfully",
            pages:pages,
            users:users,
            categories:categories
        })
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong",
            error:error.message
        })
    }
});

module.exports = router;