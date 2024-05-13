import express from 'express';
const router = express.Router();

import { validateStore } from '../http/validator/servicio';
import authMiddleware from '../http/middleware/authMiddleware';
import * as servicio from '../http/controller/servicio';

router.route('/')
    .get(authMiddleware, servicio.index)
    .post(authMiddleware, validateStore, servicio.store);

router.route('/:id_servicio')
    .get(authMiddleware, servicio.show)
    .put(authMiddleware, validateStore, servicio.update)
    .delete(authMiddleware, servicio.destroy);

export default router;
