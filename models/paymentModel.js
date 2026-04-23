import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
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