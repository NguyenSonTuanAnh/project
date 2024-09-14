const Products = require("../../models/products.model");
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/form-search");
const paginationHelper = require("../../helpers/Pagination");
const systemConfig = require("../../config/system");

//[GET]: /admin/products
module.exports.index = async (req, res) => {

    const filterStatus = filterStatusHelpers.filterStatus(req.query);

    //Lấy truy vấn của người dùng
    let find = {
        deleted: false
    };

    if (req.query.status) {
        find.status = req.query.status;
    }
    const objectSearch = searchHelper(req.query);
    //Tim kiem theo keyword
    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    const countProducts = await Products.countDocuments(find);
    const Pagination = paginationHelper({
            currentPage: 1,
            limitItem: 4,
        },
        req.query,
        countProducts
    );
    const products = await Products.find(find).limit(Pagination.limitItem).skip(Pagination.skip).sort({
        position: "asc"
    });

    res.render("admin/Pages/products/index.pug", {
        pageTitle: "Trang sản phẩm",
        product: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: Pagination
    });
};

//[PATCH]: admid/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Products.updateOne({
        _id: id
    }, {
        status: status
    });

    req.flash('info', 'Cập nhật trạng thái thành công!');

    res.redirect(`back`);
};

//[PATCH]: admid/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    switch (type) {
        case "active":
            await Products.updateMany({
                _id: {
                    $in: ids
                }
            }, {
                status: "active"
            });
            req.flash("info", `Cập nhật trạng thái của ${parseInt(ids.length)} sản phẩm thành công!`);
            break;

        case "inactive":
            await Products.updateMany({
                _id: {
                    $in: ids
                }
            }, {
                status: "inactive"
            });
            req.flash("info", `Cập nhật trạng thái của ${parseInt(ids.length)} sản phẩm thành công!`);
            break;
        case "deleteAll":
            await Products.updateMany({
                _id: {
                    $in: ids
                }
            }, {
                deleted: true,
                deletedAt: new Date()
            });
            req.flash("info", `Đã xóa ${parseInt(ids.length)} sản phẩm thành công!`);
            break;
        case "changePosition":
            for (const item of ids) {
                let [id, position] = item.split('-');
                position = parseInt(position);
                await Products.updateOne({
                    _id: id
                }, {
                    position: position
                });
            }
            req.flash("info", `Đã cập nhật vị trí của ${parseInt(ids.length)} sản phẩm thành công!`);
            break;
    };

    res.redirect('back');
};

//[DELETE]: admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Products.updateOne({
        _id: id
    }, {
        deleted: true,
        deleteAt: new Date()
    });
    req.flash("info", `Đã xóa sản phẩm thành công!`);
    res.redirect('back');
};

//[GET]: admin/products/create
module.exports.createItem = async (req, res) => {
    res.render("admin/Pages/products/create.pug", {
        pageTitle: "Tạo sản phẩm mới"
    })
};

//[POST]: admin/products/create
module.exports.createItemPost = async (req, res) => {
    req.body.price = parseFloat(req.body.price);
    req.body.stock = parseInt(req.body.stock);

    if (req.body.position == "") {
        const countProducts = await Products.countDocuments();
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
        //console.log(req.file);  file hinh anh duoc up len
        //console.log(req.file.filename);
    }
    const product = new Products(req.body);
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/products`);
}

//[GET]: admin/products/edit/:id
module.exports.editItem = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        };

        const products = await Products.findOne(find);

        res.render("admin/Pages/products/edit.pug", {
            pageTitle: "Trang chỉnh sửa sản phẩm",
            products: products
        });

    } catch {
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
};

//[PATCH]: /admin/products/edit/:id
module.exports.editItemPATCH = async (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    req.body.price = parseFloat(req.body.price);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
        //console.log(req.file);  file hinh anh duoc up len
        //console.log(req.file.filename);
    }
    try {
        await Products.updateOne({_id: id}, req.body);
        req.flash("info","Cập nhật thành công");
    } catch (error) {
        req.flash("error","Cập nhật thất bại!");
    };
    res.redirect("back");
};

//[GET]: /admin/products/detail/:id
module.exports.detailItem = async (req,res)=>{
    try {
        const find = {
            deleted: false,
            _id : req.params.id
        };
        const products = await Products.findOne(find); 
        res.render("admin/Pages/products/detail",{
            pageTitle: "Trang chi tiết sản phẩm",
            products: products 
        });     
    } catch (error) {
        req.flash("error","Lỗi");
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
};