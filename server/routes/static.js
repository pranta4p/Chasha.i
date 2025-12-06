const express = require('express');
const router = express.Router();
require("dotenv").config();

const User = require('../models/User');
const Product = require('../models/Product');

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;


router.get('/', async (req, res) => {
    const token = req.cookies.token;
    let f = 0;
    let userData = null;

    if (token) {
        try {
            const decoded = jwt.verify(token, jwtSecret);
            const userId = decoded.userId;

            userData = await User.findById(userId);

            f = 1;
            // console.log(userData);

        } catch (err) {
            console.error("Invalid token", err.message);
        }
    }

    const products = await Product.find();
    const countUsers = await User.countDocuments();
    res.render("home", { f, userData, products, countUsers });
});



router.get('/home', async (req, res) => {
    const token = req.cookies.token;
    let f = 0;
    let userData = null;

    if (token) {
        try {
            const decoded = jwt.verify(token, jwtSecret);
            const userId = decoded.userId;

            userData = await User.findById(userId);

            f = 1;

        } catch (err) {
            console.error("Invalid token", err.message);
        }
    }

    const products=await Product.find();
    const countUsers = await User.countDocuments();
    res.render("home", {f, userData, products, countUsers});
});


router.get('/marketPlace', async (req, res) => {
  const token = req.cookies.token;
    let f = 0;
    let userData = null;

    if (token) {
        try {
            const decoded = jwt.verify(token, jwtSecret);
            const userId = decoded.userId;

            userData = await User.findById(userId); 
            f = 1;
            // console.log(userData);
           
        } catch (err) {
            console.error("Invalid token", err.message);
        }
    }

    const products = await Product.find();
    // console.log(userData);
    //  console.log(products.length);
    res.render("marketPlace", {f, userData, products});
});


router.get('/marketPlace', async (req, res) => {
    const token = req.cookies.token;
    let f = 0;
    let userData = null;

    if (token) {
        try {
            const decoded = jwt.verify(token, jwtSecret);
            const userId = decoded.userId;

            userData = await User.findById(userId);
            f = 1;
            // console.log(userData);

        } catch (err) {
            console.error("Invalid token", err.message);
        }
    }

    try {
        const products = await Product.find();
        console.log(`Fetched ${products.length} products`);
        // console.log(userData);
        res.render("marketPlace", { f, userData, products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Error loading marketplace");
    }
});

router.get('/weather', async (req, res) => {
    const token = req.cookies.token;
    let f = 0;
    let userData = null;

    if (token) {
        try {
            const decoded = jwt.verify(token, jwtSecret);
            const userId = decoded.userId;

            userData = await User.findById(userId);

            f = 1;
            // console.log(userData);

        } catch (err) {
            console.error("Invalid token", err.message);
        }
    }

    res.render("weather", { f, userData });
})


router.get('/agridoc', async (req, res) => {
    const token = req.cookies.token;
    let f = 0;
    let userData = null;

    if (token) {
        try {
            const decoded = jwt.verify(token, jwtSecret);
            const userId = decoded.userId;

            userData = await User.findById(userId);

            f = 1;
            // console.log(userData);

        } catch (err) {
            console.error("Invalid token", err.message);
        }
    }

    res.render("agridoc", { f, userData });
})

router.get('/aboutUs', (req, res) => {
    console.log("jf");
    res.render("aboutUs", {});
})

router.get('/privacyPolicy', (req, res) => {
    res.render("privacyPolicy", {});
})
router.get('/contactUs', (req, res) => {
    res.render("contactUs", {});
})


module.exports = router;