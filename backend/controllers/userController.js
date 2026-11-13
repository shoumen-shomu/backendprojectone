let User = require("../models/userSchema");


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


module.exports = { userController, updateProfile};
