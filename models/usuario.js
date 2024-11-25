import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// Definición del modelo Usuario
export const Usuario = sequelize.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    telefono: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'user', 'guest'),
        allowNull: false,
        defaultValue: 'user'
    },
    fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'usuarios', 
    timestamps: false,
});

// Establecer relaciones usando importaciones dinámicas
(async () => {
    const { Reserva } = await import("./reserva.js");
    const { Puntuacion } = await import("./puntuacion.js");

    // Definir las relaciones con aliases únicos
    Usuario.hasMany(Reserva, { foreignKey: 'id_usuario', as: 'reservas' });
    Reserva.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });
    
    // Cambiar el alias de Puntuacion para evitar conflicto
    Usuario.hasMany(Puntuacion, { foreignKey: 'id_usuario', as: 'puntuaciones' });
    Puntuacion.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuarioPuntuacion' }); // Este alias está bien
})();
