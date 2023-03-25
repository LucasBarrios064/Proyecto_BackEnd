import { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";

const schema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      min: 1,
      required: true,
    },
    password: {
      type: String,
      minLength: 6,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "carts",
      required: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("findOne", function (next) {
  this.populate("cart");
  next();
});
schema.plugin(MongooseDelete, { deletedAt: true });

export const UserModel = model("users", schema);
