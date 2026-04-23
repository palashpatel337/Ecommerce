import { use } from "react";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import jwt from "jsonwebtoken";

import supabaseAdmin from "../config/supabaseAdmin.js";
import User from "../models/User.js";

export const syncUserToMongo = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // verify token and fetch user from Supabase
    const { data, error } = await supabaseAdmin.auth.getUser(token);

    if (error) {
      return res.status(401).json({ message: error.message });
    }

    const user = data.user;

    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }

    // store user in mongodb
    const savedUser = await UserModel.findOneAndUpdate(
      { supabaseId: user.id },
      {
        supabaseId: user.id,
        email: user.email,
        fullName: user.user_metadata?.full_name || "",
        avatarUrl: user.user_metadata?.avatar_url || "",
        provider: "google",
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      message: "User synced successfully",
      user: savedUser,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const registerController = async (req,res) => {
    try {
        const {name,email,password,address,answer,phone} = req.body;

        if(!name){
            return res.send({message:'Name is required'})
        }
        if(!email){
            return res.send({message:'Email is required'})
        }
        if(!password){
            return res.send({message:'Password is required'})
        }
        if(!phone){
            return res.send({message:'Phone is required'})
        }
        if(!address){
            return res.send({message:'Address is required'})
        }
        if(!answer){
            return res.send({message:'Answer is required'})
        }

        const existingUser = await userModel.findOne({email})

        if(existingUser){
            return res.status(200).send({
                success : false,
                message : 'User already Registerd, please login'
            })
        }

        const hashedPassword = await hashPassword(password);

        const user = await userModel({name,email,phone,address,password:hashedPassword,answer}).save()

        res.status(201).send({
            success : true,
            message : 'User registered successfully',
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message : 'Error in Registration',
            error
        }
        )
    }
};

//POST LOGIN
export const loginController = async (req,res) =>{
    try {
        const {email,password} = req.body;
        //validation
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            })
        }

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Invalid email',
            })
        }

        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message: 'Invalid password',

            })
        }

        const token = await jwt.sign({_id : user._id},process.env.JWT_SECRET,{
            expiresIn: '7d',
        })
        res.status(200).send({
            success: true,
            message: 'Login successfully',
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role : user.role,
            },
            token,
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).send({
            success: false,
            message : 'Error in login',
            error: error
        })
            
    }
}

//TEST Controller
export const testController = (req,res) =>{
    res.send("Protected Route");
    
}


//Forgot Password Controller
export const ForgotPasswordController = async(req,res) => {
    try {
        const {email,answer,newPassword} = req.body;
        if(!email){
            res.status(400).send({message :'Email is required'})
        }
        if(!answer){
            res.status(400).send({message :'Answer is required'})
        }
        if(!newPassword){
            res.status(400).send({message :'New password is required'})
        }    

        const user = await userModel.findOne({email,answer});

        if(!user){
            return res.status(404).send({
                success:false,
                message: 'Something went wrong...'
            })
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password : hashed});
        res.status(200).send({
            success : true,
            message : 'Password Reset Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
        success:false,
        message: 'Something went wrong...',
        error
    })
}}


export const updateProfileController = async(req,res) => {
    try {
        const {name, email, password, address, phone} = req.body;
        const user = await userModel.findById(req.user._id);

        if(password && password.length < 6){
            return res.json({error:"Password is required and 6 characters long"})
        }

        const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address
        },{new: true})
        res.status(200).send({
            success : true,
            message : 'Password Reset Successfully',
            updatedUser,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Something went wrong...',
            error
        })

    }
}

export const getOrdersController = async(req, res) => {
    try {
        const orders = await orderModel.find({buyer:req.user._id}).populate("products","-photo").populate("buyer","name").sort({createdAt: -1})
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Something went wrong...',
            error
        })

    }
}

export const getAllOrdersController = async(req, res) => {
    try {
        const orders = await orderModel.find({}).populate("products","-photo").populate("buyer","name").sort({createdAt :-1})
        res.json(orders)
    } catch (error) {
    console.error('Error in /all-orders:', error);  // Logs full error in console
    res.status(500).json({
        success: false,
        message: 'Something went wrong...',
        error: error.message || error,  // Return real error message
    });
}

    
}

export const getOrderStatusController = async(req, res) => {
    try {
        const {orderId} = req.params;
        const {status}= req.body;
        const orders = await orderModel.findByIdAndUpdate(orderId, {status}, {new: true})
        res.json(orders)
    } catch (error) {
        res.status(500).send({
            success:false,
            message: 'Something went wrong...',
            error: error.message
        })

    }
}