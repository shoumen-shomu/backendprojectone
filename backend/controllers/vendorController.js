let Cat = require("../models/categorySchema");
let SubCat = require("../models/subCategorySchema");

let createCategoty = async (req, res) => {
  let { name, owner } = req.body;

  let existingnName = await Cat.findOne({ name: name.toLowerCase() });

  if (existingnName) {
    res.status(400).json({
      success: false,
      message: "This Category is already exists",
    });
  }

  let cat = new Cat({
    name: name.toLowerCase(),
    owner: owner,
  });

  await cat.save();

  res.status(201).json({
    success: true,
    message: "Category Created",
  });
};

let getAllCategory = async (req, res) => {
  let category = await Cat.find({}).populate({
    path: "owner",
    select: "-password",
  });

  res.status(200).json({
    success: true,
    message: `${category.length} Categoty`,
    data: category,
  });
};

let createSubCategory = async (req, res) => {
  let { name, parentCategory } = req.body;

  let existingnName = await SubCat.findOne({ name: name.toLowerCase() });

  if (existingnName) {
    res.status(400).json({
      success: false,
      message: "This Category is already exists",
    });
  }

  let subcat = new SubCat({
    name: name.toLowerCase(),
    parentCategory: parentCategory,
  });

  // let catupdate = await Cat.findByIdAndUpdate({_id:parentCategory},
  //   {$push :{subCategory:subcat._id}})

  await subcat.save();

  res.status(201).json({
    success: true,
    message: "Sub Category Created",
  });
};

let getAllSubCategory = async (req, res) => {
  let subcategory = await SubCat.find({}).populate("parentCategory");

  res.status(200).json({
    success: true,
    message: `${subcategory.length} Sub Categoty`,
    data: subcategory,
  });
};

let getAllCategoryWiseSubCategory = async (req, res) => {
  let { id } = req.params;
  let subcategory = await SubCat.find({ parentCategory: id });

  res.status(200).json({
    success: true,
    message: `${subcategory.length} Sub Categoty`,
    data: subcategory,
  });
};

let getAllOwnerWiseCategory = async (req, res) => {
  let { id } = req.params;

  let data = await Cat.find({ owner: id }).lean();

  let myPromise = new Promise((resolve, reject) => {
    let cat = [];
    data.map(async (item) => {
      let boom = await SubCat.find({ parentCategory: item._id });
      cat.push({
        ...item,
        subcategory: boom,
      });
      resolve(cat);
    });
  });

  myPromise.then((value) => {
    res.status(200).json({
      success: true,
      message: `${data.length} Category`,
      data: value,
    });
  });
};

module.exports = {
  createCategoty,
  getAllCategory,
  createSubCategory,
  getAllSubCategory,
  getAllCategoryWiseSubCategory,
  getAllOwnerWiseCategory,
};
