import { addReview } from "../controllers/gameReviewsController";

import { approveReview } from "../controllers/reviewsController";

import {
    generateSuccessAddReviewResObj,
    generateSuccessApproveReviewResObj,
    generateReviewErrAlreadyApprovedResObj,
    generateReviewErrInvalidReviewIdResObj,
} from "../controllers/utils/constants";

const { VALID_GAME_ID, INVALID_REVIEW_ID } = process.env;

const mockRequest = (bodyObj, gameId, reviewId) => {
    return {
        body: bodyObj,
        params: {
            gameId,
            reviewId,
        },
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

const gameReviewData = {
    content: "Really fun gamessssss",
    username: "hello",
};

const gameId = "2";

let newReviewId;

describe("Reviews", () => {
    test("Adding new review", async () => {
        const req = mockRequest(gameReviewData, VALID_GAME_ID, null);
        const res = mockResponse();
        await addReview(req, res);
        const responseBody = res.send.mock.calls[0][0];

        expect(res.send).toHaveBeenCalledWith(
            generateSuccessAddReviewResObj(responseBody.data)
        );

        newReviewId = responseBody.data.id;
    });

    test("Approving existing unnapproved review", async () => {
        const req = mockRequest(null, null, newReviewId);
        const res = mockResponse();
        await approveReview(req, res);
        const responseBody = res.send.mock.calls[0][0];

        expect(res.send).toHaveBeenCalledWith(
            generateSuccessApproveReviewResObj(newReviewId, responseBody.data)
        );
    });

    test("Approving already approved review", async () => {
        const req = mockRequest(null, null, newReviewId);
        const res = mockResponse();
        await approveReview(req, res);
        const responseBody = res.send.mock.calls[0][0];

        expect(res.send).toHaveBeenCalledWith(
            generateReviewErrAlreadyApprovedResObj(newReviewId)
        );
    });

    test("Approving review that does not exist", async () => {
        const req = mockRequest(null, null, INVALID_REVIEW_ID);
        const res = mockResponse();
        await approveReview(req, res);
        const responseBody = res.send.mock.calls[0][0];

        expect(res.send).toHaveBeenCalledWith(
            generateReviewErrInvalidReviewIdResObj(INVALID_REVIEW_ID)
        );
    });
});
