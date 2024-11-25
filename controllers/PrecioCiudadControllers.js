import { PrecioCiudad } from "../models/precioCiudad.js";

// Controlador para la entidad PrecioPorCiudad
export const createPrecioPorCiudad = async (req, res) => {
    try {
        const nuevoPrecio = await PrecioCiudad.create(req.body);
        return res.status(201).json(nuevoPrecio);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getPreciosPorCiudad = async (req, res) => {
    try {
        const precios = await PrecioCiudad.findAll();
        return res.status(200).json(precios);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getPrecioPorCiudadById = async (req, res) => {
    const { id } = req.params;
    try {
        const precio = await PrecioCiudad.findByPk(id);
        if (!precio) {
            return res.status(404).json({ mensaje: "Precio no encontrado" });
        }
        return res.status(200).json(precio);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updatePrecioPorCiudad = async (req, res) => {
    const { id } = req.params;
    try {
        const precio = await PrecioCiudad.findByPk(id);
        if (!precio) {
            return res.status(404).json({ mensaje: "Precio no encontrado" });
        }
        await precio.update(req.body);
        return res.status(200).json(precio);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deletePrecioPorCiudad = async (req, res) => {
    const { id } = req.params;
    try {
        const precio = await PrecioCiudad.findByPk(id);
        if (!precio) {
            return res.status(404).json({ mensaje: "Precio no encontrado" });
        }
        await precio.destroy();
        return res.status(204).json(); // Sin contenido
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
