import Order from "../models/orderModel.js";

// CREATE ORDER (after payment verified)
export const createOrderController = async (req, res) => {
  try {
    const { products, buyer, payment } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Products are required",
      });
    }

    if (!buyer?.email) {
      return res.status(400).json({
        success: false,
        message: "Buyer details required",
      });
    }

    if (!payment?.paymentId) {
      return res.status(400).json({
        success: false,
        message: "Payment details required",
      });
    }

    const order = await Order.create({
      products,
      buyer,
      payment,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET USER ORDERS (by email)
export const getUserOrdersController = async (req, res) => {
  try {
    const { email } = req.params;

    const orders = await Order.find({ "buyer.email": email }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};