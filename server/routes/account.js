const express=require('express');
const router=express.Router();
require("dotenv").config();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const auth=require('../middleware/auth');

const User = require('../models/User');
const Product=require('../models/Product');

router.get('/dash',auth, async(req, res) => {
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

router.get('/myProduct', auth, async (req, res) => {
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

router.get('/myCart',auth, async (req, res) => {
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


router.get('/addToCart/:id',auth, async(req, res) => {
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

router.delete('/removeFromCart/:id', auth, async (req, res) => {
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





module.exports=router;