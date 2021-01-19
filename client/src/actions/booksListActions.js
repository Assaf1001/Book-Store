export const setBooksListAction = (books) => ({
    type: "INIT",
    books,
});

export const filterBooksListAction = (pageBooksList, filterArray) => ({
    type: "FILTER",
    pageBooksList,
    filterArray,
});
