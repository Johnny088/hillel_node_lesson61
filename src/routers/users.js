import { Router } from 'express';
import { updateUserPhoto } from '../controllers/users.js';
import { parseFile } from '../middlewares/fileHandler.js';
import { celebrate } from 'celebrate';
import { idSchema } from '../validation/general.js';
import { checkToken } from '../middlewares/checkToken.js';

const usersRouter = Router();

usersRouter.use(checkToken);

usersRouter.patch(
  '/:id',
  celebrate(idSchema),
  parseFile.single('name'),
  updateUserPhoto,
);

export default usersRouter;
