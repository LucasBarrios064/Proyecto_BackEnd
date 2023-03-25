import mongoose, { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";

const ItemSchema = mongoose.Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      require: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 0,
      require: true,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        type: ItemSchema,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

cartSchema.pre("find", function (next) {
  this.populate("products.product");
  next();
});

cartSchema.plugin(MongooseDelete, { deletedAt: true });

export const CartModel = mongoose.model("Carts", cartSchema);
