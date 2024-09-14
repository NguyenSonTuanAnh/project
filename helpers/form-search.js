module.exports = (query)=>{
    let objectSearch = {
        keyword:  "",
    };

    if (query.keyword) {
        objectSearch.keyword = query.keyword;
        //Tim kiem ko can danh chinh xac ten, va ko phan biet chu hoa chu thuong
        const regex = new RegExp(objectSearch.keyword,"i");
        objectSearch.regex = regex;
    }
    return objectSearch;
}