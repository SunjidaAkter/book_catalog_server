"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const book_validation_1 = require("./book.validation");
const book_controller_1 = require("./book.controller");
//getting router from express
const router = express_1.default.Router();
//creating route
router.post('/', (0, validateRequest_1.default)(book_validation_1.bookValidation.createBookZodSchema), book_controller_1.bookController.createBook);
router.post('/read-status', (0, validateRequest_1.default)(book_validation_1.bookValidation.updateBookZodSchema), book_controller_1.bookController.postStatus);
router.post('/read-list/:id', (0, validateRequest_1.default)(book_validation_1.bookValidation.updateBookZodSchema), book_controller_1.bookController.postRead);
router.post('/wish-list/:id', (0, validateRequest_1.default)(book_validation_1.bookValidation.updateBookZodSchema), book_controller_1.bookController.postWish);
router.patch('/read-status/:id', (0, validateRequest_1.default)(book_validation_1.bookValidation.updateBookZodSchema), book_controller_1.bookController.updateStatus);
router.post('/reviews/:id', (0, validateRequest_1.default)(book_validation_1.bookValidation.updateBookZodSchema), book_controller_1.bookController.postReview);
//getting single data route
router.get('/reviews/:id', book_controller_1.bookController.getReviews);
router.get('/list', book_controller_1.bookController.getList);
//getting single data route
router.get('/:id', book_controller_1.bookController.getSingleBook);
//getting all data routes
router.get('/', book_controller_1.bookController.getAllBooks);
//updating route
router.patch('/:id', (0, validateRequest_1.default)(book_validation_1.bookValidation.updateBookZodSchema), book_controller_1.bookController.updateBook);
//deleting single route
router.delete('/:id', book_controller_1.bookController.deleteBook);
//review updating route
exports.bookRoutes = router;
