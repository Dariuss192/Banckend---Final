import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// Definición del modelo Hotel
export const Hotel = sequelize.define('Hotel', {
    id_hotel: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_hotel: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    id_ciudad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ciudades',
            key: 'id_ciudad'
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    precio_hora: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    precio_dia: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    valoracion_promedio: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true
    }
}, {
    tableName: 'hoteles',
    timestamps: false,
});

// Establecer relaciones usando importaciones dinámicas
(async () => {
    const { Ciudad } = await import("./ciudad.js");
    const { Habitacion } = await import("./habitacion.js");
    const { Reserva } = await import("./reserva.js");
    const { Puntuacion } = await import("./puntuacion.js");

    Hotel.belongsTo(Ciudad, { foreignKey: 'id_ciudad', as: 'ciudad' });
    Hotel.hasMany(Habitacion, { foreignKey: 'id_hotel', as: 'habitaciones' });
    Habitacion.belongsTo(Hotel, { foreignKey: 'id_hotel', as: 'hotel' }); // Cambiado aquí
    Hotel.hasMany(Reserva, { foreignKey: 'id_hotel', as: 'reservas' });
    Reserva.belongsTo(Hotel, { foreignKey: 'id_hotel', as: 'hotelReserva' });
    Hotel.hasMany(Puntuacion, { foreignKey: 'id_hotel', as: 'puntuaciones' });
    Puntuacion.belongsTo(Hotel, { foreignKey: 'id_hotel', as: 'hotelPuntuacion' });
})();
