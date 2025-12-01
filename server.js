const express = require('express');
const app = express();
const port = 3000;
const connectDB = require('./server/config/db');
app.use(express.static("public"));

const User = require('./server/models/User');
const Tutorial=require('./server/models/Tutorial')
const Blog=require('./server/models/Blog');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer=require('multer')
const path =require('path')
const mongoose = require('mongoose');
const fs = require('fs');
const jwtSecret = process.env.JWT_SECRET;
const cookieParser = require('cookie-parser');
app.use(cookieParser());
require('dotenv').config();
//

app.set("view engine", "ejs");
connectDB();

const authMiddleware = (req, res, next ) => {
  const token = req.cookies.token;

  if(!token) {
    return res.status(401).render("messagePage", {
       message: "Please login first",
     redirectUrl: "/login"
     });

  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    // req.userId = decoded.userId;
    req.user = { userId: decoded.userId };
    next();
  } catch(error) {
    res.status(401).json( { message: 'Unauthorized'} );
  }
}
const alreadyLogedInMiddleware=(req,res,next)=>{
    const token = req.cookies.token;

  if(token) {
    return res.status(401).render("messagePage", {
       message: 'you are already loged in',
     redirectUrl: "/"
     });
    
  }

  try {
    next();
  } catch(error) {
    res.status(401).json( { message: 'authorization failed'} );
  }
}



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads')); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});
const upload=multer({storage:storage});



app.get('/', (req, res) => {
    res.render('home', {});
});
app.get('/home', (req, res) => {
    res.render('home', {});
});

app.get('/marketplace', (req, res) => {
    res.render('marketPlace',{}); 
});

app.get('/tutorial', (req, res) => {
    res.render('tutorials',{}); 
});

app.get('/blog', (req, res) => {
    res.render('blog',{}); 
});

app.get('/dash', (req, res) => {
    res.render('dash',{}); 
});
//for blog 
app.get('/blog', async(req, res) => {
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

    const blogs = await Blog.find();
    res.render("blog", {f, userData, blogs});
})

app.get('/blogAdd',authMiddleware, (req, res) => {
    res.render("blogAdd", {}); 
});

app.get('/marketPlaceProductAdd', (req, res) => {
    res.render("marketPlaceProductAdd", {}); 
});

app.get('/tutorialsAdd',authMiddleware, (req, res) => {
    res.render("tutorialsAdd", {}); 
});
//for  signup


app.get('/signUp',alreadyLogedInMiddleware, (req, res) => {
    res.render("signUp", {});
})
app.post('/signUp', async(req, res) => {
    //  console.log(req.body);
    try {
    const {email, password,name } = req.body;
      
    //if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
       return res.status(401).render("messagePage", {
       message: 'User already exists,login please',
       redirectUrl: "/login"
       }); 
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image:imagePath
    });

    await newUser.save();

    res.redirect('/logIn');

  } catch (err) {
    console.error('Error saving user:', err.message);
    res.status(500).send('Server Error');
  }
})

// login 
app.get('/logIn',alreadyLogedInMiddleware, (req, res) => {
    res.render("logIn", {});
})
app.post('/logIn',  async (req, res) => {
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


 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
       return res.status(401).render("messagePage", {
       message: 'Invalid password',
       redirectUrl: "/login"
       });
    }


    const token = jwt.sign({ userId: user._id, name: user.name }, jwtSecret, { expiresIn: '1h' });

 
    res.cookie('token', token, {
      httpOnly: true,         //  for Preventing JS access
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
//blog

app.post('/blogAdd',authMiddleware,
  upload.single('img'), async(req, res) => {
     try {
      const {
        title,
        summary,
        description,
        attribute1,
        attribute2, 
        attribute3,
      } = req.body;
    
        
       const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
      const user = await User.findById(req.user.userId);
      console.log(imagePath);
      const blog = new Blog({
        title,
        summary,
        author_name:user.name,
        attribute1,
        attribute2, 
        attribute3,
        description,
        image: imagePath,
      });
      console.log(blog);
      const savedblog=await blog.save();
      user.postedBlogs.push(savedblog._id);
       await user.save();
      //  console.log(user);
      // if(savedblog)console.log("bolg added successfully");
      res.redirect('/blog');
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to add Blog');
    }
  
})
//tutorials

app.post('/tutorialsAdd',authMiddleware,
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
    
        
       const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
      const user = await User.findById(req.user.userId);
      console.log(imagePath);
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
        image: imagePath,
      });
      console.log(tutorial);
       
      const savedtutorial=await tutorial.save();
      user.postedTutorials.push(savedtutorial._id);
       await user.save()
      console.log(user);
      res.redirect('/tutorial');
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to add tutorial');
    }
  
})



app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
// run this by : npm start