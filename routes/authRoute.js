import express from "express";
import {registerController,loginController,testController, ForgotPasswordController, updateProfileController, getOrderStatusController, getOrdersController, getAllOrdersController} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router()

//ROUTER
//REGISTER || POST
router.post('/register',registerController)

//LOGIN || POST
router.post('/login',loginController)

//Forgot Password || POST
router.post("/forgot-password", ForgotPasswordController)

//TEST Router
router.get("/test",requireSignIn,isAdmin,testController)

//PROTECTED USER ROUTE
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

//PROTECTED ADMIN ROUTE
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

router.put("/profile", requireSignIn, updateProfileController)

router.get("/orders", requireSignIn, getOrdersController)

router.get("/all-orders", requireSignIn,isAdmin, getAllOrdersController)

router.put("/order-status/:orderId", requireSignIn, isAdmin, getOrderStatusController)


export default router;