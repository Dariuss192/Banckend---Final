import { Hotel } from "../models/hotel.js";

// Controlador para la entidad Hotel
export const createHotel = async (req, res) => {
    try {
        const nuevoHotel = await Hotel.create(req.body);
        return res.status(201).json(nuevoHotel);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getHoteles = async (req, res) => {
    try {
        const hoteles = await Hotel.findAll();
        return res.status(200).json(hoteles);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getHotelById = async (req, res) => {
    const { id } = req.params;
    try {
        const hotel = await Hotel.findByPk(id);
        if (!hotel) {
            return res.status(404).json({ mensaje: "Hotel no encontrado" });
        }
        return res.status(200).json(hotel);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateHotel = async (req, res) => {
    const { id } = req.params;
    try {
        const hotel = await Hotel.findByPk(id);
        if (!hotel) {
            return res.status(404).json({ mensaje: "Hotel no encontrado" });
        }
        await hotel.update(req.body);
        return res.status(200).json(hotel);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteHotel = async (req, res) => {
    const { id } = req.params;
    try {
        const hotel = await Hotel.findByPk(id);
        if (!hotel) {
            return res.status(404).json({ mensaje: "Hotel no encontrado" });
        }
        await hotel.destroy();
        return res.status(204).json(); // Sin contenido
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
