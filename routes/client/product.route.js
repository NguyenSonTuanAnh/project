const express = require('express');
const router = express.Router();

const controller = require("../../controllers/clients/product.controller");


router.get("/", controller.product);

router.get("/create", controller.createProduct)

router.get("/edit", controller.editProduct);

router.get("/:slug",controller.detailItem);

module.exports = router;