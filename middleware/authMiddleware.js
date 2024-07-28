const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });

    jwt.verify(token, 'secret_key', (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
        req.user = user;
        next();
    });
};

// Middleware para autorizar solo a administradores
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Acceso denegado, solo administradores' });
    next();
};

module.exports = {
    authenticateToken,
    authorizeAdmin,
};
