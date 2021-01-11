import Axios from "axios";

const booksURL = `${process.env.REACT_APP_DB}/books`;

export const getBooksFromDB = async () => {
    try {
        const res = await Axios.get(`${booksURL}/all`);

        return res.data;
    } catch (err) {
        if (err.response.status === 404) {
            throw new Error(err.response.data.message);
        }
    }
};
