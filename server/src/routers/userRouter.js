const express = require("express");
const User = require("../models/userModel");
const auth = require("../middleware/auth");

const router = new express.Router();

//// Login & Logout ////

// SignUp
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send();
  }
});

// LogIn
router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (err) {
    res.status(400).send("Unable to login!");
  }
});

// LogOut
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();

    res.send("Logout successfully");
  } catch (err) {
    res.status(500).send();
  }
});

// LogOut from all devices
router.post("/users/logoutAll/", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send("Logout from all devices successfully");
  } catch (err) {
    res.status(500).send();
  }
});

// Delete User
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (err) {
    res.send.status(500);
  }
});

// Edit details
// router.patch("/users/me", auth, async (req, res) => {
//   const updates = Object.keys(req.body);
//   // const allowedUpdates = ["email"];
//   const allowedUpdates = [{ details: { name: "first" } }];
//   const isValidUpdate = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );
//   console.log(req.body);
//   console.log(allowedUpdates);
//   console.log(updates);
//   console.log(isValidUpdate);

//   if (!isValidUpdate) {
//     return res.status(400).send({ error: "Invalid update!" });
//   }

//   try {
//     updates.forEach((update) => {
//       // console.log(update);
//       // console.log(user);
//       return (req.user[update] = req.body[update]);
//     });
//     // user.details.name.first = req.body.details.name.first;
//     // user.details.name.first = "asd";
//     // console.log(user);
//     await req.user.save();

//     res.send(req.user);
//   } catch (err) {
//     res.status(500).send();
//   }
// });
router.patch("/users/me", auth, async (req, res) => {
  const allowedUpdates = ["first"];
  // const allowedUpdates = ["{ details: { name: { first } } }"];
  // const allowedUpdates = ["details.name.first"];

  let isValidUpdate = false;
  for (let update in req.body) {
    console.log(update);
    if (allowedUpdates.includes(update)) {
      isValidUpdate = true;
    }
  }

  console.log(req.body);
  console.log(allowedUpdates);
  // console.log(updates);
  console.log(isValidUpdate);

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid update!" });
  }

  try {
    for (let update in req.body) {
      // console.log(update);
      req.user[update] = req.body[update];
    }
    // user.details.name.first = req.body.details.name.first;
    // user.details.name.first = "asd";
    // console.log(req.user);
    await req.user.save();

    res.send(req.user);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
