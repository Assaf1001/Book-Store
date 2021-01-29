import Axios from "axios";

const generalURL = `${process.env.REACT_APP_DB}/general`;

export const getOrderNumber = async () => {
    try {
        const res = await Axios.get(`${generalURL}/orderNumber`);

        return res.data.orderNumber;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
