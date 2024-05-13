import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ServicioSchema = Schema({
    cliente: { type: Schema.Types.ObjectId, ref: 'usuarios', required: true },
    concepto_servicio: { type: Schema.Types.ObjectId, ref: 'conceptoservicios', required: true },
    fecha: { type: Date, required: true }, // La fecha debe ser proporcionada por el cliente
    hora: { type: String, required: true },
    ubicacion: [
        {
            posicion_x: { type: String },
            posicion_y: { type: String }
        }
    ],
    cuestionario: [
        {
            pregunta: { type: Schema.Types.ObjectId, ref: 'preguntaEncuetas', required: true },
            respuesta: { type: String }
        }
    ],
    imagenes: [
        {
            ruta_imagen: { type: String },
            comentario: { type: String }
        }
    ],
    precio: { type: Number, required: true }, 
    precio_final: { type: Number, required: true }, 
    tecnico: { type: Schema.Types.ObjectId, ref: 'usuarios', required: true },
    estado: {type: String, enum: ['Pendiente', 'Publicado', 'En Progreso','Completado', 'Cancelado', 'Rechazado', 'Facturado', 'Pagado'], default: 'Publicado' }, 
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: null },
    delete_at: { type: Date, default: null }
});

ServicioSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.__v;
    }
});

// Middleware para actualizar la marca de tiempo "update_at" antes de actualizar un documento
ServicioSchema.pre('findOneAndUpdate', function(next) {
    this.set({ update_at: new Date() });
    next();
});

export default model('servicios', ServicioSchema);
