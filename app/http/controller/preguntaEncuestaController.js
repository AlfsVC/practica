import { validationResult } from 'express-validator';
import PreguntaEncuesta from '../../model/preguntaEncuesta'; // Importar el modelo de PreguntaEncuesta
import { error, success } from '../helpers/httpResponse';
import { validationErrors } from '../helpers/myHelper';

export const index = async (req, res) => {
    try {
        const preguntaEncuestas = await PreguntaEncuesta.find({ deleted_at: null }); // Excluir las PreguntaEncuesta eliminadas
        return success(res, 'OK', 200, preguntaEncuestas);
    } catch (e) {
        return error(res, e.message, 500);
    }
};

export const show = async (req, res) => {
    const { id_preguntaEncuesta } = req.params;
    try {
        const preguntaEncuesta = await PreguntaEncuesta.findById(id_preguntaEncuesta);
        if (!preguntaEncuesta) {
            return error(res, 'La PreguntaEncuesta no existe', 404);
        }
        return success(res, 'OK', 200, preguntaEncuesta);
    } catch (e) {
        return error(res, e.message, 500);
    }
};

export const store = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const myErrors = validationErrors(errors.array());
            return error(res, 'Error de validación', 400, myErrors);
        }

        const { descripcion } = req.body;

        const existingPreguntaEncuesta = await PreguntaEncuesta.findOne({ descripcion });
        if (existingPreguntaEncuesta) {
            return error(res, 'La PreguntaEncuesta ya existe', 409);
        }

        const preguntaEncuesta = new PreguntaEncuesta({ descripcion });
        const createdPreguntaEncuesta = await preguntaEncuesta.save();

        return success(res, 'Creado exitosamente', 201, createdPreguntaEncuesta);
    } catch (e) {
        return error(res, e.message, 500);
    }
};

export const update = async (req, res) => {
    const { id_preguntaEncuesta } = req.params;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const myErrors = validationErrors(errors.array());
            return error(res, 'Error de validación', 400, myErrors);
        }

        const { descripcion } = req.body;

        const preguntaEncuesta = await PreguntaEncuesta.findByIdAndUpdate(
            id_preguntaEncuesta,
            { descripcion, updated_at: new Date() },
            { new: true }
        );

        if (!preguntaEncuesta) {
            return error(res, 'La PreguntaEncuesta no existe', 404);
        }

        return success(res, 'Actualizado exitosamente', 200, preguntaEncuesta);
    } catch (e) {
        return error(res, e.message, 500);
    }
};

export const destroy = async (req, res) => {
    const { id_preguntaEncuesta } = req.params;
    try {
        const preguntaEncuesta = await PreguntaEncuesta.findByIdAndUpdate(
            id_preguntaEncuesta,
            { deleted_at: new Date() },
            { new: true }
        );

        if (!preguntaEncuesta) {
            return error(res, 'La PreguntaEncuesta no existe', 404);
        }

        return success(res, 'Eliminado exitosamente', 200, preguntaEncuesta);
    } catch (e) {
        return error(res, e.message, 500);
    }
};
