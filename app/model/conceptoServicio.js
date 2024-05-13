import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ConceptoServicioSchema = Schema({
    descripcion: { type: String, required: true },
    tipo_servicio: { type: mongoose.Schema.Types.ObjectId, ref: 'tiposervicios', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null },
    isActive: { type: Boolean, default: true }
});

ConceptoServicioSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.__v;
    }
});

ConceptoServicioSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updated_at: new Date() });
    next();
});

ConceptoServicioSchema.pre('remove', function(next) {
    this.deleted_at = new Date();
    this.save(); // Guarda el documento para actualizar el campo "deleted_at"
    next();
});

export default model('conceptoservicios', ConceptoServicioSchema);
