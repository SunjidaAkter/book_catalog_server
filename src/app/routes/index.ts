import express from 'express';
import { bookRoutes } from '../modules/book/book.route';
//Getting router from express
const router = express.Router();

const moduleRoutes = [
  {
    path: '/books',
    route: bookRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
