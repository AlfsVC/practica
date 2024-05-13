import { validationResult } from 'express-validator';
import ConceptoServicio from '../../model/conceptoServicio';
import { error, success } from '../helpers/httpResponse';
import { validationErrors } from '../helpers/myHelper';

export const index = async (req, res) => {
    try {
        const conceptoservicios = await ConceptoServicio.find({ deleted_at: null }).populate("tipo_servicio");
        return success(res, 'OK', 200, conceptoservicios);
    } catch (e) {
        return error(res, e.message, 500);
    }
};

export const show = async (req, res) => {
    const { id_conceptoServicio } = req.params;
    try {
        const conceptoServicio = await ConceptoServicio.findById(id_conceptoServicio);
        if (!conceptoServicio) {
            return error(res, 'El ConceptoServicio no existe', 404);
        }
        return success(res, 'OK', 200, conceptoServicio);
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

        const { descripcion, tipo_servicio } = req.body;

        const existingConceptoServicio = await ConceptoServicio.findOne({ descripcion });
        if (existingConceptoServicio) {
            return error(res, 'El ConceptoServicio ya existe', 409);
        }

        const conceptoServicio = new ConceptoServicio({ descripcion, tipo_servicio });
        const createdConceptoServicio = await conceptoServicio.save();

        return success(res, 'Concepto de servicio creado exitosamente', 201, createdConceptoServicio);
    } catch (e) {
        return error(res, e.message, 500);
    }
};

export const update = async (req, res) => {
    const { id_conceptoServicio } = req.params;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const myErrors = validationErrors(errors.array());
            return error(res, 'Error de validación', 422, myErrors);
        }

        const { descripcion, tipo_servicio } = req.body;

        const conceptoServicio = await ConceptoServicio.findByIdAndUpdate(
            id_conceptoServicio,
            { descripcion, tipo_servicio, updated_at: new Date() },
            { new: true }
        );

        if (!conceptoServicio) {
            return error(res, 'El ConceptoServicio no existe', 404);
        }

        return success(res, 'Concepto de servicio actualizado exitosamente', 200, conceptoServicio);
    } catch (e) {
        return error(res, e.message, 500);
    }
};

export const destroy = async (req, res) => {
    const { id_conceptoServicio } = req.params;
    try {
        const conceptoServicio = await ConceptoServicio.findByIdAndUpdate(
            id_conceptoServicio,
            { deleted_at: new Date() },
            { new: true }
        );

        if (!conceptoServicio) {
            return error(res, 'El ConceptoServicio no existe', 404);
        }

        return success(res, 'Concepto de servicio eliminado exitosamente', 200, conceptoServicio);
    } catch (e) {
        return error(res, e.message, 500);
    }
};
