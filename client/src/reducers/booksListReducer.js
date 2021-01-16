export const initialBooksListState = [];

const booksListReducer = (books, action) => {
    switch (action.type) {
        case "INIT":
            return [...action.books];
        default:
            return [...books];
    }
};

export default booksListReducer;
