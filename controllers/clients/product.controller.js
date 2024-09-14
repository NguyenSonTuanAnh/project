const Products = require("../../models/products.model");

module.exports.product = async (req, res) => {
    const products = await Products.find({
        deleted: false,
        status: "active"
    }).sort({
        position: "desc"
    });

    console.log(products);
    res.render("clients/Pages/Products/index.pug", {
        pageTitle: "Trang san pham",
        product: products
    });
};
module.exports.createProduct = (req, res) => {
    res.render("clients/Pages/Products/index.pug", {
        pageTitle: "Trang tao san pham"
    });
};
module.exports.editProduct = (req, res) => {
    res.render("clients/Pages/Products/index.pug", {
        pageTitle: "Trang chinh sua san pham"
    });
};

module.exports.detailItem = async (req, res) => {
    const slug = req.params.slug;
    try {
        const find = {
            deleted: false,
            slug: slug,
            status: "active"
        };
        const products = await Products.findOne(find);
        res.render("clients/Pages/Products/detail", {
            pageTitle: "Chi tiết sản phẩm",
            products: products
        });
    } catch (error) {
        res.redirect("/products")
    }
};