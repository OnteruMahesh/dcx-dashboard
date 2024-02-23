const User = require("../models/User");
const joi = require("joi");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretkey = "mydashboard";

exports.userRegister = async (req, res) => {
    try {
        const schema = joi.object({
            fullname: joi.string().required().min(3).regex(/^[A-Z]+ [A-Z]+$/i),
            email: joi.string().email().required(),
            password: joi.string().min(8).max(16).required(),
            repassword: joi.ref('password')
        });

        const userField = await schema.validateAsync(req.body);
        try {
            let user = await User.findOne({ email: req.body.email });
            if (!user) {
                user = new User(userField);
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
                await user.save();
                res.status(200).json({
                    message: "User registered successfully",
                    user: user,
                });
            } else {
                res.status(400).json({
                    message: "User already exist.",
                });
            }
        } catch (err) {
            res.status(500).json({
                message: "Something went wrong",
                error: err.message,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong ",
            error: err.message
        })
    }
};

exports.userLogin = async (req, res) => {
    const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    })

    try {
        const loginField = await loginSchema.validateAsync(req.body);

        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).json({
                message: "Username/Password does not match."
            })
        } else {
            const is_equal = await bcrypt.compare(loginField.password, user.password)
            if (is_equal) {
                const payload = {
                        userId: user._id,
                        userEmail: user.email      
                }

                const token = jwt.sign(payload, secretkey);

                res.status(200).json({
                    message: "Login successful",
                    user: { id: user._id, name: user.fullname },
                    token
                })
            } else {
                res.status(400).json({
                    message: "Username/Password does not match"
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
};

exports.getUsers = async (req,res)=>{
    try{
        const users = await User.find({},{"password":0,createdAt:0,updatedAt:0});
        if(users.length == 0){
            res.status(400).json({
                message:"No users found"
            })
        }else {
            res.status(200).json({
                message:"Users fetched successfully",
                users: users
            })
        }
        
    }catch(err){
        res.status(500).json({
            message:"Something went wrong",
            error: err.message
        })
    }
}


exports.getSingleUser = async (req,res)=>{
    try {
        const user = await User.findOne({_id:req.params.uid},{"password":0,createdAt:0,updatedAt:0});
        if(user == null){
            res.status(400).json({
                message:"No users found"
            })
        }else {
            res.status(200).json({
                message:"Users fetched successfully",
                user: user
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong",
            error: error.message
        })
    }
}


exports.updateUser =  async (req,res)=>{
    try {
        const user = User.findOne({_id:req.params.uid});
        if(user == null){
            res.status(404).json({
                message:"No user found"
            })
        }else {
            await user.findOneAndUpdate({_id:req.params.uid},{
                $set:{
                    fullname:req.body.fullname,
                    email:req.body.email
                }
            })
        }

        res.status(200).json({
            message:"User data updates successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong",
            error:error.message
        })
    }
}