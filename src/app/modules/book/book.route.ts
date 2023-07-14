import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { bookValidation } from './book.validation';
import { bookController } from './book.controller';

//getting router from express
const router = express.Router();

//creating route
router.post(
  '/',
  validateRequest(bookValidation.createBookZodSchema),
  bookController.createBook
);

//getting single data route
router.get('/:id', bookController.getSingleBook);

//getting all data routes
router.get('/', bookController.getAllBooks);

//updating route
router.patch(
  '/:id',
  validateRequest(bookValidation.updateBookZodSchema),
  bookController.updateBook
);

//deleting single route
router.delete('/:id', bookController.deleteBook);

export const bookRoutes = router;
