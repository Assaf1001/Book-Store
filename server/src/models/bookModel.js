const mongoose = require("mongoose");

const bookSchmea = new mongoose.Schema(
    {
        image: { type: String, required: true },
        title: { type: String, required: true, unique: true },
        author: { type: String, required: true },
        price: { type: Number, min: 1, required: true },
        discountInPercentage: { type: Number, min: 1 },
        category: { type: String },
        details: {
            year: { type: Number },
            isbn: { type: String, unique: true },
            pages: { type: Number, min: 1 },
            publisher: { type: String },
            bestSellersRank: { type: String },
            language: { type: String },
            description: { type: String },
        },
    },
    {
        timestamps: true,
    }
);

const Book = mongoose.model("Book", bookSchmea);

module.exports = Book;
