import { validationResult } from 'express-validator';
import Persona from '../../model/persona';
import { error, success } from '../helpers/httpResponse';
import { validationErrors } from '../helpers/myHelper';

export const index = async (req, res) => {
    try {
        const personas = await Persona.find({ delete_at: null }).populate("tipo_documento");
        return success(res, 'OK', 200, personas);
    } catch (e) {
        return error(res, e.message, 500);
    }
};

export const show = async (req, res) => {
    const { id_persona } = req.params;
    try {
        const persona = await Persona.findOne({ _id: id_persona, delete_at: null });
        if (!persona) {
            return error(res, 'La persona no existe', 404);
        }
        return success(res, 'OK', 200, persona);
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
            nombre,
            apellido,
            nacionalidad,
            tipo_documento,
            nro_documento,
            direccion,
            imagenes
        } = req.body;

        const existingPersona = await Persona.findOne({ nro_documento });
        if (existingPersona) {
            return error(res, 'La persona ya existe', 409);
        }

        const persona = new Persona({
            nombre,
            apellido,
            nacionalidad,
            tipo_documento,
            nro_documento,
            direccion,
            imagenes
        });
        const createdPersona = await persona.save();

        return success(res, 'Persona creada exitosamente', 201, createdPersona);
    } catch (e) {
        return error(res, e.message, 500);
    }
};

export const update = async (req, res) => {
    const { id_persona } = req.params;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const myErrors = validationErrors(errors.array());
            return error(res, 'Error de validación', 422, myErrors);
        }

        const {
            nombre,
            apellido,
            nacionalidad,
            tipo_documento,
            nro_documento,
            direccion,
            imagenes
        } = req.body;

        const persona = await Persona.findByIdAndUpdate(
            id_persona,
            {
                nombre,
                apellido,
                nacionalidad,
                tipo_documento,
                nro_documento,
                direccion,
                imagenes,
                updated_at: new Date()
            },
            { new: true }
        );
        if (!persona) {
            return error(res, 'La persona no existe', 404);
        }

        return success(res, 'Persona actualizada exitosamente', 200, persona);
    } catch (e) {
        return error(res, e.message, 500);
    }
};

export const destroy = async (req, res) => {
    const { id_persona } = req.params;
    try {
        const persona = await Persona.findByIdAndUpdate(
            id_persona,
            { $set: { delete_at: new Date() } },
            { new: true }
        );
        if (!persona) {
            return error(res, 'La persona no existe', 404);
        }
        return success(res, 'Persona marcada como eliminada exitosamente', 200, persona);
    } catch (e) {
        return error(res, e.message, 500);
    }
};

