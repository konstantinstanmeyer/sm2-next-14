import type { UserModel } from "./types/models";
import mongoose, { Schema, models } from "mongoose";
import cardSchema from "./card";

const userSchema = new Schema<UserModel>(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    cards: [{
      language: String,
      cards: [cardSchema]
    }]
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;