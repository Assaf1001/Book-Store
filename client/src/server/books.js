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

export const getBestSellersBooks = async () => {
    try {
        const res = await Axios.get(`${booksURL}/bestSellers`);

        return res.data;
    } catch (err) {
        if (err.response.status === 404) {
            throw new Error(err.response.data.message);
        }
    }
};

export const getNewReleasesBooks = async () => {
    try {
        const res = await Axios.get(`${booksURL}/newReleases`);

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
        throw new Error(err.response.data);
    }
};

export const getBookByID = async (bookId) => {
    try {
        const res = await Axios.get(`${booksURL}/id/${bookId}`);

        return res.data;
    } catch (err) {
        if (err.response.status === 404) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error(err);
        }
    }
};

export const addBook = async (book, token) => {
    try {
        const res = await Axios.post(
            `${booksURL}/new`,
            { book },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const editBook = async (bookId, book, token) => {
    try {
        const res = await Axios.patch(
            `${booksURL}/id`,
            { bookId, book },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const removeBook = async (bookId, token) => {
    try {
        const res = await Axios.delete(`${booksURL}/id`, {
            headers: { Authorization: `Bearer ${token}` },
            data: { bookId },
        });

        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
