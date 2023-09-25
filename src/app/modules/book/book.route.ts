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
router.post(
  '/read-status',
  validateRequest(bookValidation.updateBookZodSchema),
  bookController.postStatus
);
router.post(
  '/read-list/:id',
  validateRequest(bookValidation.updateBookZodSchema),
  bookController.postRead
);
router.post(
  '/wish-list/:id',
  validateRequest(bookValidation.updateBookZodSchema),
  bookController.postWish
);
router.patch(
  '/read-status/:id',
  validateRequest(bookValidation.updateBookZodSchema),
  bookController.updateStatus
);
router.post(
  '/reviews/:id',
  validateRequest(bookValidation.updateBookZodSchema),
  bookController.postReview
);

//getting single data route
router.get('/reviews/:id', bookController.getReviews);

router.get('/list', bookController.getList);
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

//review updating route

export const bookRoutes = router;
