import IGenericErrorMessage from './error';

export type IName = {
  firstName: string;
  lastName: string;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total?: number;
  } | null;
  data?: T | null;
};
