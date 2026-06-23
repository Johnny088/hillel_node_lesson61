import { Router } from 'express';
import { updateContactPhoto } from '../controllers/contacts.js';
import { parseFile } from '../middlewares/fileHandler.js';
import { checkToken } from '../middlewares/checkToken.js';

const contactRouter = Router();

contactRouter.use(checkToken);

contactRouter.patch('/', parseFile.single('name'), updateContactPhoto);

export default contactRouter;
