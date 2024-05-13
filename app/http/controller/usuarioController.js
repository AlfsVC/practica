import { validationResult } from 'express-validator';
import Usuario from '../../model/usuario';
import { error, success } from '../helpers/httpResponse';
import { validationErrors } from '../helpers/myHelper';

export const index = async (req, res) => {
    try {
        const users = await Usuario.find({ deleted_at: null }).populate('persona');

        return success(res, 'Usuarios obtenidos correctamente.', 200, users);
    } catch (error) {
        return error(res, error.message, 500);
    }
}

export const show = async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const user = await Usuario.findOne({ _id: id_usuario, deleted_at: null }).populate('persona');

        if (!user) {
            return error(res, 'Usuario no encontrado.', 404);
        }

        return success(res, 'Usuario obtenido correctamente.', 200, user);
    } catch (error) {
        return error(res, error.message, 500);
    }
}

export const store = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const myErrors = validationErrors(errors.array());
            return error(res, 'Error de validación.', 400, myErrors);
        }

        const { email, telefono, password, persona } = req.body;

        const existingUser = await Usuario.findOne({ email, deleted_at: null });
        if (existingUser) {
            return error(res, 'El usuario ya existe.', 409);
        }

        const newUser = new Usuario({ email, telefono, password, persona });
        await newUser.save();

        return success(res, 'Usuario creado correctamente.', 201, newUser);
    } catch (error) {
        return error(res, error.message, 500);
    }
}

export const update = async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const myErrors = validationErrors(errors.array());
            return error(res, 'Error de validación.', 400, myErrors);
        }

        const { email, telefono, password } = req.body;

        // Buscar el usuario por ID y asegurarse de que no esté marcado como eliminado
        const user = await Usuario.findOne({ _id: id_usuario, deleted_at: null });
        if (!user) {
            return error(res, 'Usuario no encontrado o ya eliminado.', 404);
        }

        // Actualizar los campos del usuario
        user.email = email;
        user.telefono = telefono;
        user.password = password;
        
        // Establecer la fecha y hora de actualización
        user.updated_at = new Date();
        
        // Guardar el usuario actualizado
        await user.save();

        return success(res, 'Usuario actualizado correctamente.', 200, user);
    } catch (error) {
        return error(res, error.message, 500);
    }
}

export const destroy = async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const user = await Usuario.findByIdAndUpdate(id_usuario, { deleted_at: new Date() }, { new: true });
        if (!user) {
            return error(res, 'Usuario no encontrado.', 404);
        }
        return success(res, 'Usuario marcado como eliminado correctamente.', 200, user);
    } catch (err) {
        return error(res, err.message, 500);
    }
}


