export const HEADING_SUCCESS_REGISTRATION = "Registration successful";

export const SERVER_ERR_OBJ = {
    heading: "Server error",
    message: "Please try again.",
};

export const AUTH_ERR_PASS_INC_OBJ = {
    heading: "Password incorrect",
    message: "Please ensure that password is correct.",
};

export const AUTH_ERR_USER_NOT_REGISTERED_OBJ = {
    heading: "Email or Username is not yet registered",
    message: "Please register first before logging in.",
};

export const HEADING_SUCCESS_LOGIN = "Successfully logged in";
``;

export const returnAuthSuccessObj = (token: string) => {
    return {
        heading: HEADING_SUCCESS_LOGIN,
        access: token,
    };
};
