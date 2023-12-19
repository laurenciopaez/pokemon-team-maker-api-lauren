const express = require("express");

const authRoutes = require("./subroutes/authRoutes.js");

const favoritesRoutes = require("./subroutes/favoritesRoutes.js");

const router = express.Router();
//favorites
router.use("/favs", favoritesRoutes);

//login, register, logout
router.use("/auth", authRoutes);

module.exports = router;
