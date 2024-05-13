import { validationResult } from 'express-validator';
import Servicio from '../../model/servicio';
import { error, success } from '../helpers/httpResponse';
import { validationErrors } from '../helpers/myHelper';

export const index = async (req, res) => {
    try {
        const servicios = await Servicio.find({ delete_at: null }).populate("cliente concepto_servicio tecnico");
        return success(res, 'OK', 200, servicios);
    } catch (e) {
        return error(res, e.message, 500);
    }
};

export const show = async (req, res) => {
    const { id_servicio } = req.params;
    try {
        const servicio = await Servicio.findOne({ _id: id_servicio, delete_at: null }).populate("cliente concepto_servicio tecnico");
        if (!servicio) {
            return error(res, 'El servicio no existe', 404);
        }
        return success(res, 'OK', 200, servicio);
    } catch (e) {
        return error(res, e.message, 500);
    }
};

export const store = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const myErrors = validationErrors(errors.array());
            return error(res, 'Error de validación', 422, myErrors);
        }

        const {
            cliente,
            concepto_servicio,
            fecha,
            hora,
            ubicacion,
            cuestionario,
            imagenes,
            precio,
            precio_final,
            tecnico,
            estado
        } = req.body;

        const servicio = new Servicio({
            cliente,
            concepto_servicio,
            fecha,
            hora,
            ubicacion,
            cuestionario,
            imagenes,
            precio,
            precio_final,
            tecnico,
            estado
        });
        const createdServicio = await servicio.save();

        return success(res, 'Servicio creado exitosamente', 201, createdServicio);
    } catch (e) {
        return error(res, e.message, 500);
    }
};

export const update = async (req, res) => {
    const { id_servicio } = req.params;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const myErrors = validationErrors(errors.array());
            return error(res, 'Error de validación', 422, myErrors);
        }

        const updatedFields = req.body;
        updatedFields.update_at = new Date();

        const servicio = await Servicio.findByIdAndUpdate(
            id_servicio,
            updatedFields,
            { new: true }
        );
        if (!servicio) {
            return error(res, 'El servicio no existe', 404);
        }

        return success(res, 'Servicio actualizado exitosamente', 200, servicio);
    } catch (e) {
        return error(res, e.message, 500);
    }
};

export const destroy = async (req, res) => {
    const { id_servicio } = req.params;
    try {
        const servicio = await Servicio.findByIdAndUpdate(
            id_servicio,
            { $set: { delete_at: new Date() } },
            { new: true }
        );
        if (!servicio) {
            return error(res, 'El servicio no existe', 404);
        }
        return success(res, 'Servicio marcado como eliminado exitosamente', 200, servicio);
    } catch (e) {
        return error(res, e.message, 500);
    }
};
