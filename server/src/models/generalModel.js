const mongoose = require("mongoose");
const validator = require("validator");

const generalSchema = new mongoose.Schema({
    orderNumber: { type: Number },
    admins: [
        {
            type: String,
            validate(value) {
                if (value.length === 0) {
                    throw new Error("Feild cannot be empty");
                }
                if (!validator.isEmail(value)) {
                    throw new Error("Must be an email ardress");
                }
            },
        },
    ],
});

const General = mongoose.model("General", generalSchema);

module.exports = General;
