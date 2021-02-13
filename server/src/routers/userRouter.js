const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { userAuth } = require("../middleware/auth");

const router = new express.Router();

//// Login & Logout ////

// SignUp
router.post("/users/signup", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();

        res.status(201).send({ user, token });
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: err.message,
        });
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
router.post("/users/logout", userAuth, async (req, res) => {
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
router.post("/users/logoutAll/", userAuth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send("Logout from all devices successfully");
    } catch (err) {
        res.status(500).send();
    }
});

// Delete User
router.delete("/users/me", userAuth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user.email);
    } catch (err) {
        res.send.status(500);
    }
});

// Edit details
router.patch("/users/me", userAuth, async (req, res) => {
    const _id = req.user._id;
    const update = req.body.update;

    try {
        const user = await User.findOneAndUpdate({ _id }, update, {
            runValidators: true,
            returnOriginal: false,
        });

        res.send({ user, token: req.token });
    } catch (err) {
        if (err.keyValue) {
            let key = Object.keys(err.keyValue)[0];
            key = key.includes(".") ? key.split(".")[1] : key;
            const value = err.keyValue[key];

            return res.status(400).send({
                status: 400,
                message: `The ${key} ${value} is already in use`,
            });
        }
        res.status(500).send(err);
    }
});

// Change Password
router.patch("/users/me/changePassword", userAuth, async (req, res) => {
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    const repeatedNewPassword = req.body.repeatedNewPassword;

    try {
        const isMatch = await bcrypt.compare(password, req.user.password);

        if (newPassword.length === 0 || repeatedNewPassword.length === 0) {
            return res
                .status(400)
                .send({ status: 400, message: "Please enter new password" });
        }

        if (!isMatch) {
            return res
                .status(400)
                .send({ status: 400, message: "Wrong Password" });
        }

        if (newPassword === password) {
            return res.status(400).send({
                status: 400,
                message:
                    "new password cannot be the same like current password",
            });
        }

        if (newPassword !== repeatedNewPassword) {
            return res.status(400).send({
                status: 400,
                message: "Two passwords must be identical",
            });
        }

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        const isLegalPassword = passwordRegex.test(newPassword);

        if (!isLegalPassword) {
            return res.status(400).send({
                status: 400,
                message:
                    "Password must contain capital character, regular character, a number and must have at least 8 characters",
            });
        }

        req.user.password = newPassword;
        await req.user.save();

        res.send();
    } catch (err) {
        res.status(500).send();
    }
});

// Add book to Wish List
router.post("/users/me/addToWishList", userAuth, async (req, res) => {
    const user = req.user;
    const bookId = req.body.bookId;

    try {
        if (user.books.wishList.includes(bookId)) {
            return res
                .status(400)
                .send({ status: 400, message: "Book is already in Wish List" });
        }

        user.books.wishList.unshift(bookId);
        await user.save();

        res.status(201).send(bookId);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Move Book from Cart to Wish List
router.post("/users/me/moveToCart", userAuth, async (req, res) => {
    const user = req.user;
    const bookId = req.body.bookId;

    try {
        user.books.wishList.splice(user.books.cart.indexOf(bookId), 1);
        user.books.cart.unshift(bookId);

        await user.save();

        res.send(user.books.wishList);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Move All Books from Cart to Wish List
router.post("/users/me/moveAllToCart", userAuth, async (req, res) => {
    const user = req.user;
    const books = req.body.books;

    try {
        for (let bookId of books) {
            user.books.cart.unshift(bookId);
        }
        user.books.wishList = [];

        await user.save();

        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
});

//Get Books from WishList
router.get("/users/me/wishList", userAuth, async (req, res) => {
    const user = req.user;

    try {
        await user.populate({ path: "books.wishList" }).execPopulate();

        if (user.books.wishList.length === 0) {
            return res.status(404).send({
                status: 404,
                message: "Cannot find any books",
            });
        }
        res.send(user.books.wishList);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Remove Book from Wish List
router.patch("/users/me/removeFromWishList", userAuth, async (req, res) => {
    const user = req.user;
    const bookId = req.body.bookId;

    try {
        user.books.wishList.splice(user.books.wishList.indexOf(bookId), 1);
        await user.save();

        res.send(user.books.wishList);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Empty WishList
router.patch("/users/me/wishList", userAuth, async (req, res) => {
    const user = req.user;

    try {
        user.books.wishList = [];
        await user.save();
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
});

// Add Book to Cart
router.post("/users/me/addToCart", userAuth, async (req, res) => {
    const user = req.user;
    const bookId = req.body.bookId;

    try {
        user.books.cart.unshift(bookId);
        await user.save();

        res.status(201).send(bookId);
    } catch (err) {
        res.status(500).send(err);
    }
});

//Get Books from Cart
router.get("/users/me/cart", userAuth, async (req, res) => {
    const user = req.user;

    try {
        await user.populate({ path: "books.cart" }).execPopulate();

        if (user.books.cart.length === 0) {
            return res.status(404).send({
                status: 404,
                message: "Cannot find any books",
            });
        }
        res.send(user.books.cart);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update Quantity in Cart
router.post("/users/me/cart", userAuth, async (req, res) => {
    const user = req.user;
    const cart = user.books.cart;
    const bookId = req.body.bookId;
    const quantity = req.body.quantity;

    try {
        let currentQuantity = 0;
        for (let book of cart) {
            if (book.toString() === bookId) currentQuantity++;
        }

        if (quantity < currentQuantity || quantity === 0) {
            let timesToRemove = currentQuantity - quantity;
            for (let i = cart.length - 1; i >= 0 && timesToRemove > 0; i--) {
                if (cart[i].toString() === bookId) {
                    cart.splice(i, 1);
                    timesToRemove--;
                }
            }
        } else if (quantity > currentQuantity) {
            let timesToAdd = quantity - currentQuantity;
            for (let i = 0; i < timesToAdd; i++) {
                cart.push(bookId);
            }
        }

        await user.populate({ path: "books.cart" }).execPopulate();
        await user.save();
        res.send(user.books.cart);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Add purchase
router.post("/users/me/purchased", userAuth, async (req, res) => {
    const user = req.user;
    const purchased = req.body;

    try {
        user.purchased.unshift(purchased);
        await user.save();
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
});

// Empty Cart
router.patch("/users/me/cart", userAuth, async (req, res) => {
    const user = req.user;

    try {
        user.books.cart = [];
        await user.save();
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get Orders
router.get("/users/me/purchased", userAuth, (req, res) => {
    const user = req.user;

    try {
        const orders = user.purchased;
        res.send(orders);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
