import express from 'express';
const router = express.Router();

import { validateStore } from '../http/validator/tipoServicio'; // Importar el validador adecuado
import authMiddleware from '../http/middleware/authMiddleware';
import * as tipoServicio from '../http/controller/tipoServicioController'; // Importar el controlador adecuado

router.route('/')
    .get(authMiddleware, tipoServicio.index)
    .post(authMiddleware, validateStore, tipoServicio.store);

router.route('/:id_tipoServicio')
    .get(authMiddleware, tipoServicio.show)
    .put(authMiddleware, validateStore, tipoServicio.update)
    .delete(authMiddleware, tipoServicio.destroy);

export default router;
