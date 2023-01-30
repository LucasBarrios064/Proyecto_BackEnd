import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    code: {
      type: Number,
      require: true,
      unique: true,
    },
    price: {
      type: Number,
      require: true,
    },
    status: {
      type: Boolean,
      default: true,
      require: true,
    },
    stock: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    thumbnail: {
      type: Array,
      require: true,
    },
  },
  { timestamps: true }
);

schema.plugin(MongooseDelete, { deletedAt: true });

export const productModel = mongoose.model("Products", schema);
