const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.json());

// Lista temporal de usuarios
const usuarios = [];

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Servicio web funcionando correctamente'
    });
});

// Registro de usuario
app.post('/registro', (req, res) => {
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;

    // Validamos que se hayan enviado los datos
    if (!usuario || !contrasena) {
        return res.status(400).json({
            error: 'El usuario y la contraseña son obligatorios'
        });
    }

    // Comprobamos si el usuario ya existe
    const existe = usuarios.find(function (u) {
        return u.usuario === usuario;
    });

    if (existe) {
        return res.status(409).json({
            error: 'El usuario ya está registrado'
        });
    }

    // Guardamos el usuario
    usuarios.push({
        usuario: usuario,
        contrasena: contrasena
    });

    res.status(201).json({
        mensaje: 'Usuario registrado correctamente'
    });
});

// Inicio de sesión
app.post('/login', (req, res) => {
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;

    // Buscamos las credenciales
    const encontrado = usuarios.find(function (u) {
        return u.usuario === usuario && u.contrasena === contrasena;
    });

    if (encontrado) {
        return res.json({
            mensaje: 'Autenticación satisfactoria'
        });
    }

    res.status(401).json({
        error: 'Error en la autenticación'
    });
});

// Iniciamos el servidor
app.listen(PORT, function () {
    console.log('Servidor ejecutándose en http://localhost:3000');
});