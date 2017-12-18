const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user-model');

const router = express.Router();

// POST /api/signup
router.post('/signup', (req, res, next) => {
  if (req.body.password === undefined ||
      req.body.password.length < 10 ||
      req.body.password.match(/[^a-z0-9]/i) === null
    ) {
    res.status(400).json({ error: "Password invalid" });
    return;
  }
    User.findOne({ username: req.body.username })
    .then((userFromDb) => {
      if (userFromDb !== null) {
        res.status(400).json({ error: "Username is taken" });
        return;
      }
      const salt = bcrypt.genSaltSync(10);
      const scrambledPassword = bcrypt.hashSync(req.body.password, salt);

      const theUser = new User({
        fullName: req.body.fullName,
        username: req.body.username,
        encryptedPassword: scrambledPassword
      });

      return theUser.save();
    })
    .then((userFromDb) => {
      req.login(userFromDb, (err) => {
        // clear the "encryptedPassword" before sending the user userInfo// (otherwise it's a security risk)
        userFromDb.encryptedPassword = undefined;

          res.status(200).json({
            isLoggedIn: true,
            userInfo: userFromDb
          });
      });
    })
    .catch((err) => {
      console.log("POST/Signup ERROR!!");
      console.log(err);

      if (err.errors) {
        res.status(400).json(err.errors);
      }
      else {
        res.status(500).json({ error: "Sign up database error!"});
      }
    });
}); // POST /signup


router.post('/login', (req, res, next) => {
  User.findOne({ username: req.body.username })
  .then((userFromDb) => {
    if (userFromDb === null) {
      res.status(400).json({ error: "Username is invalid" });
      return;
    }
    const isPasswordGood = bcrypt.compareSync(req.body.password, userFromDb.encryptedPassword);

    console.log(userFromDb);

    if (isPasswordGood === false) {
      res.status(400).json({ error: "Password is invalid" });
      return;
    }
    req.login(userFromDb, (err) => {
      // clear the "encryptedPassword" before sending the user userInfo// (otherwise it's a security risk)
      userFromDb.encryptedPassword = undefined;

        res.status(200).json({
          isLoggedIn: true,
          userInfo: userFromDb
        });
    });
  })
  .catch((err) => {
    console.log("POST/login ERROR!");
    console.log(err);

    res.status(500).json({ error: "Log in database error" });
  });
}); // POST /login


router.delete('/logout', (req, res, next) => {
  req.logout();

  res.status(200).json({
    isLoggedIn: false,
    userInfo: null
  });
}); // DELETE /api/logout

router.get('/checklogin', (req, res, next) => {
  if (req.user) {
    // clear the "encryptedPassword" before sending the user userInfo// (otherwise it's a security risk)
    req.user.encryptedPassword = undefined;

    res.status(200).json({
      isLoggedIn: true,
      userInfo: req.user
    });
  }
  else {
    res.status(200).json({
      isLoggedIn: false,
      userInfo: null
    });
  }
});

router.put("/drinks/:id/add", (req, res, next) => {
  req.user.favorites.push( req.params.id );
  req.user.save()
  .then(() => {
    res.status(200).json(req.user);
  })
  .catch((err) => {
    console.log("PUT/drinks/:id/add ERROR!!");
    console.log(err);

    // 400 status code if validation error
    if (err.errors) {
      // respond with an VALIDATION ERROR in the json format
      res.status(400).json(err.errors);
    }
    else {
      // respond with an ERROR MESSAGE in the json format
      res.status(500).json({ error: "My Favorites update database error!" });
    }
  });
}); // PUT /drinks/:id/add

router.delete("/drinks/:id/delete", (req, res, next) => {
  req.user.favorites.pull(req.params.id);
  req.user.save()
  .then(() => {
    res.status(200).json(req.user);
  })
  .catch((err) => {
    console.log("DELETE/drinks/:id/delete ERROR!!");
    console.log(err);

    // 400 status code if validation error
    if (err.errors) {
      // respond with an VALIDATION ERROR in the json format
      res.status(400).json(err.errors);
    }
    else {
      // respond with an ERROR MESSAGE in the json format
      res.status(500).json({ error: "My Favorites remove drink database error!" });
    }
  });
});



module.exports = router;
