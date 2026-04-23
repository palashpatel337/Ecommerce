import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        quantity: { type: Number, default: 1 },
      },
    ],
    orderId: { type: String, required: true },
    paymentId: { type: String, required: true },
    signature: { type: String, required: true },

    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },

    status: { type: String, default: "success" },

    userEmail: { type: String },
    userName: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);