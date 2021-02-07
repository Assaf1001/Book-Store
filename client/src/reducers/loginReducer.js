export const intialUserDataState = { user: null, toekn: "", isAdmin: null };

const logInReducer = (userData, action) => {
    switch (action.type) {
        case "LOG-IN":
            return {
                user: { ...action.user },
                token: action.token,
                isAdmin: action.isAdmin,
            };
        case "LOG-OUT":
            return intialUserDataState;
        default:
            return { ...userData };
    }
};

export default logInReducer;
