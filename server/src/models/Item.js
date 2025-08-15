import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema(
  {
    codigo: { type: String, required: true, unique: true, trim: true, uppercase: true, index: true },
    nombre: { type: String, required: true, trim: true, index: true, minlength: 2, maxlength: 120 },
    fotoUrl: { type: String, default: '' },
    descripcion: { type: String, default: '', maxlength: 2000 },
    cantidad: { type: Number, required: true, min: 0 },
    precio: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

ItemSchema.index({ nombre: 'text', descripcion: 'text' });

export const Item = mongoose.model('Item', ItemSchema);