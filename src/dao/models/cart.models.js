import mongoose, { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";

const schema = mongoose.Schema(
  {
    cart: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Products",
          default: [],
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

schema.pre(/^find/, function (next) {
  this.populate("cart.product");
  next();
});

schema.plugin(MongooseDelete, { deletedAt: true });

export const CartModel = mongoose.model("Carts", schema);
