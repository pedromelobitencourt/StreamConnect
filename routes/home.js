const express = require('express');
const Home = require('../controllers/home.js')
const router = express.Router();

router.get("/",Home.getHome)

module.exports = router;