
// --Sign Up and Log IN--  //

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const cookieParser = require('cookie-parser');
router.use(cookieParser());

// if loged in it says already logged in 
const ensureNotLogedIn=require('../middleware/ensureNotLogedIn');
const upload=require('../middleware/upload');

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
       message: 'Invalid email or password',
     redirectUrl: "/login"
     });
    }
    // console.log(user);

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
router.post('/signUp',upload.single('img'), async(req, res) => {
     console.log(req.body);
    try {
    const {email, password,name } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
       return res.status(401).render("messagePage", {
       message: 'User already exists,login please',
       redirectUrl: "/login"
       }); 
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image:imagePath
    });

    // Save to DB
    await newUser.save();

    // console.log('User saved:', newUser);
    res.redirect('/logIn');

  } catch (err) {
    console.error('Error saving user:', err.message);
    res.status(500).send('Server Error');
  }
})


router.get('/logOut', (req, res) => {
  res.clearCookie('token');
  res.redirect('/home');
});
module.exports=router;
