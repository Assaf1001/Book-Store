const express = require("express");
const { adminAuth } = require("../middleware/auth");
const Book = require("../models/bookModel");

const router = new express.Router();

// Create new book
router.post("/books/new", adminAuth, async (req, res) => {
    const book = new Book(req.body.book);

    try {
        await book.save();
        res.status(201).send(book);
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
            discountInPercentage: { $ne: null },
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

        // if (books.length === 0) {
        //     return res.status(404).send({
        //         status: 404,
        //         message: "Cannot find any books",
        //     });
        // }
        if (books.length === 0) {
            return res.send([]);
        }

        res.send(books);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get Book by id
router.get("/books/id/:id", async (req, res) => {
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

// Edit Book
router.patch("/books/id", adminAuth, async (req, res) => {
    const _id = req.body.bookId;
    const book = req.body.book;

    try {
        const bookToUpdate = await Book.findOneAndUpdate({ _id }, book, {
            runValidators: true,
            returnOriginal: false,
        });

        if (bookToUpdate.length === 0) {
            return res.status(404).send({
                status: 404,
                message: "Book does not exist",
            });
        }

        res.send(bookToUpdate);
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

// Remove Book
router.delete("/books/id", adminAuth, async (req, res) => {
    const _id = req.body.bookId;

    try {
        const bookToRemove = await Book.findOneAndDelete({ _id });

        if (bookToRemove.length === 0) {
            return res.status(404).send({
                status: 404,
                message: "Book does not exist",
            });
        }

        res.send(bookToRemove);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
