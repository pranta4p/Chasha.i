const express = require('express');
const router = express.Router();

const cookieParser = require('cookie-parser');
router.use(cookieParser());


router.use('/',require('./auth'));
router.use('/',require('./static'));
router.use('/',require('./account'));
router.use('/',require('./tutorial'));
router.use('/',require('./blog'));
router.use('/',require('./product'));

module.exports=router;
