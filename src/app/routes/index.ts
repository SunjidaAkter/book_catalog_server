import express from 'express';
// import { userRoutes } from '../modules/user/user.route';
// import { cowRoutes } from '../modules/cow/cow.route';
// import { orderRoutes } from '../modules/order/order.route';
// import { authRoutes } from '../modules/auth/auth.route';
// import { adminRoutes } from '../modules/admin/admin.route';
//Getting router from express
const router = express.Router();

// const moduleRoutes = [
//   {
//     path: '/auth',
//     route: authRoutes,
//   },
//   {
//     path: '/users',
//     route: userRoutes,
//   },
//   {
//     path: '/admins',
//     route: adminRoutes,
//   },
//   {
//     path: '/cows',
//     route: cowRoutes,
//   },
//   {
//     path: '/orders',
//     route: orderRoutes,
//   },
// ];

// moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
