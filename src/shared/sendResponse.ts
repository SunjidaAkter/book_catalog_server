import { Response } from 'express';
import { IGenericApiResponse } from '../app/interfaces/common';

const sendResponse = <T>(res: Response, data: IGenericApiResponse<T>): void => {
  const responseData: IGenericApiResponse<T> = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
