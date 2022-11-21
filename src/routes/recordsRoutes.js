import { Router } from 'express';
import {
  recordDelete,
  recordPost,
  recordEditGet,
  recordEditPut,
  recordsGet,
} from '../controllers/recordsController.js';
import authValidationMiddleware from '../middleware/authValidationMiddleware.js';
import newRecordValidationMiddleware from '../middleware/newRecordValidationMiddleware.js';

const router = Router();
router.use(authValidationMiddleware);

router.get('/records', recordsGet);
router.get('/record/edit/:id', recordEditGet);
router.delete('/record/delete/:id', recordDelete);

router.use(newRecordValidationMiddleware);

router.post('/record/:way', recordPost);
router.put('/record/edit/:id', recordEditPut);

export default router;
