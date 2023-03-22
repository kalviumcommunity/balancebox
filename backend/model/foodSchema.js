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

const Food = mongoose.model("FOOD", foodSchema);

module.exports = Food;