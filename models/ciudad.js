import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// Definición del modelo Ciudad
const Ciudad = sequelize.define('Ciudad', {
    id_ciudad: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_ciudad: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'ciudades', // Nombre de la tabla
    timestamps: false,     // No se usarán timestamps
});

// Establecer relaciones usando importaciones dinámicas
(async () => {
    const { Hotel } = await import("./hotel.js"); // Importación dinámica
    const { PrecioCiudad } = await import("./precioCiudad.js"); // Importación dinámica

    Ciudad.hasMany(Hotel, { foreignKey: 'id_ciudad', as: 'hoteles' });
    Hotel.belongsTo(Ciudad, { foreignKey: 'id_ciudad', as: 'ciudadHotel' });

    Ciudad.hasMany(PrecioCiudad, { foreignKey: 'id_ciudad', as: 'precios' });
    PrecioCiudad.belongsTo(Ciudad, { foreignKey: 'id_ciudad', as: 'ciudadPrecio' });
})();

export { Ciudad }; // Exportación nombrada
