var Product = require("../models/product");

module.exports = {getProducts, createProduct, updateProduct, deleteProduct};

function getProducts(req, res, next)
{
  Product.find({}, function(error, products)
  {
    if(error)
    {
      res.json({ error: true, message: error });
    }
    res.json({ error: false, message: "Products retrieved", data : {products : products}});
  });
}

function createProduct(req, res, next)
{
  var product = new Product();
  product.name = req.swagger.params.product.value.name;
  product.price = req.swagger.params.product.value.price;
  product.category = req.swagger.params.product.value.category;
  product.description = req.swagger.params.product.value.description;
  product.save(function(error)
  {
    if(error)
    {
      res.json({ error: true, message: error });
    }
    res.json({ error: false, message: "Product created"});
  });
}

function updateProduct(req, res, next)
{
  var id = req.swagger.params.id.value;
  Product.findOne({"_id" : id}, function(error, product)
  {
    if(error)
    {
      res.json({ error: true, message: error });
    }
    if(typeof product !== 'undefined' && product != null)
    {
      product.name = (typeof req.swagger.params.product.value.name !== 'undefined') ? req.swagger.params.product.value.name : product.name;
      product.price = (typeof req.swagger.params.product.value.price !== 'undefined') ? req.swagger.params.product.value.price : product.price;
      product.category = (typeof req.swagger.params.product.value.category !== 'undefined') ? req.swagger.params.product.value.category : product.category;
      product.description = (typeof req.swagger.params.product.value.description !== 'undefined') ? req.swagger.params.product.value.description : product.description;
      product.save(function(error)
      {
        if(error)
        {
          res.json({ error: true, message: error });
        }
        res.json({ error: false, message: "Product updated"});
      });
    }
    else
    {
      res.json({ error: true, message: "The id received didn't match any product" });
    }
  });
}

function deleteProduct(req, res, next)
{
  var id = req.swagger.params.id.value;
  Product.findByIdAndRemove(id, function(error, product)
  {
    if(error)
    {
        res.json({ error: true, message: error });
    }
    if(typeof product !== 'undefined' && product != null)
    {
        res.json({ error: false, message: "Product removed" });
    }
    else
    {
        res.json({ error: true, message: "The id received didn't match any product" });
    }
  });
}
