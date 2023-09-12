/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
// eslint-disable-next-line import/extensions, import/no-unresolved

const fs = require('fs');
const Express = require('express');
const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mysql = require("mysql2");
const data_export = require('json2csv').Parser;

// Middlewares:
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const rootPath = require('../middleware/root_path.middleware');
const errors = require('../middleware/error_handler.middleware');
const { sequelize } = require('../models');
const surveyController = require('../controllers/surveyControllers');
const contactoController = require('../controllers/contactoController')

const Survey = require('../models/survey')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);
const Contacto = require('../models/contacto')(sequelize, DataTypes);
const validateToken = require('./validate-token');
const htmlContent = fs.readFileSync('./utils/panfleto-mail.html', 'utf-8');
const app = Express();

// Rutas

// conexion para el csv

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "prueba",
});

// use=
app.get('/getall', validateToken, async (req, res) => {
  try {
    const survey = await Survey.findAll();

    res.json(survey);
  } catch (err) {
    res.json('no funciona de nuevo');
  }
});

app.post('/login', async (req, res) => {
  const { name, password } = req.body;

  const userWname = await User.findOne({ where: { name } }).catch((err) => {
    console.log('Error: ', err);
  });
  if (!userWname) {
    return res.json({ message: 'Usuario o contraseña incorrectas!' });
  }
  if (userWname.password !== password) {
    return res.json({ message: 'Usuario o contraseña incorrectas!' });
  }

  const JwtToken = jwt.sign({ name: userWname.name }, process.env.JWT_SECRET);
  console.log(JwtToken);
  res.json({ token: JwtToken });
});

app.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('Estas autorizado');
});

app.post('/contacto', contactoController.createContacto);

app.get('/getContacts', validateToken, async (req, res) => {
  try {
    const contacto = await Contacto.findAll();

    res.json(contacto);
  } catch (err) {
    res.json('no funciona de nuevo');
  }
});

app.post('/send', surveyController.createSurvey);

// Newsletter
app.post('/newsletter', async (req, res) => {
  const { email } = req.body;
  const { CLIENT_ID } = process.env;
  const { CLIENT_SECRET } = process.env;
  const { REDIRECT_URI } = process.env;
  const { REFRESH_TOKEN } = process.env;

  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
  );

  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  if (!email) {
    return res.status(400).json({ error: 'Ingrese por favor su correo' });
  }

  async function sendMail() {
    try {
      const tokenAcceso = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          type: 'OAuth2',
          user: 'maxirivadero2000@gmail.com',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: tokenAcceso,
        },
      });
      const mailOptions = {
        from: 'maxirivadero2000@gmail.com',
        to: email,
        subject: 'Turismo Mina Clavero',
        html: htmlContent,
      };
      const info = await transporter.sendMail(mailOptions);
      console.log('Correo electrónico enviado:', info.response);
      return res.status(200).json({ message: '¡Gracias!' });
    } catch (error) {
      console.error('Error interno del servidor:', error);
      return res.status(500).json({ error: 'Error interno al enviar el correo' });
    }
  }
  sendMail()
    .then(result => res.status(200).send('enviado'))
    .catch((error) => console.log(error.message));
});

app.get('/export', (req, res, next) => {
  connection.query('SELECT * FROM surveys', (err, data) => {
    const mysql_data = JSON.parse(JSON.stringify(data));

    const file_header = ['Turista', 'Difusion', 'Motivo', 'Reserva', 'Tipo Hospedaje', 'Calificacion Hospedaje', 'Material Informativo', 'Oficina', 'Tipo Informacion', 'Medio Informacion', 'Tipo Material', 'Calificacion Informacion', 'Otra Informacion', 'Que Informacion', 'Calificacion MC', 'Recomendaria']

    const json_data = new data_export({file_header})

    const csv_data = json_data.parse(mysql_data);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=data_surveyMC.csv');
    res.status(200).end(csv_data);
  });
});

app.use('/ping', (req, res) => {
  res.json({
    response: 'pong!',
  });
});
app.use('/', rootPath.handler);
app.use(rootPath.setHeaders);
app.use(errors.handler);

module.exports = app;
