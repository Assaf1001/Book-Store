const express = require("express");
// const auth = require("../middleware/auth");
const Book = require("../models/bookModel");

const router = new express.Router();

// Create new book
router.post("/books/new", async (req, res) => {
    const book = new Book(req.body);

    try {
        await book.save();
        res.status(201).send();
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all books
router.get("/books/all", async (req, res) => {
    try {
        const books = await Book.find({});

        if (books.length === 0) {
            return res.status(404).send({
                status: 404,
                message: "Cannot find any books",
            });
        }

        res.send(books);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get discounted books
router.get("/books/discounted", async (req, res) => {
    try {
        const books = await Book.find({
            discountInPercentage: { $exists: true },
        });

        if (books.length === 0) {
            return res.status(404).send({
                status: 404,
                message: "Cannot find any books",
            });
        }

        res.send(books);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get Books by field & value
router.get("/books/find", async (req, res) => {
    const field = req.query.field;
    const value = req.query.value;

    const numericFields = ["price", "details.year", "details.pages"];

    const isNumericField = numericFields.includes(field);

    const searchObj = {
        [field]: isNumericField ? value : { $regex: new RegExp(value, "i") },
    };

    try {
        const books = await Book.find(searchObj);

        if (books.length === 0) {
            return res.status(404).send({
                status: 404,
                message: "Cannot find any books",
            });
        }

        res.send(books);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get Book by id
router.get("/books/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const book = await Book.findOne({ _id });

        if (book.length === 0) {
            return res.status(404).send({
                status: 404,
                message: "Book does not exist",
            });
        }

        res.send(book);
    } catch (err) {
        res.status(500).send(err);
    }
});

// const updates = Object.keys(req.body);
// const allowdUpdates = ["description", "completed"];
// const isValidUpdate = updates.every((update) =>
//     allowdUpdates.includes(update)
// );

module.exports = router;
