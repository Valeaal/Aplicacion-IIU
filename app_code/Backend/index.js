// server/index.js

const express = require("express");
const cors = require('cors')
const jwt = require('jsonwebtoken'); // Importar JWT para generar tokens
//const bcrypt = require('bcrypt'); // Importar bcrypt para comparar contraseñas
//para hacer querys
const sequelize = require('./bbdd');
const {Usuario, Alumno}  = require('./Model/associations');


const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json()); // Middleware para parsear el cuerpo de la solicitud como JSON
app.use(cors())

// Ruta para autenticar y obtener token de sesión
/*
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Buscar usuario por email en la base de datos
      const user = await Usuario.findOne({ where: { email } });

      if (!user) {
        console.log('');
        return res.status(401).json({ error: 'Correo no encontrado' });
      }

      // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        console.log('');
        return res.status(401).json({ error: 'Contraseña inválida' });
      }

      // Generar token de sesión (aquí se puede personalizar la información en el token)
      const token = jwt.sign({ userId: user.id, userType: user.tipo }, 'secret_key', { expiresIn: '1h' });

      // Enviar el token como respuesta
      res.json({ token });

  } catch (error) {
    console.log('');
    console.error('Error al autenticar usuario:', error);
     res.status(500).json({ error: 'Error interno del servidor' });
  }
});
*/

//ALUMNO
const alumnoRouter = require("./Routes/alumnoRoutes.js")
app.use('/alumno', alumnoRouter);

//CITA
const citaRouter = require("./Routes/citaRoutes.js")
app.use('/cita', citaRouter);

//COMUNICADO
const comunicadoRouter = require("./Routes/comunicadoRoutes.js")
app.use('/comunicado', comunicadoRouter);

//DIAS CERRADOS
const diaCerradoRouter = require("./Routes/diasCerradosRoutes.js")
app.use('/diasCerrados', diaCerradoRouter);

//NOTICIA
const noticiaRouter = require("./Routes/noticiaRoutes.js")
app.use('/noticia', noticiaRouter);

//PETICION
const peticionRouter = require("./Routes/peticionRoutes.js")
app.use('/peticion', peticionRouter);

//USUARIO
const usuarioRouter = require("./Routes/usuarioRoutes.js")
app.use('/usuario', usuarioRouter);

sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados con la base de datos');
  })
  .catch((error) => {
    console.error('Error al sincronizar los modelos:', error);
  });

  app.get("/", (req, res) => {
    res.send("Esta es la API");
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});