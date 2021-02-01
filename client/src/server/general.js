import Axios from "axios";

const generalURL = `${process.env.REACT_APP_DB}/general`;

export const getOrderNumber = async () => {
    try {
        const res = await Axios.get(`${generalURL}/orderNumber`);

        return res.data.orderNumber;
    } catch (err) {
        throw new Error(err.response.data);
    }
};

export const addAdmin = async (newAdmin, token) => {
    try {
        const res = await Axios.post(
            `${generalURL}/admins`,
            { newAdmin },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return res.data;
    } catch (err) {
        throw new Error(err.response.data);
    }
};

export const getAdminsList = async (token) => {
    try {
        const res = await Axios.get(`${generalURL}/admins/list`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return res.data;
    } catch (err) {
        throw new Error(err.response.data);
    }
};

export const removeAdmin = async (adminToRemove, token) => {
    try {
        const res = await Axios.patch(
            `${generalURL}/admins`,
            { adminToRemove },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return res.data;
    } catch (err) {
        throw new Error(err.response.data);
    }
};
