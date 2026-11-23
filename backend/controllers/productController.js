let Product = require('../models/productSchema')


let createProduct = async (req, res) => {
  let {
    title,
    description,
    shortDescription,
    brand,
    price,
    discountPrice,
    category,
    subCategoty,
  } = req.body;

//   if (
//     !title ||
//     !description ||
//     !shortDescription ||
//     !brand ||
//     !price ||
//     !discountPrice ||
//     !category ||
//     !subCategoty
//   ) {
//     req.status(400).json({
//       success: false,
//       message: "Please fill all the fields",
//     });
//   }



let slug = title.toLowerCase().split(" ").join("-");

let existingSlug = await Product.findOne({slug : slug})

if(existingSlug){
    return res.status(400).json({
        success :false,
        message : "Slug Exists..."
    })
}



};


module.exports = {createProduct}
