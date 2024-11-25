import express from "express";
import {
    createUsuario,
    getUsuarios,
    getUsuarioById,
    deleteUsuario,
    loginUsuario,
    updateUsuario
} from "../controllers/UsuarioControllers.js";

const router = express.Router();

// Rutas usuarios
router.post("/", createUsuario);          // POST /api/usuarios
router.get("/", getUsuarios);             // GET /api/usuarios
router.get("/:id", getUsuarioById);       // GET /api/usuarios/:id
router.put("/:id", updateUsuario);        // PUT /api/usuarios/:id
router.delete("/:id", deleteUsuario);     // DELETE /api/usuarios/:id
router.post("/login", loginUsuario);      // POST /api/usuarios/login

export default router;
