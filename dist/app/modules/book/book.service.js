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
exports.bookService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const book_model_1 = require("../book/book.model");
const book_constant_1 = require("./book.constant");
//creating function
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.create(payload);
    return result;
});
//all books gettting function
const getAllBooks = (fliteringOptions, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    //getting the fields for searching and Filtering
    const { searchTerm } = fliteringOptions, filtersTerm = __rest(fliteringOptions, ["searchTerm"]);
    //searching
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: book_constant_1.bookSearchableFields.map(field => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            })),
        });
    }
    //filtering
    if (Object.keys(filtersTerm).length) {
        andConditions.push({
            $and: Object.entries(filtersTerm).map(([field, value]) => {
                if (field == 'publicationYear') {
                    return {
                        $expr: {
                            $eq: [
                                {
                                    $substrBytes: [
                                        '$publicationDate',
                                        { $subtract: [{ $strLenBytes: '$publicationDate' }, 4] },
                                        4,
                                    ],
                                },
                                value,
                            ],
                        },
                    };
                }
                else {
                    return { [field]: value };
                }
            }),
        });
    }
    //Handle Searching queries
    const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};
    //paginating
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    //sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    //Getting the data by sort and pagination
    const result = yield book_model_1.Book.find(whereCondition)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    //getting the total count of data
    const total = yield book_model_1.Book.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
//single data setting function
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //getting book by id
    const result = yield book_model_1.Book.findById(id);
    return result;
});
//updating function
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //updating
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
//deleting function
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //delete data
    const result = yield book_model_1.Book.findByIdAndDelete(id);
    return result;
});
//creating function
const postReview = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.Book.findOne({ _id: id });
    //checking  if book is found
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book Not Found!');
    }
    yield book_model_1.Book.findByIdAndUpdate({ _id: id }, { $push: { reviews: { $each: payload.reviews } } }, { new: true });
    const result = yield book_model_1.Book.findById({ _id: id }, { reviews: 1 });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to update review!');
    }
    return result;
});
//single data setting function
const getReviews = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //getting book by id
    const result = yield book_model_1.Book.findById({ _id: id }, { reviews: 1 });
    return result;
});
exports.bookService = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
    postReview,
    getReviews,
};
