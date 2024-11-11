import { Reserva } from "../models/reserva.js";

// Controlador para la entidad Reserva
export const createReserva = async (req, res) => {
    try {
        const nuevaReserva = await Reserva.create(req.body);
        return res.status(201).json(nuevaReserva);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getReservas = async (req, res) => {
    try {
        const reservas = await Reserva.findAll();
        return res.status(200).json(reservas);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getReservaById = async (req, res) => {
    const { id } = req.params;
    try {
        const reserva = await Reserva.findByPk(id);
        if (!reserva) {
            return res.status(404).json({ mensaje: "Reserva no encontrada" });
        }
        return res.status(200).json(reserva);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateReserva = async (req, res) => {
    const { id } = req.params;
    try {
        const reserva = await Reserva.findByPk(id);
        if (!reserva) {
            return res.status(404).json({ mensaje: "Reserva no encontrada" });
        }
        await reserva.update(req.body);
        return res.status(200).json(reserva);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteReserva = async (req, res) => {
    const { id } = req.params;
    try {
        const reserva = await Reserva.findByPk(id);
        if (!reserva) {
            return res.status(404).json({ mensaje: "Reserva no encontrada" });
        }
        await reserva.destroy();
        return res.status(204).json(); // Sin contenido
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
