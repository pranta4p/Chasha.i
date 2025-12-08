
// --Sign Up and Log IN--  //

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const bcrypt =require('bcrypt')
const crypto = require("crypto");
const fs = require('fs');
const path = require('path');
const nodemailer = require("nodemailer");
const sendVerificationEmail = require("../config/email");

router.use(express.json())
router.use(express.static('public'))

const ensureNotLogedIn=require('../middleware/ensureNotLogedIn');
const upload=require('../middleware/upload');
const cloudinary=require('../config/cloudinary');


const User = require('../models/User');

router.get('/logIn',ensureNotLogedIn, (req, res) => {
    res.render("logIn", {});
})
router.post('/logIn',  async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    //  Check if user exists
    const user = await  User.findOne({ email });;
    if (!user) {
      return res.status(401).render("messagePage", {
       message: 'Invalid email',
     redirectUrl: "/login"
     });
    }
    if (!user.isVerified) {
      return res.render("messagePage", {
      message: "Please verify your email first!",
      redirectUrl: "/login"
       });
    }

     
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
       return res.status(401).render("messagePage", {
       message: 'Invalid password',
       redirectUrl: "/login"
       });
    }

    //  Generate JWT token
    const token = jwt.sign({ userId: user._id, name: user.name }, jwtSecret, { expiresIn: '1h' });

 
    res.cookie('token', token, {
      httpOnly: true, // Prevents JS access
      maxAge: 3600000, 
      sameSite: 'lax', 
    });

    f=1;
    res.redirect('/home'); 

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).send('Server Error');
  }
});


router.get('/signUp',ensureNotLogedIn,(req, res) => {
    res.render("signUp", {});
})

const getCode = () => {
  const code = Math.floor(Math.random() * 10000)
                .toString()
                .padStart(4, "0");
  return code; // already a string
}


router.post('/signUp', upload.single('img'), async (req, res) => {
 
   try {
    const { email, password, name } = req.body;
    const existingUser = await User.findOne({ email });
    

    if (existingUser) {
      fs.unlinkSync(req.file.path);
         if(!existingUser.isVerified){
             const verificationLink = `https://chasha-i.onrender.com/verify/${existingUser.verificationToken}`;
             await sendVerificationEmail(email, verificationLink,existingUser.verificationCode);
            
             return res.status(401).render("messagePage", {
                message: 'Account already exist,verification email sent, Please check your email to verify your account.',
                redirectUrl: "/enterCode"
               });
        }
       
      return res.status(401).render("messagePage", {
        message: 'User already exists, login please',
        redirectUrl: "/login"
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path);

    const hashedPassword = await bcrypt.hash(password, 10);
    const code=getCode()||10234;
    const token = crypto.randomBytes(32).toString("hex");

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image: result.secure_url,
      isVerified: false,
      verificationToken: token,
      verificationCode:code
    });

    await newUser.save();

    // Send verification email
    // const verifyUrl = `${process.env.BASE_URL}/verify/${token}`;
    const verificationLink = `https://chasha-i.onrender.com/verify/${token}`;
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.EMAIL_PASS
    //   }
    // });

    await sendVerificationEmail(email, verificationLink,code);

    // await transporter.sendMail({
    //   from: process.env.EMAIL,
    //   to: email,
    //   subject: "Verify Your Email",
    //   html: `
    //     <h2>Hello ${name},</h2>
    //     <p>Click the link below to verify your email:</p>
    //     <a href="${verifyUrl}">${verifyUrl}</a>
    //   `
    // });

    res.render("messagePage", {
      message: "Account created! Please check your email to verify your account.",
      redirectUrl: "/enterCode"
    });

  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });

    if (!user) {
      return res.render("messagePage", {
        message: "Invalid or expired verification link.",
        redirectUrl: "/login"
      });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.render("messagePage", {
      message: "Email verified successfully! You can now log in.",
      redirectUrl: "/login"
    });

  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.get("/enterCode", (req, res) => {
    res.render("verifyCode",{});
});

router.post("/verifyCode", async (req, res) => {
    try {
        const { code } = req.body;
       
        const user = await User.findOne({ verificationCode: code });

        if (!user) {
            return res.render("messagePage", {
                message: "Invalid code. Try again.",
                redirectUrl: "/enterCode"
            });
        }

        user.isVerified = true;
        user.verificationCode = null;
        user.verificationToken = null;
        await user.save();

        res.render("messagePage", {
            message: "Email verified successfully!",
            redirectUrl: "/login"
        });

    } catch (err) {
        res.status(500).send("Server Error");
    }
});




router.get('/logOut', (req, res) => {
  res.clearCookie('token');
  res.redirect('/home');
});
module.exports=router;
