import { Model } from 'mongoose';

//filtering type
export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationYear?: number;
};

//response type for get all
export type IGetResponseForBooks<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

//main
export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews?: string[];
};
export type BookModel = Model<IBook, Record<string, unknown>>;
