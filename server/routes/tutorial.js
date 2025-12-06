const express = require('express');
const router = express.Router();
require("dotenv").config();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const auth=require('../middleware/auth');
const upload=require('../middleware/upload');
const cloudinary=require('../config/cloudinary');

const User = require('../models/User');
const Tutorial=require('../models/Tutorial')


router.get('/tutorial', async(req, res) => {
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

    const tutorials = await Tutorial.find();
    res.render("tutorials", {f, userData, tutorials});
})


router.get('/tutorialsAdd',auth, async(req, res) => {
  try {
    res.render("tutorialsAdd", {});
  } catch (error) {
    res.status(500).send("Server Error");
  }
})

router.post('/tutorialsAdd',auth,
  upload.single('img'), async(req, res) => {
     try {
      const {
        name,
        title,
        description,
        duration,
        attribute1,
        attribute2, 
        attribute3,
        videoLink,
      } = req.body;
    
      const result = await cloudinary.uploader.upload(req.file.path);
      const user = await User.findById(req.user.userId);
      const tutorial = new Tutorial({
       name,
        title,
        description,
        duration,
        attribute1,
        attribute2, 
        attribute3,
        author_name:user.name,
        videoLink,
        image: result.secure_url,
      });
      console.log(tutorial);
       
      const savedtutorial=await tutorial.save();
      user.postedTutorials.push(savedtutorial._id);
       await user.save()
      // console.log(user);
      res.redirect('/tutorial');
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to add tutorial');
    }
  
})



module.exports=router;