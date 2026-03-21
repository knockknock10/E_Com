import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(createOrder)
  .get(restrictTo('admin'), getAllOrders);

router.route('/myorders')
  .get(getMyOrders);

router.route('/:id')
  .get(getOrderById)
  .patch(restrictTo('admin'), updateOrderStatus);

export default router;
