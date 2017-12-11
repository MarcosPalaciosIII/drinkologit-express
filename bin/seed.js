require("dotenv").config();

require("../config/mongoose-setup");

const Drink = require("../models/drink-model");

const drinkList = [
  {
    drinkName: "Long Island Iced Tea",
    drinkCreator: "Drinkologist",
    // drinkCreator: currentUser.username,
    description: "A Long Island Iced Tea is a type of alcoholic mixed drink typically made with vodka, tequila, light rum, triple sec, gin, and a splash of cola, which gives the drink the same amber hue as its namesake.",
    ingredients: [
      "1/2 oz. Vodka",
      "1/2 oz. light Rum",
      "1/2 oz. Tequila",
      "1/2 oz. Gin",
      "1/2 oz. Triple Sec",
      "1 oz. Sour Mix",
      "Splash Coka Cola"
    ],
    image: "http://kusaka.co/wordpress/wp-content/uploads/2015/10/Long-Island-Iced-Tea_mini.jpg",
    directions: "Fill a cocktail shaker with ice. Pour vodka, rum, gin, tequila, triple sec, and sour mix over ice; cover and shake. Pour cocktail into a Collins or hurricane glass; top with splash of cola for color. Garnish with a lemon slice."
  },
  {
  drinkName: "Tom Collins",
  drinkCreator: "Drinkologist",
  description: "The Tom Collins is a Collins cocktail made from gin, lemon juice, sugar, and carbonated water.",
  ingredients: [
    "3/4 oz. Fresh Lemon Juice",
    "3/4 oz. Simple Syrup(one part water/one part sugar)",
    "1 1/2 oz. Gin",
    "splash club soda"
  ],
  image: "https://cdn.liquor.com/wp-content/uploads/2010/12/16130814/tom-collins.jpg",
  directions: "Add the lemon juice, simple syrup and gin to a shaker and fill with ice. Shake well and strain into a highball or Collins glass filled with fresh ice. Top with club soda and garnish with a lemon wheel and a cherry."
  }
];


Drink.create(drinkList)
.then((results) => {
  console.log(`${results.length} drinks created`);
})
.catch((err) => {
  console.log("Save ERROR!!");
  console.log(err);
});
