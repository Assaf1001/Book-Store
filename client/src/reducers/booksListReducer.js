export const initialBooksListState = [];

const booksListReducer = (booksState, action) => {
    switch (action.type) {
        case "INIT":
            return [...action.books];
        case "FILTER":
            let newBooksState = [];
            const filterArray = action.filterArray;

            newBooksState = action.pageBooksList.filter(
                (book) =>
                    (filterArray[0] === "" ||
                        book.title
                            .toLowerCase()
                            .includes(filterArray[0].toLowerCase())) &&
                    (filterArray[1] === "All" ||
                        book.author
                            .toLowerCase()
                            .includes(filterArray[1].toLowerCase())) &&
                    (filterArray[2] === "All" ||
                        book.category
                            .toLowerCase()
                            .includes(filterArray[2].toLowerCase())) &&
                    (filterArray[3] === "All" ||
                        book.details.language
                            .toLowerCase()
                            .includes(filterArray[3].toLowerCase())) &&
                    (Object.keys(filterArray[4]).length === 0 ||
                        (book.price >= filterArray[4].min &&
                            book.price <= filterArray[4].max))
            );
            return newBooksState;

        default:
            return [...booksState];
    }
};

export default booksListReducer;
