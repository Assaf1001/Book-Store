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

module.exports = router;
