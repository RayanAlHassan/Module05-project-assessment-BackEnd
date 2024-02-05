import mongoose from "mongoose";
import slugify from "slugify";
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
      required: true,
    },
   
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

productModelSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const ProductSchema = mongoose.model("ProductSchema", productModelSchema);

export default ProductSchema;

