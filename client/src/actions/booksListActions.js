export const setBooksListAction = (books) => ({
    type: "INIT",
    books,
});

export const filterBooksListAction = (pageBooksList, filterArray) => ({
    type: "FILTER",
    pageBooksList,
    filterArray,
});
// export const filterBooksListAction = (pageBooksList, field, value) => ({
//     type: "FILTER",
//     pageBooksList,
//     field,
//     value,
// });
