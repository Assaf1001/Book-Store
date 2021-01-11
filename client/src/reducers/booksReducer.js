export const initialBooksState = [];

const booksReducer = (books, action) => {
    switch (action.type) {
        case "INIT":
            return [...action.books];
        default:
            return [...books];
    }
};

export default booksReducer;
