import { Usuario } from "../models/usuario.js";
import bcrypt from "bcryptjs";

// Controlador para la entidad Usuario
export const createUsuario = async (req, res) => {
        try {
            const { nombre, email, telefono, password } = req.body;
    
            // Verificar si el usuario ya existe
            const existingUser = await Usuario.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: "El email ya está en uso." });
            }
    
            // Cifrar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Crear el nuevo usuario
            const newUser = await Usuario.create({
                nombre,
                email,
                telefono,
                password: hashedPassword,
            });
    
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: "Error en el registro", error });
        }
    };
export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        await usuario.destroy();
        return res.status(204).json(); // Sin contenido
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
export const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta." });
        }

        // Generar token
        const token = jwt.sign({ id: user.id_usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "Error en el inicio de sesión", error });
    }
};

// Función para actualizar información del usuario
export const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, telefono } = req.body;

        const user = await Usuario.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Actualizar información
        await user.update({ nombre, email, telefono });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario", error });
    }
};

