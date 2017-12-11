const express = require("express");

const Drink = require("../models/drink-model");

const router = express.Router();



router.get("/drinks", (req, res, next) => {
  Drink
  .find()
  .limit(25)
  .exec()
  .then((drinkResults) => {
    // respond with the QUERY RESULTS in the JSON format
    res.status(200).json(drinkResults);
  })
  .catch((err) => {
    console.log("GET/Drink ERROR!!");
    console.log(err);

    // respond with an ERROR MESSAGE in the JSON format
    res.status(500).json({ error: "Drink list database error!" });
  });
}); // GET /drinks



router.post("/drinks", (req, res, next) => {
  const theDrink = new Drink({
    drinkName: req.body.drinkName,
    drinkCreator: currentUser.username,
    description: req.body.description,
    ingredients: req.body.ingredients,
    image: req.body.image,
    directions: req.body.directions
  });

  theDrink.save()
  .then(() => {
    res.status(200).json(theDrink);
  })
  .catch((err) => {
    console.log("POST/Drink ERROR!!");
    console.log(err);

    // 400 status code if validation error
    if(err.errors) {
      res.status(400).json(err.errors);
    }
    else {
      res.status(500).json({error: "Drink save database error!"});
    }
  });
}); // POST /drinks



router.get("/drinks/:id", (req, res, next) => {
  if (req.user === undefined) {
    res.status(400).json({ error: "Not logged in" });
    return;
  }
  Drink.findById(req.params.id)
  .then((drinkFromDb) => {
    if (drinkFromDb === null) {
      // respond with an ERROR MESSAGE in the json format
      res.status(404).json({ error: "Drink not found" });
    }
    else{
      // resond with the QUERY RESULT in the json format
      res.status(200).json(drinkFromDb);
    }
  })
  .catch((err) => {
    console.log("GET/Drinks/:id ERROR!!");
    console.log(err);

    // respond with an ERROR MESSAGE in the json format
    res.status(500).json({ error: "Drink details database error!"});
  });
}); // GET /drinks/:id



router.delete("/drinks/:id", (req, res, next) => {
  if (req.user === undefined) {
    res.status(400).json({ error: "Not logged in" });
    return;
  }
  Drink.findByIdAndRemove(req.params.id)
  .then((drinkFromDb) => {
    if (drinkFromDb === null) {
      // respond with an ERROR MESSAGE in the json format
      res.status(404).json({ error: "Drink not found" });
    }
    else {
      // resond with the QUERY RESULT in the json format
      res.status(200).json(drinkFromDb);
    }
  })
  .catch((err) => {
    console.log("GET/Drinks/:id ERROR!!");
    console.log(err);

    // respond with an ERROR MESSAGE in the json format
    res.status(500).json({ error: "Drink delete database error!" });
  });
}); // DELETE /drinks/:id



router.put("/drinks/:id", (req, res, next) => {
  Drink.findById(req.params.id)
  .then((drinkFromDb) => {
    if (drinkFromDb === null) {
      // respond with an ERROR MESSAGE in the json format
      res.status(404).json({ error: "Drink not found" });
      return;
    }
    drinkFromDb.set({
      drinkName: req.body.drinkName,
      drinkCreator: currentUser.username,
      description: req.body.description,
      ingredients: req.body.ingredients,
      image: req.body.image,
      directions: req.body.directions
    });
    return drinkFromDb.save();
  })
  .then((drinkFromDb) => {
    // resond with the QUERY RESULT in the json format
    res.status(200).json(drinkFromDb);
  })
  .catch((err) => {
    console.log("PUT/Drinks/:id ERROR!!");
    console.log(err);

    // 400 status code if validation error
    if (err.errors) {
      // respond with an VALIDATION ERROR in the json format
      res.status(400).json(err.errors);
    }
    else {
      // respond with an ERROR MESSAGE in the json format
      res.status(500).json({ error: "Drink update database error!" });
    }
  });
}); // PUT /drinks/:id


module.exports = router;
