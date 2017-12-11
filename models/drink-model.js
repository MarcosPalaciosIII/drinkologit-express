const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const drinkSchema = new Schema(
  {
    drinkName: {
      type: String,
      required: [true, "Please enter a drink name"]
    },
    drinkCreator: { type: String },
    description: { type: String },
    ingredients: {
      type: String,
      required: [true, "Please enter ingredients for your drink"]
    },
    image: {
      type: String,
      default: "images/defualt-drink.jpg"
    },
    directions: { type: String },
  },
  {
    timestamp: true
  }
);

const Drink = mongoose.model("Drink", drinkSchema);

module.exports = Drink;
