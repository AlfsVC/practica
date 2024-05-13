import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const router = express.Router();

import usuario from './usuario.js';
import persona from './persona.js';
import tipoDocumento from './tipoDocumento.js';
import tipoServicio from './tipoServicio.js';
import preguntaEncuesta from './preguntaEncuesta.js';
import conceptoServicio from './conceptoServicio.js';
import servicio from './servicio.js';
import autenticar from './autenticar.js';

router.use(`/${process.env.API_PATH}/usuario`, usuario);
router.use(`/${process.env.API_PATH}/persona`, persona);
router.use(`/${process.env.API_PATH}/tipoDocumento`, tipoDocumento);
router.use(`/${process.env.API_PATH}/tipoServicio`, tipoServicio);
router.use(`/${process.env.API_PATH}/preguntaEncuesta`, preguntaEncuesta);
router.use(`/${process.env.API_PATH}/conceptoServicio`, conceptoServicio);
router.use(`/${process.env.API_PATH}/servicio`, servicio);
router.use(`/${process.env.API_PATH}/autenticar`, autenticar);

export default router;
