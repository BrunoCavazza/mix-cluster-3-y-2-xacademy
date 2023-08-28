/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
// eslint-disable-next-line import/extensions, import/no-unresolved

const Express = require('express');
const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Middlewares:
const rootPath = require('../middleware/root_path.middleware');
const errors = require('../middleware/error_handler.middleware');
const { sequelize } = require('../models');
const surveyController = require('../controllers/surveyControllers');

const Survey = require('../models/survey')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);
const validateToken = require('./validate-token');

const app = Express();

// Rutas

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

app.post('/send', surveyController.createSurvey);

app.use('/ping', (req, res) => {
  res.json({
    response: 'pong!',
  });
});
app.use('/', rootPath.handler);
app.use(rootPath.setHeaders);
app.use(errors.handler);

module.exports = app;
