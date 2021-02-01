export const logInAction = ({ user, token, isAdmin }) => ({
    type: "LOG-IN",
    user,
    token,
    isAdmin,
});

export const logOutAction = () => ({
    type: "LOG-OUT",
});
