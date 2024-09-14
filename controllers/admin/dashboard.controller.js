//[GET]: /admin/dashboard
module.exports.dashBoard = (req,res)=>{
    res.render("admin/Pages/dashboard/index.pug",{
        pageTitle: "Trang admin"
    })
}