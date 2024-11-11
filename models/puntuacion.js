import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// Definición del modelo Puntuacion
export const Puntuacion = sequelize.define('Puntuacion', {
    id_puntuacion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    puntuacion: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    comentario: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'puntuaciones',
    timestamps: false,
});

// Establecer la relación aquí, si no lo has hecho antes
(async () => {
    const { Usuario } = await import("./usuario.js");
    
    // Cambiar el alias aquí también si es necesario
    Puntuacion.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuarioQuePuntua' }); // Cambiado aquí
})();
