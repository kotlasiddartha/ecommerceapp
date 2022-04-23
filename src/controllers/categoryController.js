const Category = require("../models/category");

function listCategories(req, res) {
  Category.listCategories(function (err, result) {
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

module.exports = {listCategories};
