import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';

//getting app from express
const app: Application = express();

//Cross-Origin Resource Sharing
app.use(cookieParser());
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/v1', router);

//Testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully!');
});

//Global error handler
app.use(globalErrorHandler);

//Handling not found routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMassages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
