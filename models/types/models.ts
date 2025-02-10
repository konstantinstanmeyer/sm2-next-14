import { Schema} from "mongoose";

export interface CardModel {
    language: string;
    original: string;
    translation: string;
    phonetic?: string;
    context?: string;
    user: typeof Schema.Types.ObjectId;
    superMemo: {
      repetitions: number;  // Match here with schema field name
      EF: number;
      interval: number;
    };
    image?: string;
  }

export interface UserModel {
    email: string;
    name: string;
    cards:  Array<CardModel>;
}