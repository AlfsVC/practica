import express from 'express';
const router = express.Router();

import { validateStore } from '../http/validator/preguntaEncuesta';
import authMiddleware from '../http/middleware/authMiddleware';
import * as preguntaEncuesta from '../http/controller/preguntaEncuestaController';

router.route('/')
    .get(authMiddleware, preguntaEncuesta.index)
    .post(authMiddleware, validateStore, preguntaEncuesta.store);

router.route('/:id_preguntaEncuesta')
    .get(authMiddleware, preguntaEncuesta.show)
    .put(authMiddleware, validateStore, preguntaEncuesta.update)
    .delete(authMiddleware, preguntaEncuesta.destroy);

export default router;
