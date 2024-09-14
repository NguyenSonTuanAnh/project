const dashboardRoute = require("../admin/dashboard.route");
const path = require("../../config/system.js");
const productRoute = require("../admin/product.route.js");
module.exports = (app)=>{
    const path_admin = path.prefixAdmin;
    app.use(path_admin +'/dashboard',dashboardRoute);
    app.use(path_admin+`/products`,productRoute);
};