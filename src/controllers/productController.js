const Product = require("../models/product");

function listProducts(req, res) {
  console.log("inside controller");
    let data = req.body;
    Product.listProducts(data, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send({
        msg: "Error in fetching the categories",
        success: false
      });
    }
    return res.status(200).send({
      msg: "successfully fetching the categories",
      success: true,
      Categories: result
    });
  });
}

 function addProduct(req, res){
     let data = req.body;
     console.log(data);
     if(data.name && data.category){
        Product.addProducts(data, function(err, result){
            if(err){
                return res.status(500).send({
                    message: "Something went wrong, cant add products",
                    success: false 
                });
            }
            return res.status(200).send({
                message: "successfully added product",
                success: true
            });
        });
    }
    else {
         return res.status(401).send({
            message: "incorrect parameters sent",
            success: false
         });
     }
 }

module.exports = {listProducts, addProduct};
