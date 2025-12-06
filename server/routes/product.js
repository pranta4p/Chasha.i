const express=require('express');
const router=express.Router();
require("dotenv").config();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const cloudinary=require('../config/cloudinary');

const auth=require('../middleware/auth');
const upload=require('../middleware/upload');

const User = require('../models/User');
const Product=require('../models/Product');

router.get('/marketPlaceProductAdd',auth, (req, res) => {
    res.render("marketPlaceProductAdd", {});
})

 router.post(
  '/marketPlaceProductAdd',
  auth,upload.single('img'), 
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
    
       const result = await cloudinary.uploader.upload(req.file.path);
      const product = new Product({
        name,
        type,
        location,
        price,
        unit,
        seller: sellerName,
        phone,
        description,
        image: result.secure_url,
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


router.delete('/deleteProduct/:id', auth, async (req, res) => {
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



module.exports=router;