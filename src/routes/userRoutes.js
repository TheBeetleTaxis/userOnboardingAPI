import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { registrationValidator, loginValidator, updateValidator } from '../utils/validators/userValidator.js';


const router = express.Router();

router.post('/', registrationValidator, registerUser);
router.post('/auth', loginValidator, authUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .delete(protect, deleteUserProfile)
  .put(protect, updateValidator, updateUserProfile);

export default router;
