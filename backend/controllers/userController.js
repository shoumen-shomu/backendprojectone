let User = require("../models/userSchema");
let Cat = require("../models/categorySchema");

let userController = (req, res) => {
  res.send("Hello User");
};

let updateProfile = async (req, res) => {
  let { id } = req.params;

  let data = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true });

  res.status(200).json({
    success: true,
    message: `Your Profile is Updated`,
    data: data,
  });
};

let createCategoty = async (req, res) => {
  let { name } = req.body;

  let existingnName = await Cat.findOne({ name: name.toLowerCase() });

  if (existingnName) {
    res.status(400).json({
      success: false,
      message: "This Category is already exists",
    });
  }

let cat = new Cat({
    name : name.toLowerCase()
})

await cat.save()

res.status(201).json({
      success: true,
      message: "Category Created",
    });
  }

  let getAllCategory = async (req,res)=>{

    let category = await Cat.find({})

   res.status(200).json({
      success: true,
      message: `${category.length} Categoty`,
      data : category
    });
  }

module.exports = { userController, updateProfile, createCategoty,getAllCategory};
