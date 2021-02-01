const mongoose = require("mongoose");

const generalSchema = new mongoose.Schema({
    orderNumber: { type: Number },
    admins: [{ type: String }],
});

const General = mongoose.model("General", generalSchema);

module.exports = General;
