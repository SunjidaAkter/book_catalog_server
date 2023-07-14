import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse } from '../app/interfaces/common';
import IGenericErrorMessage from '../app/interfaces/error';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const statusCode = 400;
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  return {
    statusCode,
    message: 'Validation Error!',
    errorMessages: errors,
  };
};
export default handleZodError;
