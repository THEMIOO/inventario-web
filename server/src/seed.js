import { connectDB } from './config/db.js';
import { Item } from './models/Item.js';

await connectDB();

await Item.deleteMany();
await Item.insertMany([
  { codigo: 'CPU-I5-12400F', nombre: 'Intel Core i5-12400F', descripcion: 'CPU 6C/12T, LGA1700', cantidad: 10, precio: 18500 },
  { codigo: 'GPU-RTX4060', nombre: 'NVIDIA GeForce RTX 4060 8GB', descripcion: 'Tarjeta de video', cantidad: 5, precio: 38500 }
]);

console.log('Seed completado');
process.exit(0);
