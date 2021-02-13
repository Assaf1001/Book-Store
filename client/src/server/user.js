import Axios from "axios";

const userURL = `${process.env.REACT_APP_DB}/users/me`;

export const addBookToWishList = async (bookId, token) => {
    try {
        const res = await Axios.post(
            `${userURL}/addToWishList`,
            { bookId },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const removeBookFromWishList = async (bookId, token) => {
    try {
        const res = await Axios.patch(
            `${userURL}/removeFromWishList`,
            { bookId },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const moveBookFromWishListToCart = async (bookId, token) => {
    try {
        const res = await Axios.post(
            `${userURL}/moveToCart`,
            { bookId },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const moveAllBooksFromWishListToCart = async (books, token) => {
    try {
        const res = await Axios.post(
            `${userURL}/moveAllToCart`,
            { books },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const getWishList = async (token) => {
    try {
        const res = await Axios.get(`${userURL}/wishList`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const emptyWishList = async (token) => {
    try {
        const res = await Axios.patch(
            `${userURL}/wishList`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const addBookToCart = async (bookId, token) => {
    try {
        const res = await Axios.post(
            `${userURL}/addToCart`,
            { bookId },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const getCart = async (token) => {
    try {
        const res = await Axios.get(`${userURL}/cart`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const updateBookQuantity = async (bookId, quantity, token) => {
    try {
        const res = await Axios.post(
            `${userURL}/cart/`,
            { bookId, quantity },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const addPurchased = async (purchased, token) => {
    try {
        const res = await Axios.post(
            `${userURL}/purchased`,
            { purchased },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const emptyCart = async (token) => {
    try {
        const res = await Axios.patch(
            `${userURL}/cart`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const getOrders = async (token) => {
    try {
        const res = await Axios.get(`${userURL}/purchased`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
