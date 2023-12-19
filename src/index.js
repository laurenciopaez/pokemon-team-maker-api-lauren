require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const session = require('express-session');

//seguridad
const helmet = require('helmet');
const cors = require('cors');

const indexRouter = require('./routes/index.routes');
const { handleOptions } = require('./utils/middlewares/handleOptMiddleware');

const app = express();

//manejo de cache
app.use( (req, res, next) => {
  res.setHeader('Cache-Control', 'max-age=3600');
  next();
})

//manejo de solicitudes options
//app.use(handleOptions);

app.use(
    session({
      secret: `${process.env.SESSION_SECRET}`,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: true },
    })
  );

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(cors({ origin: `${process.env.CLIENT_URI}` }));

app.use('/api', indexRouter);
module.exports = app;

