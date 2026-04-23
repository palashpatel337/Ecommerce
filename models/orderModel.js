import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        quantity: { type: Number, default: 1 },
        photo: String,
      },
    ],

    buyer: {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: String,
      email: String,
      address: String,
    },

    payment: {
      orderId: String,
      paymentId: String,
      signature: String,
      amount: Number,
      currency: { type: String, default: "INR" },
      status: { type: String, default: "success" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);