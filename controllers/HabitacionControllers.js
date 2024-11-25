import { Habitacion } from "../models/habitacion.js";

// Controlador para la entidad Habitacion
export const createHabitacion = async (req, res) => {
    try {
        const nuevaHabitacion = await Habitacion.create(req.body);
        return res.status(201).json(nuevaHabitacion);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getHabitaciones = async (req, res) => {
    try {
        const habitaciones = await Habitacion.findAll();
        return res.status(200).json(habitaciones);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getHabitacionById = async (req, res) => {
    const { id } = req.params;
    try {
        const habitacion = await Habitacion.findByPk(id);
        if (!habitacion) {
            return res.status(404).json({ mensaje: "Habitación no encontrada" });
        }
        return res.status(200).json(habitacion);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateHabitacion = async (req, res) => {
    const { id } = req.params;
    try {
        const habitacion = await Habitacion.findByPk(id);
        if (!habitacion) {
            return res.status(404).json({ mensaje: "Habitación no encontrada" });
        }
        await habitacion.update(req.body);
        return res.status(200).json(habitacion);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteHabitacion = async (req, res) => {
    const { id } = req.params;
    try {
        const habitacion = await Habitacion.findByPk(id);
        if (!habitacion) {
            return res.status(404).json({ mensaje: "Habitación no encontrada" });
        }
        await habitacion.destroy();
        return res.status(204).json(); // Sin contenido
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
