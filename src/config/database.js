import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

mongoose.connect(mongoURI, {})
    .then(() => console.log('Conectado a la base de datos'))
    .catch((error) => console.error('Error connecting to database:', error));

export { mongoose, db };
