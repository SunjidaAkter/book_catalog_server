import { MongoError } from 'mongodb';
import IGenericErrorMessage from '../app/interfaces/error';
import { IGenericErrorResponse } from '../app/interfaces/common';

const handleDuplicateEntryError = (
  error: MongoError
): IGenericErrorResponse => {
  if (error.code === 11000 && error.message.includes('duplicate key error')) {
    const match = error.message.match(/index: ([a-zA-Z0-9_]+) dup key/);
    const field = match ? match[1] : '';

    const errorMessages: IGenericErrorMessage[] = [
      { path: field, message: error.message },
    ];

    const statusCode = 400;

    return {
      statusCode,
      message: 'Duplicate Entry',
      errorMessages,
    };
  }

  const statusCode = 400;
  const errorMessages: IGenericErrorMessage[] = [
    { path: "Didn't find the path!", message: "Didn't get the message!" },
  ];
  return {
    statusCode,
    message: 'Something went wrong',
    errorMessages,
  };
};

export default handleDuplicateEntryError;
