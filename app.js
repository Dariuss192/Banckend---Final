import express from "express";
import bodyParser from "body-parser";
import CiudadRoutes from './routes/CiudadRoutes.js';
import HabitacionRoutes from "./routes/HabitacionRoutes.js";
import HotelRoutes from "./routes/HotelRoutes.js";
import PrecioPorCiudadRoutes from "./routes/PrecioCiudadRoutes.js";
import PuntuacionRoutes from "./routes/PuntuacionRoutes.js";
import ReservaRoutes from "./routes/ReservaRoutes.js";
import UsuarioRoutes from "./routes/UsuarioRoutes.js";
import { sequelize } from "./config/database.js"; // Correcto import de sequelize

// Importar los modelos
import { Usuario } from './models/usuario.js';
import { Puntuacion } from './models/puntuacion.js';
import { Reserva } from './models/reserva.js';
import { Habitacion } from './models/habitacion.js';
import { Hotel } from './models/hotel.js';
import { PrecioCiudad } from './models/precioCiudad.js';
import { Ciudad } from './models/ciudad.js';

// Establecer las relaciones entre los modelos
(async () => {
    try {
        // Relaciones entre Usuario, Reserva y Puntuacion
        await Usuario.hasMany(Reserva, { foreignKey: 'id_usuario', as: 'reservas' });
        await Reserva.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

        await Usuario.hasMany(Puntuacion, { foreignKey: 'id_usuario', as: 'puntuaciones' });
        await Puntuacion.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuarioPuntuacion' });

        // Relaciones entre Hotel, Habitacion y PrecioCiudad
        await Hotel.hasMany(Habitacion, { foreignKey: 'id_hotel', as: 'habitaciones' });
        await Habitacion.belongsTo(Hotel, { foreignKey: 'id_hotel', as: 'hotel' });

        await Hotel.hasMany(PrecioCiudad, { foreignKey: 'id_hotel', as: 'precios' });
        await PrecioCiudad.belongsTo(Hotel, { foreignKey: 'id_hotel', as: 'hotelPrecio' });

        // Relaciones entre Ciudad y Hotel
        await Ciudad.hasMany(Hotel, { foreignKey: 'id_ciudad', as: 'hoteles' });
        await Hotel.belongsTo(Ciudad, { foreignKey: 'id_ciudad', as: 'ciudadHotel' }); // Alias cambiado

        // Sincronización de la base de datos
        await sequelize.sync({ alter: true });  // Usando alter para evitar perder datos en desarrollo
        console.log('Base de datos sincronizada');

        // Levantar el servidor después de sincronizar la base de datos
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al sincronizar la base de datos', error);
    }
})();

const app = express();
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
    res.send("API funcionando correctamente.");
});

// Manejo de errores
app.use((err, req, res, next) => {
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ error: err.message });
    }
    console.error(err.stack);
    res.status(500).send("Algo salió mal.");
});
