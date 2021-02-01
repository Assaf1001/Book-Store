const express = require("express");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const General = require("../models/generalModel");

const router = new express.Router();

// Generate first order number and set value to 1
router.post("/general/orderNumber", async (req, res) => {
    const firstOrderNumber = new General({ orderNumber: 1 });

    try {
        await firstOrderNumber.save();
        res.status(201).send(firstOrderNumber);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get order number and increase by 1
router.get("/general/orderNumber", async (req, res) => {
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

// Check if user is an admin
router.get("/general/admins", auth, async (req, res) => {
    const user = req.user;

    try {
        const generalData = await General.find({});
        const adminsArr = generalData[0].admins;

        const isUserAdmin = adminsArr.includes(user.email);

        res.send(isUserAdmin);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Add Admin
router.post("/general/admins", auth, async (req, res) => {
    const user = req.user;
    const newAdmin = req.body.newAdmin;

    try {
        const generalData = await General.find({});
        const adminsArr = generalData[0].admins;

        const isUserAdmin = adminsArr.includes(user.email);

        if (!isUserAdmin) {
            return res.status(401).send("Unauthoraized");
        }

        const isNewAdminAlreadyAdmin = adminsArr.includes(newAdmin);

        if (isNewAdminAlreadyAdmin) {
            return res.status(400).send("User is already an admin!");
        }

        adminsArr.push(newAdmin);
        generalData[0].admins = adminsArr;
        await generalData[0].save();

        res.send(generalData[0]);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get Admins List
router.get("/general/admins/list", auth, async (req, res) => {
    try {
        const generalData = await General.find({});
        const adminsArr = generalData[0].admins;

        res.send(adminsArr);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Remove Admin
router.patch("/general/admins", auth, async (req, res) => {
    const admin = req.body.adminToRemove;

    try {
        const adminsArr = await General.findOne({
            admins: admin,
        });

        adminsArr.admins.splice(adminsArr.admins.indexOf(admin), 1);
        await adminsArr.save();

        res.send(adminsArr.admins);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
