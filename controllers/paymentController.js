import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/paymentModel.js";

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const products = req.body.products; // Assuming product details are sent in the request body

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const options = {
      amount: amount * 100, // Razorpay takes amount in paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
      products,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// VERIFY PAYMENT
// export const verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       amount,
//       userEmail,
//       userName,
//       products
//     } = req.body;

//     const generated_signature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest("hex");

//     if (generated_signature !== razorpay_signature) {
//       return res.status(400).json({ success: false, message: "Invalid Signature" });
//     }

//     // Save payment to MongoDB
//     const payment = await Payment.create({
//       products:products,
//       orderId: razorpay_order_id,
//       paymentId: razorpay_payment_id,
//       signature: razorpay_signature,
//       amount,
//       userEmail,
//       userName,
//       status: "success",
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Payment Verified & Stored",
//       payment,
//       products,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };


export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      userEmail,
      userName,
      userAddress,
      products,
    } = req.body;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid Signature",
      });
    }

    // Create Order in DB
    const order = await Order.create({
      products: products.map((p) => ({
        productId: p._id,
        name: p.name,
        price: p.price,
        photo: p.photo,
        quantity: p.quantity || 1,
      })),

      buyer: {
        name: userName,
        email: userEmail,
        address: userAddress,
      },

      payment: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        amount,
        status: "success",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Payment Verified & Order Saved",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};