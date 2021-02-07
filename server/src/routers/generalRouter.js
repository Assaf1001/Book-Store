const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const { userAuth, adminAuth } = require("../middleware/auth");
const General = require("../models/generalModel");
const User = require("../models/userModel");

const router = new express.Router();

// Generate first order number and set value to 1
router.post("/general/orderNumber", adminAuth, async (req, res) => {
    const firstOrderNumber = new General({ orderNumber: 1 });

    try {
        await firstOrderNumber.save();
        res.status(201).send(firstOrderNumber);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get order number and increase by 1
router.get("/general/orderNumber", userAuth, async (req, res) => {
    try {
        const orderNumber = await General.findOne({
            orderNumber: { $exists: true },
        });
        res.send(orderNumber);
        orderNumber.orderNumber++;
        await orderNumber.save();
    } catch (err) {
        res.status(500).send(err);
    }
});

// Add Admin
router.post("/general/admins", adminAuth, async (req, res) => {
    const newAdmin = req.body.newAdmin;

    try {
        if (!validator.isEmail(newAdmin)) {
            return res.status(400).send("Please enter a valid email adress");
        }

        const adminUsers = await User.find({ isAdmin: true });
        const adminsArr = [];
        for (let admin of adminUsers) {
            adminsArr.push(admin.email);
        }

        const isNewAdminAlreadyAdmin = adminsArr.includes(newAdmin);
        if (isNewAdminAlreadyAdmin) {
            return res.status(400).send("User is already an admin!");
        }

        const user = await User.findOneAndUpdate(
            { email: newAdmin },
            { isAdmin: true }
        );

        if (!user) {
            return res
                .status(400)
                .send("This email does not belong to any user");
        }

        res.send(`${newAdmin} Added successfully`);
    } catch (err) {
        console.log(err);
        if (err.message.includes("validation failed")) {
            const errArr = err.message.split(":");
            return res.status(400).send(errArr[2]);
        }
        res.status(500).send();
    }
});

// Get Admins List
router.get("/general/admins/list", adminAuth, async (req, res) => {
    try {
        const adminUsers = await User.find({ isAdmin: true });
        const adminsArr = [];
        for (let admin of adminUsers) {
            adminsArr.push(admin.email);
        }

        res.send(adminsArr);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Remove Admin
router.patch("/general/admins", adminAuth, async (req, res) => {
    const adminToRemove = req.body.adminToRemove;

    try {
        const adminUsers = await User.find({ isAdmin: true });
        const adminsArr = [];
        for (let admin of adminUsers) {
            adminsArr.push(admin.email);
        }
        if (adminsArr.length <= 1) {
            return res
                .status(400)
                .send("Admins list must contain at least 1 admin");
        }

        const admin = await User.findOneAndUpdate(
            { email: adminToRemove },
            { isAdmin: false }
        );

        res.send(`${admin.email} Removed succsessfully`);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
