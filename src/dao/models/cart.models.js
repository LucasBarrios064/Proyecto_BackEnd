import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const schema = mongoose.Schema(
  {
    products: {
      type: Array,
      require: true,
    },
  },
  { timestamps: true }
);

schema.plugin(MongooseDelete, { deletedAt: true });

export const CartModel = mongoose.model("carts", schema);
