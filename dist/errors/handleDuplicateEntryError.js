"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateEntryError = (error) => {
    if (error.code === 11000 && error.message.includes('duplicate key error')) {
        const match = error.message.match(/index: ([a-zA-Z0-9_]+) dup key/);
        const field = match ? match[1] : '';
        const errorMessages = [
            { path: field, message: error.message },
        ];
        const statusCode = 400;
        return {
            statusCode,
            message: 'Duplicate Entry',
            errorMessages,
        };
    }
    const statusCode = 400;
    const errorMessages = [
        { path: "Didn't find the path!", message: "Didn't get the message!" },
    ];
    return {
        statusCode,
        message: 'Something went wrong',
        errorMessages,
    };
};
exports.default = handleDuplicateEntryError;
