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
  IReviews,
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
        if (field == 'publicationYear') {
          if (value === '' && field === 'publicationYear') {
            return { [field]: { $ne: '' } };
          } else
            return {
              $expr: {
                $eq: [
                  {
                    $substrBytes: [
                      '$publicationDate',
                      { $subtract: [{ $strLenBytes: '$publicationDate' }, 4] },
                      4,
                    ],
                  },
                  value,
                ],
              },
            };
        } else {
          if (value === '') {
            return { [field]: { $ne: '' } };
          } else return { [field]: value };
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
  const total = await Book.countDocuments(whereCondition);
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

//creating function
const postReview = async (
  id: string,
  payload: Partial<IBook>
): Promise<IReviews | null> => {
  const isExist = await Book.findOne({ _id: id });

  //checking  if book is found
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book Not Found!');
  }
  await Book.findByIdAndUpdate(
    { _id: id },
    { $push: { reviews: { $each: payload.reviews } } },
    { new: true }
  );
  const result = await Book.findById({ _id: id }, { reviews: 1 });
  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update review!'
    );
  }
  return result;
};
//creating function
const postStatus = async (payload: Partial<IBook>): Promise<IBook[] | null> => {
  const updatedBooks = await Book.updateMany(
    {},
    { $push: { readStatus: { $each: payload.readStatus } } },
    { new: true }
  );

  if (!updatedBooks) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update status!'
    );
  }
  const result = await Book.find();
  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update review!'
    );
  }
  return result;
};
const updateStatus = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const isExist = await Book.findOne({ _id: id });

  //checking  if book is found
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book Not Found!');
  }
  const userEmail = payload?.readStatus?.[0]?.user;
  if (!userEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!');
  }
  const userStatus = payload?.readStatus?.[0]?.status;
  // console.log(userStatus);
  await Book.updateOne(
    { _id: id, readStatus: { $elemMatch: { user: userEmail } } },
    { $set: { 'readStatus.$.status': !userStatus } },
    { new: true }
  );

  const result = await Book.findById({ _id: id });
  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update review!'
    );
  }
  return result;
};
//creating function
const postRead = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const isExist = await Book.findOne({ _id: id });

  //checking  if book is found
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book Not Found!');
  }
  await Book.findByIdAndUpdate(
    { _id: id },
    { $addToSet: { readList: { $each: payload.readList } } },
    { new: true }
  );
  const result = await Book.findById({ _id: id });
  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update review!'
    );
  }
  return result;
};
//creating function
const postWish = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const isExist = await Book.findOne({ _id: id });

  //checking  if book is found
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book Not Found!');
  }
  await Book.findByIdAndUpdate(
    { _id: id },
    { $addToSet: { wishList: { $each: payload.wishList } } },
    { new: true }
  );
  const result = await Book.findById({ _id: id });
  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update review!'
    );
  }
  return result;
};

//single data setting function
const getReviews = async (id: string): Promise<IReviews | null> => {
  //getting book by id
  const result = await Book.findById({ _id: id }, { reviews: 1 });
  return result;
};
const getList = async (): Promise<IBook[] | null> => {
  //getting book by id
  const result = await Book.find();
  return result;
};

export const bookService = {
  createBook,
  getAllBooks,
  getList,
  getSingleBook,
  updateBook,
  deleteBook,
  postReview,
  postStatus,
  updateStatus,
  postRead,
  postWish,
  getReviews,
};
