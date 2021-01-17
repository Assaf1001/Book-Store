export const initialBooksListState = [];

const booksListReducer = (booksState, action) => {
    switch (action.type) {
        case "INIT":
            return [...action.books];
        case "FILTER":
            if (action.value === "All") {
                return action.pageBooksList;
            }
            const field = action.field;
            const newBooksState = action.pageBooksList.filter(
                (book) => book[field] === action.value
            );
            return newBooksState;
        default:
            return [...booksState];
    }
};

export default booksListReducer;
