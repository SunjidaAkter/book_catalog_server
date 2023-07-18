"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (error) => {
    const errors = Object.values(error.errors).map((element) => {
        return {
            path: element === null || element === void 0 ? void 0 : element.path,
            message: element === null || element === void 0 ? void 0 : element.message,
        };
    });
    const statusCode = 400;
    const errorMessage = 'Validation Error!';
    const errorMessages = errors;
    return {
        statusCode,
        message: errorMessage,
        errorMessages,
    };
};
exports.default = handleValidationError;
