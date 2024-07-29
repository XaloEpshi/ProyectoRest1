const db = require('../config/mysqlConfig'); // Ajusta la ruta según sea necesario
const bcrypt = require('bcrypt');
const saltRounds = 10; // Número de rondas de sal para cifrar la contraseña

// Función para crear un nuevo cliente
const createClient = async (clientData) => {
    const { nombre, correo, contraseña, cupones, ofertas, promociones_activas } = clientData;

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    // Guardar el cliente con la contraseña cifrada
    await db.query(
        'INSERT INTO clientes (nombre, correo, contraseña, cupones, ofertas, promociones_activas) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, correo, hashedPassword, cupones, ofertas, promociones_activas]
    );
};

// Función para obtener un cliente por correo
const getClientByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM clientes WHERE correo = ?', [email]);
    return rows[0];
};

module.exports = {
    createClient,
    getClientByEmail
};
