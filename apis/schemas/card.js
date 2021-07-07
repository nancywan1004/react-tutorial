const mongoose = require("mongoose");
const card = new mongoose.Schema({
    name: String,
    url: String,
    series: String
});

module.exports = mongoose.model("Card", card);