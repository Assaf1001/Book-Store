import Axios from "axios";

const userURL = `${process.env.REACT_APP_DB}/users/me`;

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
