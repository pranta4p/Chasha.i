const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const User = require('../models/User');
const axios = require('axios');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const HF_TOKEN = process.env.HF_TOKEN;
const MODEL_ENDPOINT=process.env.MODEL_ENDPOINT;
const cookieParser = require('cookie-parser');
router.use(cookieParser());


router.use('/', require('./auth'));
router.use('/', require('./static'));
router.use('/', require('./account'));
router.use('/', require('./tutorial'));
router.use('/', require('./blog'));
router.use('/', require('./product'));
router.use('/', require('./chat'));

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
            

        } catch (err) {
            console.error("Invalid token", err.message);
        }
    }

    res.render("agridoc", { f, userData });
})

router.post('/analyze', upload.single('image'), async (req, res) => {
    try {
        if (!process.env.HF_TOKEN) {
            return res.status(500).json({ error: 'Server configuration error: HF_TOKEN missing' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        const response = await axios.post(
            MODEL_ENDPOINT,
            req.file.buffer,
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_TOKEN}`,
                    'Content-Type': 'application/octet-stream'
                }
            }
        );

        res.json(response.data);

    } catch (error) {
        console.error('Error proxying to Hugging Face:', error.message);
        if (error.response) {
            return res.status(500).json({ error: `AI Model Error: ${JSON.stringify(error.response.data)}` });
        }
        res.status(500).json({ error: 'Failed to analyze image' });
    }
});


module.exports = router;
