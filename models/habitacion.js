import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// Definición del modelo Habitacion
export const Habitacion = sequelize.define('Habitacion', {
    id_habitacion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_hotel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'hoteles',
            key: 'id_hotel'
        }
    },
    numero_habitacion: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    capacidad_personas: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'habitaciones',
    timestamps: false,
});

// Establecer relaciones usando importaciones dinámicas
(async () => {
    const { Hotel } = await import("./hotel.js");
    const { Reserva } = await import("./reserva.js");

    Habitacion.belongsTo(Hotel, { foreignKey: 'id_hotel', as: 'hotelHabitacion' });
    Habitacion.hasMany(Reserva, { foreignKey: 'id_habitacion', as: 'reservas' });
})();
