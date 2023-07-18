"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const handleValidationError_1 = __importDefault(require("../../errors/handleValidationError"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
const handleCastError_1 = __importDefault(require("../../errors/handleCastError"));
const handleDuplicateEntryError_1 = __importDefault(require("../../errors/handleDuplicateEntryError"));
// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (error, req, res, next) => {
    console.log('🚀 globalHandler ~', error);
    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorMessages = [];
    let stack = undefined;
    //handling error for mongoose validation error
    if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
        stack = config_1.default.env === 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined;
    }
    //handling error for zod validation error
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
        stack = config_1.default.env === 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined;
    }
    //handling error for duplicate entry error
    else if (error.code === 11000) {
        const simplifiedError = (0, handleDuplicateEntryError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
        stack = config_1.default.env === 'production' ? error.stack : undefined;
    }
    //handling error for cast error
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
        stack = config_1.default.env === 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined;
    }
    //handling error for API error
    else if (error instanceof ApiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
        stack = config_1.default.env === 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined;
    }
    //handling error for built inError
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
        stack = config_1.default.env === 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined;
    }
    ////sending response
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack,
    });
};
exports.default = globalErrorHandler;
