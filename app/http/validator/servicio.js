const { body } = require('express-validator');

export const validateStore = [
    body('cliente')
        .trim()
        .not().isEmpty().withMessage('El campo cliente es requerido')
        .isMongoId().withMessage('El campo cliente debe ser un identificador MongoDB válido'),

    body('concepto_servicio')
        .trim()
        .not().isEmpty().withMessage('El campo concepto_servicio es requerido')
        .isMongoId().withMessage('El campo concepto_servicio debe ser un identificador MongoDB válido'),

    body('fecha')
        .trim()
        .not().isEmpty().withMessage('El campo fecha es requerido')
        .isISO8601().withMessage('El campo fecha debe estar en formato ISO8601'),

    body('hora')
        .trim()
        .not().isEmpty().withMessage('El campo hora es requerido'),

    body('ubicacion.*.posicion_x')
        .optional()
        .trim(),

    body('ubicacion.*.posicion_y')
        .optional()
        .trim(),

    body('cuestionario.*.pregunta')
        .trim()
        .not().isEmpty().withMessage('El campo pregunta es requerido')
        .isMongoId().withMessage('El campo pregunta debe ser un identificador MongoDB válido'),

    body('cuestionario.*.respuesta')
        .trim(),

    body('imagenes.*.ruta_imagen')
        .trim(),

    body('imagenes.*.comentario')
        .trim(),

    body('precio')
        .isNumeric().withMessage('El campo precio debe ser un número')
        .not().isEmpty().withMessage('El campo precio es requerido'),

    body('precio_final')
        .isNumeric().withMessage('El campo precio_final debe ser un número')
        .not().isEmpty().withMessage('El campo precio_final es requerido'),

    body('tecnico')
        .trim()
        .not().isEmpty().withMessage('El campo tecnico es requerido')
        .isMongoId().withMessage('El campo tecnico debe ser un identificador MongoDB válido'),

    body('estado')
        .optional()
        .isIn(['Pendiente', 'Publicado', 'En Progreso','Completado', 'Cancelado', 'Rechazado', 'Facturado', 'Pagado']).withMessage('El campo estado debe ser uno de: Pendiente, Publicado, En Progreso, Completado, Cancelado, Rechazado, Facturado, Pagado'),

    // Puedes agregar más validaciones según sea necesario
];
