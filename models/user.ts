import type { UserModel } from "./types/models";
import mongoose, { Schema, models } from "mongoose";
import Card from "./card"

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
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Card'
      }
    ],
    collections: [
      {
        name: {
          type:String,
          required: true
        },
        cards: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Card'
          }
        ]
      }
    ]
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;