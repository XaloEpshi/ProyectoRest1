const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const authRoutes = require('./routes/auth.routes');
const comprasRoutes = require('./routes/compras.routes');
const restaurantRoutes = require('./routes/restaurant.routes');
const sequelize = require('./config/database');
require('dotenv').config();


// Middleware para procesar datos codificados en la URL y en formato JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal' });
});

// Sincronizar Sequelize con la base de datos
sequelize.sync().then(() => {
    console.log('Conectado a la base de datos');
}).catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
});

// Middleware para habilitar CORS
app.use(cors());

// Rutas de autenticación Clientes
app.use('/api/auth', authRoutes);

//Ruta Compras
app.use('/compras', comprasRoutes);

// Importar y usar las rutas de restaurantes
app.use('/api', restaurantRoutes);

// Configuración del middleware para servir archivos estáticos
app.use('/upload', express.static(path.join(__dirname, 'upload')));


// Puerto en el que escuchará el servidor
const PORT = process.env.PORT || 3001;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});