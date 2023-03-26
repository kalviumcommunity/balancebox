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
  quantity:{
    type:Number,
    required:false,
  }
});


const blogSchema = new mongoose.Schema({
  
  blogTitle:{
    type: String,
    required:true
  },
  blog:{
    type: String,
    required:true
  },
  image: {
    type: String,
    required:false  
  }
})

const Food = mongoose.model("FOOD", foodSchema);
const Blog = mongoose.model("BLOG",blogSchema);

module.exports = {Food, Blog};