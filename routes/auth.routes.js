const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Ruta para registrar un cliente
router.post('/registerCliente', authController.registrarCliente);

// Ruta para hacer login de un cliente
router.post('/loginCliente', authController.loginCliente);

// Ruta para que el administrador cree una nueva oferta
router.post('/admin/promocion', authController.crearPromocion);

// Ruta para que el administrador cree una nueva oferta
router.post('/admin/ofertas', authController.crearOferta);

// Ruta para que el administrador cree un nuevo cupón
router.post('/admin/cupones', authController.crearCupon);

module.exports = router;
