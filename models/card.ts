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
      required: true, 
    },
    phonetic: {
      type: String,
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    language: {
      type: String,
      required: true,
    },
    superMemo: {
      type: {
        repetitions: {
          type: Number,
          required: true,
          default: 0,  // Default value for repetitions
        },
        EF: {
          type: Number,
          required: true,
          default: 2.5,  // Default value for EF
        },
        interval: {
          type: Number,
          required: true,
          default: 0,  // Default value for interval
        },
      },
      default: () => ({
        repetitions: 0,  // Default value for repetitions
        EF: 2.5,  // Default value for EF
        interval: 0,  // Default value for interval
      }),
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Card = models.Card || mongoose.model("Card", cardSchema);
export default Card;