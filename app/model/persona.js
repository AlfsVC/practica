import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const PersonaSchema = Schema({
    nombre: { type: String , required: true },
    apellido: { type: String , required: true },
    nacionalidad: { type: String , required: true },
    tipo_documento: { type: mongoose.Schema.Types.ObjectId, ref: 'tipodocumentos', required: true },
    nro_documento: { type: String , required: true },
    direccion: { type: String , required: true },
    imagenes: [
        {
            tipo_imagen: { type: String },
            ruta: { type: String }
        }
    ],
    create_at: { type: Date, default: Date.now },
    update_at: { type:  Date, default: null },
    delete_at: { type:  Date, default: null }
});

PersonaSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.__v;
    }
});

// Middleware para marcar la fecha de eliminación "delete_at" antes de eliminar un documento
PersonaSchema.pre('remove', async function(next) {
    try {
        this.deleted_at = new Date();
        await this.save(); // Guarda el documento para actualizar el campo "deleted_at"
        next();
    } catch (error) {
        next(error);
    }
});

// Middleware para actualizar la marca de tiempo "update_at" antes de actualizar un documento
PersonaSchema.pre('findOneAndUpdate', function(next) {
    this.set({ update_at: new Date() });
    next();
});

export default model('personas', PersonaSchema);
