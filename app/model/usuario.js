import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema, model } = mongoose;

const UsuarioSchema = Schema({
    email: { type: String , required: true, match : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
    telefono: { type: String , required: true },
    password: { type: String , required: true, select: false },
    persona: { type: Schema.Types.ObjectId, ref: 'personas', required: true },
    isActive: { type: Boolean, default: true }, // Campo para soft delete,
    created_at: { type:  Date, default: Date.now },
    updated_at: { type: Date, default: null }, // AGREGAMOS ESTO PARA QUE SEA COMO LARAVEL (EDTIAR OH ACTUALIZAR)
    deleted_at: { type: Date, default: null }  // AGREGAMOS ESTO PARA QUE SEA COMO LARAVEL (ELIMINAR SIN PERDERDATOS)
});

UsuarioSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.__v;///OCULTA DEL LLAMADO COMO EN ELPOSTMAN CUANDO TRAEMOS LA DATA
    }
});

UsuarioSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) return next();

        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

UsuarioSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updated_at: new Date() });
    next();
});

UsuarioSchema.pre('remove', async function(next) {
    try {
        this.deleted_at = new Date();
        await this.save(); // Asegúrate de esperar a que se guarde antes de continuar
        next();
    } catch (error) {
        next(error);
    }
});


UsuarioSchema.query.withPassword = function() {
    return this.select('+password');
};

UsuarioSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

export default model('usuarios', UsuarioSchema);
