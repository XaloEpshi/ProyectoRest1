const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware');

// Ruta para crear un nuevo administrador (protegida)
router.post('/create', authenticateToken, authorizeAdmin, adminController.createAdmin);

module.exports = router;
