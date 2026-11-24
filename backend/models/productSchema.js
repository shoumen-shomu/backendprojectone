const mongoose = require("mongoose");
const { Schema } = mongoose;

let productSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
  },

  shortDescription: {
    type: String,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },

  //single images
  //   images :{
  //     type : String
  //   }

  //multiple Images

  images: [
    {
      url: {
        type: String,
      },
      isMain: {
        type: Boolean,
        default: false,
      },
    },
  ],

  discountPrice: {
    type: Number,
  },

  stoke: {
    type: Number,
  },

  status: {
    type: String,
    enum: ["approved", "rejected", "pending"],
    default: "pending",
  },
  // brand :{
  //   type : String
  // },
  category :{
    type : Schema.Types.ObjectId,
    ref : 'Category'
  },
  subCategory :{
    type : Schema.Types.ObjectId,
    ref : 'SubCategory'
  },
},{timestamps: true});

module.exports = mongoose.model("Product", productSchema);
