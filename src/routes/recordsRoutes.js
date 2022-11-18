import { Router } from 'express';
import {
  recordDelete,
  recordPost,
  recordEditGet,
  recordEditPut,
  recordsGet,
} from '../controllers/recordsController.js';

const router = Router();

router.get('/records', recordsGet);
router.post('/record/:way', recordPost);
router.get('/record/edit/:id', recordEditGet);
router.put('/record/edit/:id', recordEditPut);
router.delete('/record/delete/:id', recordDelete);

export default router;
