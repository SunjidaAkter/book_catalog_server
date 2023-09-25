import { Schema, model } from 'mongoose';
import { BookModel, IBook } from './book.interface';

const bookSchema = new Schema<IBook, Record<string, unknown>>(
  {
    title: { type: String, unique: true, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationDate: { type: String, required: true },
    reviews: { type: [String], required: false },
    readList: { type: [String], required: false },
    wishList: { type: [String], required: false },
    readStatus: {
      type: [{ user: { type: String }, status: { type: Boolean } }],
      required: false,
    },
    addedBy: { type: String, required: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Book = model<IBook, BookModel>('Book', bookSchema);
