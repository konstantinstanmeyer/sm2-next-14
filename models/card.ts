import type { CardModel } from "./types/models";
import mongoose, { Schema, models } from "mongoose";

const cardSchema = new Schema<CardModel>(
  {
    original: {
      type: String,
      required: true,
    },
    translation: {
        type: String,
        requried: true,
    },
    phonetic: {
        type: String,
        required: false,
    },
    superMemo: {
      repitition: {
          type: Number,
          required: true,
      },
      EF: {
          type: Number,
          required: true
      },
      interval: {
          type: Number,
          required: true,
      }
    },
    image: {
        required: false,
        type: String
    }
  },
  { timestamps: true }
);

const Card = models.Card || mongoose.model("Card", cardSchema);
export default Card;