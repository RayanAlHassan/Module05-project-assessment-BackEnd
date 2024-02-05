import mongoose from "mongoose";

const orderModelSchema = new mongoose.Schema(
  {
 
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductSchema",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
 
    quantity: {
      type: Number,
      required: true,
    },
    unitePrice: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema",
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const OrderSchema = mongoose.model("OrderSchema", orderModelSchema);

export default OrderSchema;
