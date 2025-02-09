import type { CardModel } from "./types/models";
import mongoose, { Schema, models } from "mongoose";

const cardSchema = new Schema<CardModel>(
  {
    text: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

const Card = models.Card || mongoose.model("Card", cardSchema);
export default Card;