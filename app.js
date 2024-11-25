import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import CiudadRoutes from './routes/CiudadRoutes.js';
import HabitacionRoutes from "./routes/HabitacionRoutes.js";
import HotelRoutes from "./routes/HotelRoutes.js";
import PrecioPorCiudadRoutes from "./routes/PrecioCiudadRoutes.js";
import PuntuacionRoutes from "./routes/PuntuacionRoutes.js";
import ReservaRoutes from "./routes/ReservaRoutes.js";
import UsuarioRoutes from "./routes/UsuarioRoutes.js";
import { sequelize } from "./config/database.js";

// Crear la instancia de Express
const app = express();

// Configuración de CORS para múltiples orígenes
const corsOptions = {
    origin: ['http://localhost:3001', 'http://localhost:3002'], // Agrega más URLs según sea necesario
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions)); // Aplica CORS con opciones específicas

// Puerto definido a través de variables de entorno (3000 como predeterminado)
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Rutas
app.use("/api/ciudades", CiudadRoutes);
app.use('/api/habitaciones', HabitacionRoutes);
app.use("/api/hoteles", HotelRoutes);
app.use("/api/preciosPorCiudad", PrecioPorCiudadRoutes);
app.use("/api/puntuaciones", PuntuacionRoutes);
app.use("/api/reservas", ReservaRoutes);
app.use("/api/usuarios", UsuarioRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
    res.json({
        mensaje: "API funcionando correctamente.",
        rutas: {
            ciudades: "/api/ciudades",
            habitaciones: "/api/habitaciones",
            hoteles: "/api/hoteles",
            preciosPorCiudad: "/api/preciosPorCiudad",
            puntuaciones: "/api/puntuaciones",
            reservas: "/api/reservas",
            usuarios: "/api/usuarios",
        },
    });
});

// Manejo de errores globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        mensaje: err.message || "Algo salió mal.",
    });
});

// Sincronización de base de datos y arranque del servidor
sequelize.sync() // Sin `force: true` para evitar perder datos
    .then(() => {
        console.log('Base de datos sincronizada correctamente.');

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error al sincronizar la base de datos:', error);
    });
