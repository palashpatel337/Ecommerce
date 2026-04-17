import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";


//Sign in confirmation
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).send({ error: "Unauthorized" });
  }
};

//Admin access
export const isAdmin = async (req,res,next) =>{
    try {
        const user = await userModel.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                success : false,
                message : 'Unauthorized access'
            })
        }
        next()
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: 'error in middleware',
            error
        })
        
    }
}