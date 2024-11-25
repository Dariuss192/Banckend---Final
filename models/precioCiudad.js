import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// Definición del modelo PrecioCiudad
export const PrecioCiudad = sequelize.define('PrecioCiudad', {
    id_precio: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_ciudad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ciudades', // Asegúrate de que este sea el nombre correcto de la tabla
            key: 'id_ciudad'   // Asegúrate de que este campo sea correcto
        }
    },
    precio_minimo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    precio_maximo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'precios_por_ciudad', // Nombre de la tabla
    timestamps: false,
});

// Establecer relaciones usando importaciones dinámicas
(async () => {
    const { Ciudad } = await import("./ciudad.js"); // Importa Ciudad dinámicamente
    if (Ciudad) {
        PrecioCiudad.belongsTo(Ciudad, { foreignKey: 'id_ciudad', as: 'ciudad' });
    } else {
        console.error("El modelo Ciudad no se ha importado correctamente.");
    }
})();
