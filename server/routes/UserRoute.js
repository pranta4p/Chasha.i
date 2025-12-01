const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product=require('../models/Product');
const Tutorial=require('../models/Tutorial')
const Blog=require('../models/Blog');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer=require('multer')
const path =require('path')
const mongoose = require('mongoose');
const fs = require('fs');
const jwtSecret = process.env.JWT_SECRET;
const cookieParser = require('cookie-parser');
router.use(cookieParser());
require('dotenv').config();


// for checking logIn or not
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
// if loged in it says already logged in 
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


//for store image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads')); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});
const upload=multer({storage:storage});




//get request
//------######------



router.get('/', async(req, res) => {
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

    const products=await Product.find();
    const countUsers = await User.countDocuments();
    res.render("home", {f, userData, products, countUsers});
})

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

router.get('/marketPlaceProductAdd',authMiddleware, (req, res) => {
    res.render("marketPlaceProductAdd", {});
})

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
    res.render("tutorial", {f, userData, tutorials});
})

router.get('/tutorialsAdd',authMiddleware, async(req, res) => {
  try {
    res.render("tutorialsAdd", {});
  } catch (error) {
    res.status(500).send("Server Error");
  }
})

router.get('/weather', async(req, res) => {
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

    res.render("weather", {f, userData});
})

router.get('/blog', async(req, res) => {
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

router.get('/agridoc', async(req, res) => {
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

    res.render("agridoc", {f, userData});
})

router.get('/logIn', (req, res) => {
    res.render("logIn", {});
})

router.get('/signUp', (req, res) => {
    res.render("signUp", {});
})

router.get('/aboutUs', (req, res) => {
    res.render("aboutUs", {});
})

router.get('/privacyPolicy', (req, res) => {
    res.render("privacyPolicy", {});
})

router.get('/logOut', (req, res) => {
  res.clearCookie('token');
  res.redirect('/home');
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
    console.log(userData);
    res.render("marketPlace", {f, userData, products});
});

router.get('/myCart',authMiddleware, async (req, res) => {
    const token = req.cookies.token;
    let f = 0;
    let userData = null;
    try {
            const decoded = jwt.verify(token, jwtSecret);
            const userId = decoded.userId;
            userData=await User.findById(userId);
            const cart = userData.cart; 
            f = 1;
            if (!userData || !cart) return res.render({f, products: [],userData });

              // Filter valid MongoDB ObjectId strings
            const validCartIds = cart.filter(
                  id => mongoose.Types.ObjectId.isValid(id)
                );
            const products = await Product.find({ _id: { $in: validCartIds } });//products which is added in card
            res.render("myCart", {f,products,userData});

        } catch (err) {
            console.error("Invalid token", err.message);
        }
});

router.get('/myProduct', authMiddleware, async (req, res) => {
  let f = 0;

  try {
    const userData = await User.findById(req.user.userId); 
    if (!userData || !userData.postedProducts) {
      return res.render("myProduct", { f, products: [], userData });
    }

    const posted = userData.postedProducts;

    const validPostedIds = posted.filter(
      id => mongoose.Types.ObjectId.isValid(id)
    );

    const products = await Product.find({ _id: { $in: validPostedIds } });

    f = 1;
    return res.render("myProduct", { f, userData, products });

  } catch (err) {
    console.error("Error loading myProduct:", err.message);
    return res.status(500).send("Internal Server Error");
  }
});


router.get('/tutorialsAdd',authMiddleware, (req, res) => {
    res.render("tutorialsAdd", {});
})

router.get('/contactUs',authMiddleware, (req, res) => {
    res.render("contactUs", {});
})


router.get('/dash', async(req, res) => {
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

    res.render("dash", {f, userData});
})



//all get request /id:
//------#####----------



router.get('/blogDetail/:id', async(req, res) => {
    const token = req.cookies.token;
    let f=0;
    if(token){f=1;}
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if(token){
       const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.userId;
     
    const userData = await User.findById(userId); 
    
    
     return res.render("blogDetail", {blog,userData, f});
    }
    else{
      const userData=null;
      return res.render("blogDetail", {blog,userData, f});
    }
    
    // console.log(blog.title);
    // console.log(blog);

   
})

router.get('/addToCart/:id',authMiddleware, async(req, res) => {
     try {
        const productId = req.params.id;
        const user = await User.findById(req.user.userId);
        // console.log(productId);
        
        const exist=user.postedProducts.some(id=>id.equals(productId))
        if(exist){
           return res.status(401).render("messagePage", {
          message: "Your self Product can not be added",
          redirectUrl: "/marketPlace"
           });
        }
        user.cart.push(productId);
        await user.save();
        return res.status(401).render("messagePage", {
          message: "Added to your card",
          redirectUrl: "/marketPlace"
        });
     } catch (error) {
      res.status(400).send(error);
     }
     
})


//delete request
//------#####----

router.delete('/removeFromCart/:id', authMiddleware, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.userId;
  try {
    await User.findByIdAndUpdate(userId, {
      $pull: { cart: productId } 
    });

    res.json({ message: 'Removed from cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error removing item from cart' });
  }
});


router.delete('/deleteProduct/:id', authMiddleware, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.userId;

  try {
    //  Remove product ID from user's postedProducts array
    await User.findByIdAndUpdate(userId, {
      $pull: { postedProducts: productId }
    });

    //  Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    //  Delete image file if exists
    if (product.image) {
      const imagePath = path.join(__dirname, '..', product.image); 
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.warn(`Failed to delete image: ${imagePath}`);
        } else {
          console.log(`Image deleted: ${imagePath}`);
        }
      });
    }

    //  Delete product from DB
    await Product.findByIdAndDelete(productId);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
});




//all post request for saveing to db:
//------#####----------



router.post(
  '/marketPlaceProductAdd',
  authMiddleware,
  upload.single('img'), 
  async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      const {
        name,
        type,
        location,
        price,
        unit,
        sellerName, 
        phone,
        description,
      } = req.body;
    
        
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

      // console.log(imagePath);
      const product = new Product({
        name,
        type,
        location,
        price,
        unit,
        seller: sellerName,
        phone,
        description,
        image: imagePath,
      });
      console.log(product);
      const savedproduct=await product.save();
      user.postedProducts.push(savedproduct._id);
       await user.save();
      res.redirect('/marketPlace');
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to add product');
    }
  }
);

router.post('/tutorialsAdd',authMiddleware,
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

router.get('/blogAdd',authMiddleware, (req, res) => {
    res.render("blogAdd", {});
})
router.post('/blogAdd',authMiddleware,
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








//Log in signup portion
//------#####----------



router.get('/logIn',alreadyLogedInMiddleware, (req, res) => {
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


router.get('/signUp', alreadyLogedInMiddleware,(req, res) => {
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



module.exports=router;
