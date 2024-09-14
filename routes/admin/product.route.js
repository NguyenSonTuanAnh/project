const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");
const multer = require("multer");
const multerStorage = require("../../helpers/multerStorage");
const upload = multer({
    storage: multerStorage()
});
const validate = require("../../validates/admin/product.validate");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteItem);

router.get('/create', controller.createItem);

router.post('/create', upload.single('thumbnail'), validate.createPost, controller.createItemPost);

router.get("/edit/:id", controller.editItem);

router.patch("/edit/:id", upload.single('thumbnail'), validate.createPost, controller.editItemPATCH);

router.get("/detail/:id",controller.detailItem);

module.exports = router;