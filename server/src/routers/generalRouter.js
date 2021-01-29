const express = require("express");
const mongoose = require("mongoose");
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

module.exports = router;
