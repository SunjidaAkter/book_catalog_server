import { Model } from 'mongoose';

//type for reviews
export type IReviews = {
  reviews?: string[] | null;
};

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

export type IStatus = {
  user: string;
  status: boolean;
};

//main
export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews?: string[] | null;
  readStatus?: IStatus[] | null;
  readList?: string[] | null;
  wishList?: string[] | null;
  addedBy?: string;
};
export type BookModel = Model<IBook, Record<string, unknown>>;
