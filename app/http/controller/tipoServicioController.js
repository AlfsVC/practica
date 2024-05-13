import { validationResult } from 'express-validator';
import TipoServicio from '../../model/tipoServicio'; // Importar el modelo del tipo de servicio
import { error, success } from '../helpers/httpResponse';
import { validationErrors } from '../helpers/myHelper';

export const index = async (req, res) => {
    try {
        const tiposServicios = await TipoServicio.find({ deleted_at: null }); // Excluir los servicios eliminados
        return success(res, 'OK', 200, tiposServicios);
    } catch (e) {
        return error(res, e.message, 500);
    }
};

export const show = async (req, res) => {
    const { id_tipoServicio } = req.params;
    try {
        const tipoServicio = await TipoServicio.findById(id_tipoServicio);
        if (!tipoServicio) {
            return error(res, 'El TipoServicio no existe', 404);
        }
        return success(res, 'OK', 200, tipoServicio);
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

        const existingTipoServicio = await TipoServicio.findOne({ descripcion });
        if (existingTipoServicio) {
            return error(res, 'El TipoServicio ya existe', 409);
        }

        const tipoServicio = new TipoServicio({ descripcion });
        const createdTipoServicio = await tipoServicio.save();

        return success(res, 'Creado exitosamente', 201, createdTipoServicio);
    } catch (e) {
        return error(res, e.message, 500);
    }
};

export const update = async (req, res) => {
    const { id_tipoServicio } = req.params;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const myErrors = validationErrors(errors.array());
            return error(res, 'Error de validación', 400, myErrors);
        }

        const { descripcion } = req.body;

        const tipoServicio = await TipoServicio.findByIdAndUpdate(
            id_tipoServicio,
            { descripcion, updated_at: new Date() },
            { new: true }
        );

        if (!tipoServicio) {
            return error(res, 'El TipoServicio no existe', 404);
        }

        return success(res, 'Actualizado exitosamente', 200, tipoServicio);
    } catch (e) {
        return error(res, e.message, 500);
    }
};

export const destroy = async (req, res) => {
    const { id_tipoServicio } = req.params;
    try {
        const tipoServicio = await TipoServicio.findByIdAndUpdate(
            id_tipoServicio,
            { deleted_at: new Date() },
            { new: true }
        );

        if (!tipoServicio) {
            return error(res, 'El TipoServicio no existe', 404);
        }

        return success(res, 'Eliminado exitosamente', 200, tipoServicio);
    } catch (e) {
        return error(res, e.message, 500);
    }
};
