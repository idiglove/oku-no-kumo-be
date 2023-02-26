import { loginUser } from "../controllers/usersController";
import {
    HEADING_SUCCESS_REGISTRATION,
    HEADING_SUCCESS_LOGIN,
    AUTH_ERR_PASS_INC_OBJ,
    AUTH_ERR_USER_NOT_REGISTERED_OBJ,
} from "../controllers/utils/constants";

const {
    REGISTERED_USERNAME,
    REGISTERED_EMAIL,
    REGISTERED_PASSWORD,
    UNREGISTERED_USERNAME,
    UNREGISTERED_EMAIL,
} = process.env;

if (!REGISTERED_EMAIL || !REGISTERED_USERNAME || !REGISTERED_PASSWORD) {
    throw new Error(
        "REGISTERED_EMAIL, REGISTERED_USERNAME, or REGISTERED_PASSWORD is not defined in the env file."
    );
}

class LoginReqBody {
    constructor(emailOrUsername, password) {
        this.emailOrUsername = emailOrUsername;
        this.password = password;
    }
}

function generateEmailAndUserNameLoginReqBody(email, username, password) {
    return [
        new LoginReqBody(email, password),
        new LoginReqBody(username, password),
    ];
}

const [registeredEmail, registeredUsername] =
    generateEmailAndUserNameLoginReqBody(
        REGISTERED_EMAIL,
        REGISTERED_USERNAME,
        REGISTERED_PASSWORD
    );

const [registeredEmailWithFaultyPass, registeredUsernameWithFaultyPass] =
    generateEmailAndUserNameLoginReqBody(
        REGISTERED_EMAIL,
        REGISTERED_USERNAME,
        "incorrectpassword"
    );

const [unregisteredEmail, unregisteredUsername] =
    generateEmailAndUserNameLoginReqBody(
        UNREGISTERED_EMAIL,
        UNREGISTERED_USERNAME,
        "incorrectpassword"
    );

const mockRequest = (bodyObj) => {
    return {
        body: bodyObj,
    };
};

const mockResponse = () => {
    const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
    };
    return res;
};

describe("Authentication", () => {
    test("Should successfully login existing user using registered email", async () => {
        const req = mockRequest(registeredEmail);
        const res = mockResponse();
        await loginUser(req, res);

        expect(res.send).toHaveBeenCalledWith({
            heading: HEADING_SUCCESS_LOGIN,
            access: expect.anything(),
        });
    });

    test("Should successfully login existing user using registered username", async () => {
        const req = mockRequest(registeredUsername);
        const res = mockResponse();
        await loginUser(req, res);

        expect(res.send).toHaveBeenCalledWith({
            heading: HEADING_SUCCESS_LOGIN,
            access: expect.anything(),
        });
    });

    test("Should return error if user tries to log in with registered email but incorrect password", async () => {
        const req = mockRequest(registeredEmailWithFaultyPass);
        const res = mockResponse();
        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(AUTH_ERR_PASS_INC_OBJ);
    });

    test("Should return error if user tries to log in with registered username but incorrect password", async () => {
        const req = mockRequest(registeredUsernameWithFaultyPass);
        const res = mockResponse();
        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(AUTH_ERR_PASS_INC_OBJ);
    });

    test("Should return error if user email is not yet registered", async () => {
        const req = mockRequest(unregisteredEmail);
        const res = mockResponse();
        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(AUTH_ERR_USER_NOT_REGISTERED_OBJ);
    });

    test("Should return error if user username is not yet registered", async () => {
        const req = mockRequest(unregisteredUsername);
        const res = mockResponse();
        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(AUTH_ERR_USER_NOT_REGISTERED_OBJ);
    });
});
