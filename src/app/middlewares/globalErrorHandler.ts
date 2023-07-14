/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import IGenericErrorMessage from '../interfaces/error';
import config from '../../config';
import handleValidationError from '../../errors/handleValidationError';
import ApiError from '../../errors/ApiError';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import handleCastError from '../../errors/handleCastError';
import handleDuplicateEntryError from '../../errors/handleDuplicateEntryError';

// eslint-disable-next-line no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('🚀 globalHandler ~', error);

  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages: IGenericErrorMessage[] = [];
  let stack: string | undefined = undefined;

  //handling error for mongoose validation error
  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
    stack = config.env === 'production' ? error?.stack : undefined;
  }

  //handling error for zod validation error
  else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
    stack = config.env === 'production' ? error?.stack : undefined;
  }

  //handling error for duplicate entry error
  else if (error.code === 11000) {
    const simplifiedError = handleDuplicateEntryError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
    stack = config.env === 'production' ? error.stack : undefined;
  }

  //handling error for cast error
  else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
    stack = config.env === 'production' ? error?.stack : undefined;
  }

  //handling error for API error
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
    stack = config.env === 'production' ? error?.stack : undefined;
  }

  //handling error for built inError
  else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
    stack = config.env === 'production' ? error?.stack : undefined;
  }

  ////sending response
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack,
  });
};

export default globalErrorHandler;
