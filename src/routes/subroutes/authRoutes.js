const express = require('express');

//login
const loginUser = require('../../controllers/auth/loginController');

//signup
const signupUser = require('../../controllers/auth/signupController');

//middleware
const {
    userAlreadyExistsMiddleware,
  } = require("../../utils/middlewares/authMiddleware");
  
///////////////////////////////

const router = express.Router();

//////////// RUTAS ////////////////

//falta agregar el userAlreadyExistsMiddleware
router.post("/signup", userAlreadyExistsMiddleware, signupUser);

router.post("/login", loginUser);


module.exports = router;