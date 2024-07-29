const db = require('../config/mysqlConfig'); // Ajusta la ruta según sea necesario
const bcrypt = require('bcrypt');
const saltRounds = 10; // Número de rondas de sal para cifrar la contraseña

// Función para crear un nuevo administrador
const createAdmin = async (adminData) => {
    const { nombre, correo, contraseña } = adminData;

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    // Guardar el administrador con la contraseña cifrada
    await db.query(
        'INSERT INTO administradores (nombre, correo, contraseña) VALUES (?, ?, ?)',
        [nombre, correo, hashedPassword]
    );
};

// Función para obtener un administrador por correo
const getAdminByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM administradores WHERE correo = ?', [email]);
    return rows[0];
};

module.exports = {
    createAdmin,
    getAdminByEmail
};
