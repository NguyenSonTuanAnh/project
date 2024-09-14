const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const productSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    brand: String,
    thumbnail: String,
    status: String,
    stock: Number,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt: Date,
    slug: {
        type: String,
        slug: "title",
        unique: true
    }
}, {
    timestamps: true
});

const product = mongoose.model("Product", productSchema, "products"); //tham so thu 3 la collection trong database

module.exports = product;