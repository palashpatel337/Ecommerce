import express from "express";
import {
  createOrderController,
  getUserOrdersController,
} from "../controllers/orderController.js";

const router = express.Router();

// create order
router.post("/create-order", createOrderController);

// get user orders by email
router.get("/user-orders/:email", getUserOrdersController);

export default router;