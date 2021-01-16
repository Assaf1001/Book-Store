import Axios from "axios";

const booksURL = `${process.env.REACT_APP_DB}/books`;

export const getBooks = async () => {
    try {
        const res = await Axios.get(`${booksURL}/all`);

        return res.data;
    } catch (err) {
        if (err.response.status === 404) {
            throw new Error(err.response.data.message);
        }
    }
};

export const getDicountedBooks = async () => {
    try {
        const res = await Axios.get(`${booksURL}/discounted`);

        return res.data;
    } catch (err) {
        if (err.response.status === 404) {
            throw new Error(err.response.data.message);
        }
    }
};

export const getBooksByFieldAndValue = async (field, value) => {
    try {
        const res = await Axios.get(`${booksURL}/find`, {
            params: { field, value },
        });

        return res.data;
    } catch (err) {
        if (err.response.status === 404) {
            throw new Error(err.response.data.message);
        }
    }
};

export const getBookByID = async (bookId) => {
    try {
        const res = await Axios.get(`${booksURL}/${bookId}`);

        return res.data;
    } catch (err) {
        if (err.response.status === 404) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error(err);
        }
    }
};
