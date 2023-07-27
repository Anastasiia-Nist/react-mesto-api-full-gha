const usersRouter = require('express').Router();
const {
  userIdValidation,
  updateProfileValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');
const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/:userId', userIdValidation, getUserById);
usersRouter.patch('/me', updateProfileValidation, updateUserProfile);
usersRouter.patch('/me/avatar', updateAvatarValidation, updateUserAvatar);

module.exports = usersRouter;
