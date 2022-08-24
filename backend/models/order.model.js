import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "product",
          required: true,
        },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: [
      {
        city: { type: String, required: true },
        address: { type: String, required: true },
        country: { type: String, required: true },
        postalCode: { type: String, required: true },
      },
    ],
    phoneNumber: { type: String },
    shippingPrice: { type: Number, default: 0.0 },
    taxPrice: { type: Number, default: 0.0 },
    totalPrice: { type: Number, default: 0.0, required: true },
    paymentMethod: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("order", orderSchema);
