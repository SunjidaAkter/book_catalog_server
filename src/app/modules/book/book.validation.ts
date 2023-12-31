import { z } from 'zod';

// zod request validation for creating data
//data(object)-->body(object)-->{name, age,...}
const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required!',
    }),
    author: z.string({
      required_error: "Author's name is required!",
    }),
    genre: z.string({
      required_error: 'Genre is required!',
    }),
    publicationDate: z.string({
      required_error: "Publication's date is required!",
    }),
    reviews: z.array(z.string()).optional(),
    readList: z.array(z.string()).optional(),
    readStatus: z
      .array(z.object({ user: z.string(), status: z.boolean() }))
      .optional(),
    wishList: z.array(z.string()).optional(),
    addedBy: z.string().optional(),
    status: z.boolean().optional(),
  }),
});

//zod request validation for updating data
//data(object)-->body(object)-->{name, age,...}
const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    publicationDate: z.string().optional(),
    reviews: z.array(z.string()).optional(),
    addedBy: z.string().optional(),
    status: z.boolean().optional(),
    readList: z.array(z.string()).optional(),
    readStatus: z
      .array(z.object({ user: z.string(), status: z.boolean() }))
      .optional(),
    wishList: z.array(z.string()).optional(),
  }),
});

export const bookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};
