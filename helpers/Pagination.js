module.exports = (objectNavigation, query, countProducts) => {
    if (query.page) {
        objectNavigation.currentPage = parseInt(query.page);
    }
    objectNavigation.skip = (objectNavigation.currentPage - 1) * objectNavigation.limitItem;

    const totalPage = Math.ceil(countProducts / objectNavigation.limitItem);
    objectNavigation.totalPage = totalPage;
    return objectNavigation;
};