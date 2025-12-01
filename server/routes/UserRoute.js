const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product=require('../models/Product');
const Tutorial=require('../models/Tutorial')
const Blog=require('../models/Blog');
const jwt = require('jsonwebtoken');
const path =require('path')
const mongoose = require('mongoose');
const fs = require('fs');
const jwtSecret = process.env.JWT_SECRET;
const cookieParser = require('cookie-parser');
router.use(cookieParser());
require('dotenv').config();

// for checking logIn or not
const authMiddleware=require('../middleware/auth');
const upload=require('../middleware/upload');


router.use('/',require('./static'));



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
router.use('/',require('./auth'))

module.exports=router;
