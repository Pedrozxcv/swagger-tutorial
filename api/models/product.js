var mongoose = require('mongoose');

var Product = new mongoose.Schema({
  name: String,
  price: String,
  category: [String],
  description: { type: String , default: null },
});

module.exports = mongoose.model("Product", Product);
