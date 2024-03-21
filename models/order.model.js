const mongoose = require("mongoose");

//1-create schema
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    taxPrice: {
      type: Number,
      default: 0,
    },
    shiippingPrice: {
      type: Number,
      default: 0,
    },
    totalOrderPrice: {
      type: Number,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "cash"],
      default: "cash",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Date,
    },
    isDelevered: {
      type: Boolean,
      default: false,
    },
    delveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
); //this will add createdAt and updatedAt to our database

//2-create collection
module.exports = mongoose.model("Order", orderSchema);