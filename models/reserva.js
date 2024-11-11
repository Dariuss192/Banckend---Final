import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// Definición del modelo Reserva
export const Reserva = sequelize.define('Reserva', {
    id_reserva: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id_usuario'
        }
    },
    id_hotel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'hoteles', 
            key: 'id_hotel'
        }
    },
    id_habitacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'habitaciones', 
            key: 'id_habitacion'
        }
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: false
    },
    modo_reserva: {
        type: DataTypes.ENUM('hora', 'día'),
        allowNull: false
    },
    precio_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'reservas',
    timestamps: false,
});

// Establecer relaciones usando importaciones dinámicas
(async () => {
    const { Usuario } = await import("./usuario.js"); // Importación dinámica
    const { Hotel } = await import("./hotel.js"); // Importación dinámica
    const { Habitacion } = await import("./habitacion.js"); // Importación dinámica

    Reserva.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'reservador' }); 
    Reserva.belongsTo(Hotel, { foreignKey: 'id_hotel', as: 'hotel' }); 
    Reserva.belongsTo(Habitacion, { foreignKey: 'id_habitacion', as: 'habitacionReserva' }); 
})();
