const express=require('express');
const router=express.Router();
require("dotenv").config();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const auth=require('../middleware/auth');
const upload=require('../middleware/upload');
const cloudinary=require('../config/cloudinary');

const User = require('../models/User');
const Blog=require('../models/Blog');


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

router.get('/blogAdd',auth, (req, res) => {
    res.render("blogAdd", {});
})
router.post('/blogAdd',auth,
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
    
        
      const result = await cloudinary.uploader.upload(req.file.path);
      const user = await User.findById(req.user.userId);

      const blog = new Blog({
        title,
        summary,
        author_name:user.name,
        attribute1,
        attribute2, 
        attribute3,
        description,
        image: result.secure_url
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








module.exports=router;