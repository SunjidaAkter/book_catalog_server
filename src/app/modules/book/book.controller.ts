import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import pick from '../../../shared/pick';
import { bookService } from './book.service';
import { IBook, IReviews } from './book.interface';
import { bookFilterableFields } from './book.constant';

const createBook = catchAsync(async (req: Request, res: Response) => {
  //getting the main data from request body
  const { ...bookData } = req.body;

  //creating data and getting rasult from service
  const result = await bookService.createBook(bookData);

  //sending response
  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book is created successfully!',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  //picking filtering options from request query
  const filteringOptions = pick(req.query, bookFilterableFields);

  //picking paginations options from request query
  const paginationOptions = pick(req.query, paginationFields);

  //getting the result from service
  const result = await bookService.getAllBooks(
    filteringOptions,
    paginationOptions
  );

  //sending response
  sendResponse<IBook[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books are retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  //taking id from params
  const id = req.params.id;

  //getting single data by id from service
  const result = await bookService.getSingleBook(id);

  //sending response
  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book is retrieved successfully!',
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  //taking id from params
  const id = req.params.id;

  //getting the main data from request body
  const updatedData = req.body;

  //updating data and getting rasult from service
  const result = await bookService.updateBook(id, updatedData);

  //sending response
  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book is updated successfully!',
    data: result,
  });
});

const deleteBook = async (req: Request, res: Response) => {
  //taking id from params
  const id = req.params.id;

  //deleting data
  const result = await bookService.deleteBook(id);

  //sending response
  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book is deleted successfully!',
    data: result,
  });
};

const postReview = catchAsync(async (req: Request, res: Response) => {
  //taking id from params
  const id = req.params.id;

  //getting the main data from request body
  const updatedData = req.body;

  //updating data and getting rasult from service
  const result = await bookService.postReview(id, updatedData);

  //sending response
  sendResponse<IReviews>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review is updated successfully!',
    data: result,
  });
});

const getReviews = catchAsync(async (req: Request, res: Response) => {
  //taking id from params
  const id = req.params.id;

  //getting single data by id from service
  const result = await bookService.getReviews(id);

  //sending response
  sendResponse<IReviews>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reviews are retrieved successfully!',
    data: result,
  });
});

export const bookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  postReview,
  getReviews,
};
