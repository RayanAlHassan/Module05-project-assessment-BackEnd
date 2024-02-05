import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
const productModelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
   
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductSchema = mongoose.model('ProductSchema', productModelSchema);

export default ProductSchema;

