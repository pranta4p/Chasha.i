const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
   name: {
    type: String,
  },
  image: {
    type: String,
  },
   postedProducts: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],

  cart: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  postedTutorials:[
    {
    type: Schema.Types.ObjectId,
    ref: 'Tutorial'
  }
  ],
   postedBlogs:[
    {
    type: Schema.Types.ObjectId,
    ref: 'Blog'
  }
  ]

});

module.exports=mongoose.model('User',UserSchema);