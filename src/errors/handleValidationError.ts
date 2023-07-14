import mongoose from 'mongoose';
import IGenericErrorMessage from '../app/interfaces/error';
import { IGenericErrorResponse } from '../app/interfaces/common';

const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (element: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: element?.path,
        message: element?.message,
      };
    }
  );

  const statusCode = 400;
  const errorMessage = 'Validation Error!';
  const errorMessages = errors;

  return {
    statusCode,
    message: errorMessage,
    errorMessages,
  };
};

export default handleValidationError;
