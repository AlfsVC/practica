import { validationResult } from 'express-validator';
import TipoDocumento from '../../model/tipoDocumento';
import { error, success } from '../helpers/httpResponse';
import { validationErrors } from '../helpers/myHelper';

export const index = async (req, res) => {
    try {
        const tiposDocumentos = await TipoDocumento.find({ deleted_at: null }); // Agregar condición para excluir los documentos eliminados
        return success(res, 'ok!.', 200, tiposDocumentos);
    } catch (e) {
        return error(res, e.message, 500);
    }
};


export const show = async (req, res) => {
    const { id_tipoDocumento } = req.params;
    try {
        const tipoDocumento = await TipoDocumento.findById(id_tipoDocumento);
        if (!tipoDocumento) {
            return error(res, 'The TipoDocumento does not exist!.', 404);
        }
        return success(res, 'ok!.', 200, tipoDocumento);
    } catch (e) {
        return error(res, e.message, 500);
    }
};

export const store = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const myErrors = validationErrors(errors.array());
            return error(res, 'Validation Error!.', 500, myErrors);
        }

        const { descripcion } = req.body;

        const existingTipoDocumento = await TipoDocumento.findOne({ descripcion });
        if (existingTipoDocumento) {
            return error(res, 'The TipoDocumento already exists!.', 409);
        }

        const tipoDocumento = new TipoDocumento({ descripcion });
        const createdTipoDocumento = await tipoDocumento.save();

        return success(res, 'Created successfully!.', 201, createdTipoDocumento);
    } catch (e) {
        return error(res, e.message, 500);
    }
};

export const update = async (req, res) => {
    const { id_tipoDocumento } = req.params;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const myErrors = validationErrors(errors.array());
            return error(res, 'Validation Error!', 400, myErrors);
        }

        const { descripcion } = req.body;

        const tipoDocumento = await TipoDocumento.findByIdAndUpdate(
            id_tipoDocumento,
            { descripcion, updated_at: new Date() }, // Agregar updated_at
            { new: true }
        );

        if (!tipoDocumento) {
            return error(res, 'The TipoDocumento does not exist!', 404);
        }

        return success(res, 'Updated successfully!', 200, tipoDocumento);
    } catch (e) {
        return error(res, e.message, 500);
    }
};

export const destroy = async (req, res) => {
    const { id_tipoDocumento } = req.params;
    try {
        const tipoDocumento = await TipoDocumento.findByIdAndUpdate(
            id_tipoDocumento,
            { $set: { deleted_at: new Date() } },
            { new: true }
        );

        if (!tipoDocumento) {
            return error(res, 'The TipoDocumento does not exist!', 404);
        }

        return success(res, 'Deleted successfully!', 200, tipoDocumento);
    } catch (e) {
        return error(res, e.message, 500);
    }
};
