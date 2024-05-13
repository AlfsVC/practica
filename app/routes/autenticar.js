import express from 'express';
const router = express.Router();

import { validateLogin } from '../http/validator/usuario';
import * as Auth from '../http/controller/autenticarController';
 
router.route('/')
    .post(validateLogin, Auth.login)

export default router;