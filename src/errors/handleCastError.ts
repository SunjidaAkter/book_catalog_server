import mongoose from 'mongoose';
import IGenericErrorMessage from '../app/interfaces/error';
import { IGenericErrorResponse } from '../app/interfaces/common';

const handleCastError = (
  error: mongoose.Error.CastError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid ID!',
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: 'Cast Error!',
    errorMessages: errors,
  };
};
export default handleCastError;
