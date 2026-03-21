import express from 'express';
import { getMe, getUser, updateMe, addAddress, deleteAddress, getAllUsers } from '../controllers/userController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router.get('/me', getMe, getUser);
router.patch('/updateMe', updateMe);

router.post('/addresses', addAddress);
router.delete('/addresses/:addressId', deleteAddress);

router.get('/', restrictTo('admin'), getAllUsers);

export default router;
