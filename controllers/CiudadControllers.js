import { Ciudad } from "../models/ciudad.js";

export const createCiudad = async (req, res) => {
    try {
        const nuevaCiudad = await Ciudad.create(req.body); // Crear una nueva ciudad
        return res.status(201).json(nuevaCiudad);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getCiudades = async (req, res) => {
    try {
        const ciudades = await Ciudad.findAll(); // Mostrar todas las ciudades
        return res.status(200).json(ciudades);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getCiudadById = async (req, res) => {
    const { id } = req.params;
    try {
        const ciudad = await Ciudad.findByPk(id); // Mostrar ciudades por Id
        if (!ciudad) {
            return res.status(404).json({ mensaje: "Ciudad no encontrada" });
        }
        return res.status(200).json(ciudad);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateCiudad = async (req, res) => {
    const { id } = req.params;
    try {
        const ciudad = await Ciudad.findByPk(id); // Actualizar Ciudad
        if (!ciudad) {
            return res.status(404).json({ mensaje: "Ciudad no encontrada" });
        }
        await ciudad.update(req.body);
        return res.status(200).json(ciudad);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteCiudad = async (req, res) => {
    const { id } = req.params;
    try {
        const ciudad = await Ciudad.findByPk(id); // Eliminar ciudad
        if (!ciudad) {
            return res.status(404).json({ mensaje: "Ciudad no encontrada" });
        }
        await ciudad.destroy();
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
