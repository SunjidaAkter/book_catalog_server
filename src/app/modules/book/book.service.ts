/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPaginationOptions } from '../../interfaces/pagination';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import {
  IBook,
  IBookFilters,
  IGetResponseForBooks,
} from '../book/book.interface';
import { Book } from '../book/book.model';
import { bookSearchableFields } from './book.constant';

//creating function
const createBook = async (payload: IBook): Promise<IBook> => {
  const result = await Book.create(payload);
  return result;
};

//all books gettting function
const getAllBooks = async (
  fliteringOptions: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGetResponseForBooks<IBook[] | null>> => {
  //getting the fields for searching and Filtering
  const { searchTerm, ...filtersTerm } = fliteringOptions;

  //searching
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  //filtering
  if (Object.keys(filtersTerm).length) {
    andConditions.push({
      $and: Object.entries(filtersTerm).map(([field, value]) => {
        if (field == 'maxPrice') {
          return {
            $expr: { $lte: ['$' + 'price', value] },
          };
        } else if (field == 'minPrice') {
          return {
            $expr: { $gte: ['$' + 'price', value] },
          };
        } else {
          return { [field]: value };
        }
      }),
    });
  }

  //Handle Searching queries
  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  //paginating
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  //sorting
  const sortConditions: Record<string, SortOrder> = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  //Getting the data by sort and pagination
  const result = await Book.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  //getting the total count of data
  const total = await Book.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

//single data setting function
const getSingleBook = async (id: string): Promise<IBook | null> => {
  //getting book by id
  const result = await Book.findById(id);
  return result;
};

//updating function
const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const isExist = await Book.findOne({ _id: id });

  //checking  if book is found
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book Not Found!');
  }
  //updating
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

//deleting function
const deleteBook = async (id: string): Promise<IBook | null> => {
  //delete data
  const result = await Book.findByIdAndDelete(id);
  return result;
};

export const bookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
