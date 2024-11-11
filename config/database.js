import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Esto es necesario para conexiones seguras
            }
        }
    }
);

// Probar la conexión
sequelize.authenticate()
    .then(() => {
        console.log("Conexión a la base de datos exitosa!");
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos', err);
    });
