import { Puntuacion } from "../models/puntuacion.js";

// Controlador para la entidad Puntuacion
export const createPuntuacion = async (req, res) => {
    try {
        const nuevaPuntuacion = await Puntuacion.create(req.body);
        return res.status(201).json(nuevaPuntuacion);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getPuntuaciones = async (req, res) => {
    try {
        const puntuaciones = await Puntuacion.findAll();
        return res.status(200).json(puntuaciones);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getPuntuacionById = async (req, res) => {
    const { id } = req.params;
    try {
        const puntuacion = await Puntuacion.findByPk(id);
        if (!puntuacion) {
            return res.status(404).json({ mensaje: "Puntuación no encontrada" });
        }
        return res.status(200).json(puntuacion);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updatePuntuacion = async (req, res) => {
    const { id } = req.params;
    try {
        const puntuacion = await Puntuacion.findByPk(id);
        if (!puntuacion) {
            return res.status(404).json({ mensaje: "Puntuación no encontrada" });
        }
        await puntuacion.update(req.body);
        return res.status(200).json(puntuacion);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deletePuntuacion = async (req, res) => {
    const { id } = req.params;
    try {
        const puntuacion = await Puntuacion.findByPk(id);
        if (!puntuacion) {
            return res.status(404).json({ mensaje: "Puntuación no encontrada" });
        }
        await puntuacion.destroy();
        return res.status(204).json(); // Sin contenido
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
