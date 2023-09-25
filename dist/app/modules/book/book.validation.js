"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookValidation = void 0;
const zod_1 = require("zod");
// zod request validation for creating data
//data(object)-->body(object)-->{name, age,...}
const createBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required!',
        }),
        author: zod_1.z.string({
            required_error: "Author's name is required!",
        }),
        genre: zod_1.z.string({
            required_error: 'Genre is required!',
        }),
        publicationDate: zod_1.z.string({
            required_error: "Publication's date is required!",
        }),
        reviews: zod_1.z.array(zod_1.z.string()).optional(),
        readList: zod_1.z.array(zod_1.z.string()).optional(),
        readStatus: zod_1.z
            .array(zod_1.z.object({ user: zod_1.z.string(), status: zod_1.z.boolean() }))
            .optional(),
        wishList: zod_1.z.array(zod_1.z.string()).optional(),
        addedBy: zod_1.z.string().optional(),
        status: zod_1.z.boolean().optional(),
    }),
});
//zod request validation for updating data
//data(object)-->body(object)-->{name, age,...}
const updateBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
        publicationDate: zod_1.z.string().optional(),
        reviews: zod_1.z.array(zod_1.z.string()).optional(),
        addedBy: zod_1.z.string().optional(),
        status: zod_1.z.boolean().optional(),
        readList: zod_1.z.array(zod_1.z.string()).optional(),
        readStatus: zod_1.z
            .array(zod_1.z.object({ user: zod_1.z.string(), status: zod_1.z.boolean() }))
            .optional(),
        wishList: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.bookValidation = {
    createBookZodSchema,
    updateBookZodSchema,
};
