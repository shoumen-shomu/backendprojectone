const mongoose = require("mongoose");
const { Schema } = mongoose;

let CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  status: {
    type: String,
    enum: ["active", "deactive", "reject"],
    default: "deactive",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  subCategory: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  ],
});

module.exports = mongoose.model("Category", CategorySchema);
