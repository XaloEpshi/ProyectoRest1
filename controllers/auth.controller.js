const mysqlPool = require('../mysqlConfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = require('../config/authConfig').secret;

// Registro de clientes
exports.registrarCliente = (req, res) => {
    const { nombre, correo, contraseña } = req.body;
    const hashedPassword = bcrypt.hashSync(contraseña, 8);

    const query = 'INSERT INTO usuarios (nombre, correo, contraseña, rol) VALUES (?, ?, ?, ?)';
    const values = [nombre, correo, hashedPassword, 'Cliente'];

    mysqlPool.query(query, values, (error, results) => {
        if (error) {
            console.error('Error al registrar el cliente:', error);
            return res.status(500).json({ error: 'Error al registrar el cliente' });
        }
        res.status(201).json({ message: 'Cliente registrado correctamente' });
    });
};

// Login de clientes
exports.loginCliente = (req, res) => {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
        return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
    }

    const query = 'SELECT * FROM usuarios WHERE correo = ?';
    mysqlPool.query(query, [correo], (error, results) => {
        if (error) {
            console.error('Error al buscar el cliente:', error);
            return res.status(500).json({ error: 'Error al buscar el cliente' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        const cliente = results[0];
        const passwordIsValid = bcrypt.compareSync(contraseña, cliente.contraseña);

        if (!passwordIsValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: cliente.idUsuario, role: cliente.rol }, secret, {
            expiresIn: '24h' // 24 horas
        });

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    });
};

// Crear una nueva promocion
exports.crearPromocion = (req, res) => {
    const { nombre, descripcion, tipo, valor, activa } = req.body;

    // Validar que los datos necesarios estén presentes
    if (!nombre || !tipo || !valor) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios (nombre, tipo, valor)' });
    }

    const query = 'INSERT INTO promociones (nombre, descripcion, tipo, valor, activa) VALUES (?, ?, ?, ?, ?)';
    mysqlPool.query(query, [nombre, descripcion, tipo, valor, activa], (error, results) => {
        if (error) {
            console.error('Error al crear la oferta:', error);
            return res.status(500).json({ error: 'Error al crear la oferta' });
        }

        res.status(200).json({ message: 'Oferta creada correctamente' });
    });
};

// Crear una nueva oferta
exports.crearOferta = (req, res) => {
    const { nombre, descripcion, tipo, valor, productos, categoria, fechaInicio, fechaFin, activa } = req.body;

    // Validar que los datos necesarios estén presentes
    if (!nombre || !tipo || !valor || !fechaInicio || !fechaFin) {
        return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados (nombre, tipo, valor, fechaInicio, fechaFin)' });
    }

    const query = 'INSERT INTO ofertas (nombre, descripcion, tipo, valor, productos, categoria, fechaInicio, fechaFin, activa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    mysqlPool.query(query, [nombre, descripcion, tipo, valor, productos, categoria, fechaInicio, fechaFin, activa], (error, results) => {
        if (error) {
            console.error('Error al crear la oferta:', error);
            return res.status(500).json({ error: 'Error al crear la oferta' });
        }

        res.status(200).json({ message: 'Oferta creada correctamente' });
    });
};

// Crear un nuevo cupón
exports.crearCupon = (req, res) => {
    const { codigo, valor, fechaInicio, fechaFin, idPromocion } = req.body;

    // Validar que los datos necesarios estén presentes
    if (!codigo || !valor || !fechaInicio || !fechaFin) {
        return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados (código, valor, fechaInicio, fechaFin)' });
    }

    const query = 'INSERT INTO cupones (codigo, valor, fechaInicio, fechaFin, idPromocion) VALUES (?, ?, ?, ?, ?)';
    mysqlPool.query(query, [codigo, valor, fechaInicio, fechaFin, idPromocion], (error, results) => {
        if (error) {
            console.error('Error al crear el cupón:', error);
            return res.status(500).json({ error: 'Error al crear el cupón' });
        }

        res.status(200).json({ message: 'Cupón creado correctamente' });
    });
};

//ENVIO DE CORREOS

