import express from 'express';
const router = express.Router();

import { validateStore } from '../http/validator/conceptoServicio';
import authMiddleware from '../http/middleware/authMiddleware';
import * as conceptoServicio from '../http/controller/conceptoServicio';

router.route('/')
    .get(authMiddleware, conceptoServicio.index)
    .post(authMiddleware, validateStore, conceptoServicio.store);

router.route('/:id_conceptoServicio')
    .get(authMiddleware, conceptoServicio.show)
    .put(authMiddleware, validateStore, conceptoServicio.update)
    .delete(authMiddleware, conceptoServicio.destroy);

export default router;
