import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const TipoDocumentoSchema = Schema({
    descripcion: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null }
});

TipoDocumentoSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.__v;
    }
});


TipoDocumentoSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updated_at: new Date() });
    next();
});


TipoDocumentoSchema.pre('remove', function(next) {
    this.deleted_at = new Date();
    this.save(); // Save the document to update the deleted_at field
    next();
});

export default model('tipodocumentos', TipoDocumentoSchema);
