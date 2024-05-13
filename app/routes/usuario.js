import express from 'express';
const router = express.Router();

import { validateStore } from '../http/validator/usuario';
import authMiddleware from '../http/middleware/authMiddleware';
import * as UsuarioController from '../http/controller/usuarioController';

router.route('/')
    .get(authMiddleware, UsuarioController.index)
    .post(validateStore, UsuarioController.store);

router.route('/:id_usuario')
    .get(authMiddleware, UsuarioController.show)
    .put(authMiddleware, UsuarioController.update)
    .delete(authMiddleware, UsuarioController.destroy);

export default router;
