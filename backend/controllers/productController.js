let Product = require("../models/productSchema");

let createProduct = async (req, res) => {
  let {
    title,
    description,
    shortDescription,
    price,
    discountPrice,
    category,
    subCategory,
    isMain
   
  } = req.body;

  
  


  let images = []
  req.files.map((item,index)=>{
   images.push({
    url :item.path,
    isMain : index == isMain ? true : false
   })
  })
  
console.log(images);

    // if (
    //   !title ||
    //   !description ||
    //   !shortDescription ||
    //   !brand ||
    //   !price ||
    //   !discountPrice ||
    //   !category ||
    //   !subCategory
    // ) {
    //   req.status(400).json({
    //     success: false,
    //     message: "Please fill all the fields",
    //   });
    // }

  let slug = title.toLowerCase().split(" ").join("-");

  let existingSlug = await Product.findOne({ slug: slug });

  if (existingSlug) {
    return res.status(400).json({
      success: false,
      message: "Slug Exists...",
    });
  }

  let sku = `eco-${Date.now()}`;

  let existingSku = await Product.findOne({ sku: sku });

  if (existingSku) {
    return res.status(400).json({
      success: false,
      message: "Sku Exists...",
    });
  }

  let product = new Product({
    title: title,
    description: description,
    shortDescription: shortDescription,
    price: price,
    discountPrice: discountPrice,
    category: category,
    subCategory: subCategory,
    slug : slug,
    sku : sku,
    images : images
  });

 await product.save()

  return res.status(201).json({
    success: true,
      message: "Product Created",
      product : product
  })


  
};

module.exports = { createProduct };
