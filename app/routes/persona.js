import express from 'express';
const router = express.Router();

import { validateStore } from '../http/validator/persona';
import authMiddleware from '../http/middleware/authMiddleware';
import * as personaController from '../http/controller/personaController';

router.route('/')
    .get(authMiddleware, personaController.index)
    .post(authMiddleware, validateStore, personaController.store);

router.route('/:id_persona')
    .get(authMiddleware, personaController.show)
    .put(authMiddleware, validateStore, personaController.update)
    .delete(authMiddleware, personaController.destroy);

export default router;
