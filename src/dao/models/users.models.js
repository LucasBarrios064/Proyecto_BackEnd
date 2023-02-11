import { Schema, model } from "mongoose";

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
      role:{
        type:String,
        required: true,
        default: "user",
      }
    },
    {
      timestamps: true,
    },
);


export const UserModel = model("users", schema);
  