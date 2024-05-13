import express from 'express';
const router = express.Router();

import { validateStore } from '../http/validator/tipoDocumento';
import authMiddleware from '../http/middleware/authMiddleware';
import * as tipoDocumento from '../http/controller/tipoDocumentoController';

router.route('/')
    .get(authMiddleware, tipoDocumento.index)
    .post(authMiddleware, validateStore, tipoDocumento.store);

router.route('/:id_tipoDocumento')
    .get(authMiddleware, tipoDocumento.show)
    .put(authMiddleware, validateStore, tipoDocumento.update)
    .delete(authMiddleware, tipoDocumento.destroy);

export default router;
