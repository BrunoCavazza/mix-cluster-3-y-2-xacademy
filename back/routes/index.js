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
const mysql = require('mysql2');
const excelJs = require('exceljs');
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
          user: 'minaclaverogob@gmail.com',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: tokenAcceso,
        },
      });
      const mailOptions = {
        from: 'minaclaverogob@gmail.com',
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
    if (err) {
      console.error('Error al ejecutar la consulta SQL:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    const mysqlData = JSON.parse(JSON.stringify(data));

    try {
      const fileHeader = [
        { header: 'Turista', key: 'Turista' },
        { header: 'Difusion', key: 'Difusion' },
        { header: 'Motivo', key: 'Motivo' },
        { header: 'Reserva', key: 'Reserva' },
        { header: 'Tipo Hospedaje', key: 'Tipo_Hospedaje' },
        { header: 'Calificacion Hospedaje', key: 'Calificacion_Hospedaje' },
        { header: 'Material Informativo', key: 'Material_Informativo' },
        { header: 'Oficina', key: 'Oficina' },
        { header: 'Tipo Informacion', key: 'Tipo_Informacion' },
        { header: 'Medio Informacion', key: 'Medio_Informacion' },
        { header: 'Tipo Material', key: 'Tipo_Material' },
        { header: 'Calificacion Informacion', key: 'Calificacion_Informacion' },
        { header: 'Otra Informacion', key: 'Otra_Informacion' },
        { header: 'Que Informacion', key: 'Que_Informacion' },
        { header: 'Calificacion MC', key: 'Calificacion_MC' },
        { header: 'Recomendaria', key: 'Recomendaria' },
        { header: 'createdAt', key: 'createdAt' },
        { header: 'updatedAt', key: 'updatedAt' },
      ];

      const workbook = new excelJs.Workbook();
      const sheet = workbook.addWorksheet('data');
      sheet.columns = fileHeader;

      mysqlData.forEach((row) => {
        sheet.addRow(row);
      });

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=data.xlsx',
      );

      workbook.xlsx.write(res)
        .then(() => {
          res.end();
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
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
