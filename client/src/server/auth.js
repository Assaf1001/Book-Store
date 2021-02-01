import Axios from "axios";

const signUpURL = `${process.env.REACT_APP_DB}/users/signup`;
const logInURL = `${process.env.REACT_APP_DB}/users/login`;
const generalURL = `${process.env.REACT_APP_DB}/general`;

export const singUp = async ({ name, email, password }) => {
    try {
        const res = await Axios.post(signUpURL, { name, email, password });

        return {
            token: res.data.token,
            user: { name: res.data.user.name, email: res.data.user.email },
        };
    } catch (err) {
        if (err.message.includes(400)) {
            throw new Error("Email exist"); ///////
        }
    }
};

const isUserAdmin = async (token) => {
    try {
        const res = await Axios.get(`${generalURL}/admins`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return res.data;
    } catch (err) {
        throw new Error(err.response.data);
    }
};

export const logIn = async ({ email, password }) => {
    try {
        const res = await Axios.post(logInURL, { email, password });
        const isAdmin = await isUserAdmin(res.data.token);

        return {
            token: res.data.token,
            user: { name: res.data.user.name, email: res.data.user.email },
            isAdmin,
        };
    } catch (err) {
        if (err.message.includes(400)) {
            throw new Error("Email or Password are invalid!");
        }
    }
};
