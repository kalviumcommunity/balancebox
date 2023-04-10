const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  protien: {
    type: Number,
    required: false,
  },
  fat: {
    type: Number,
    required: false,
  },
  carbs: {
    type: Number,
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  }
});


const blogSchema = new mongoose.Schema({

  blogTitle: {
    type: String,
    required: true
  },
  blog: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  }
})


const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  lastLogin: {
    type: Date,
    required: true,
    default: Date.now
  },
  foodList: {
    type: Array,
    default: []
  }
})


const Food = mongoose.model("FOOD", foodSchema);
const Blog = mongoose.model("BLOG", blogSchema);
const User = mongoose.model("User", userSchema)
module.exports = {
  Food,
  Blog,
  User
};