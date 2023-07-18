"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const pick_1 = __importDefault(require("../../../shared/pick"));
const book_service_1 = require("./book.service");
const book_constant_1 = require("./book.constant");
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //getting the main data from request body
    const bookData = __rest(req.body, []);
    //creating data and getting rasult from service
    const result = yield book_service_1.bookService.createBook(bookData);
    //sending response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Book is created successfully!',
        data: result,
    });
}));
const getAllBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //picking filtering options from request query
    const filteringOptions = (0, pick_1.default)(req.query, book_constant_1.bookFilterableFields);
    //picking paginations options from request query
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    //getting the result from service
    const result = yield book_service_1.bookService.getAllBooks(filteringOptions, paginationOptions);
    //sending response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Books are retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //taking id from params
    const id = req.params.id;
    //getting single data by id from service
    const result = yield book_service_1.bookService.getSingleBook(id);
    //sending response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Book is retrieved successfully!',
        data: result,
    });
}));
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //taking id from params
    const id = req.params.id;
    //getting the main data from request body
    const updatedData = req.body;
    //updating data and getting rasult from service
    const result = yield book_service_1.bookService.updateBook(id, updatedData);
    //sending response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Book is updated successfully!',
        data: result,
    });
}));
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //taking id from params
    const id = req.params.id;
    //deleting data
    const result = yield book_service_1.bookService.deleteBook(id);
    //sending response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Book is deleted successfully!',
        data: result,
    });
});
const postReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //taking id from params
    const id = req.params.id;
    //getting the main data from request body
    const updatedData = req.body;
    //updating data and getting rasult from service
    const result = yield book_service_1.bookService.postReview(id, updatedData);
    //sending response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Review is updated successfully!',
        data: result,
    });
}));
const getReviews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //taking id from params
    const id = req.params.id;
    //getting single data by id from service
    const result = yield book_service_1.bookService.getReviews(id);
    //sending response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Reviews are retrieved successfully!',
        data: result,
    });
}));
exports.bookController = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
    postReview,
    getReviews,
};
