import { review, game } from "@prisma/client";

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

export const AUTH_ERR_USER_NOT_REG_OR_NOT_ADMIN_OBJ = {
    heading:
        "Email or Username is not yet registered or does not have admin access.",
    message:
        "Please register first before logging in and request for admin access.",
};

export const HEADING_SUCCESS_LOGIN = "Successfully logged in";
``;

export const returnAuthSuccessObj = (token: string) => {
    return {
        heading: HEADING_SUCCESS_LOGIN,
        access: token,
    };
};

export const HEADING_SUCCESS_ADD_REVIEW = "Successfully created a review!";

export function generateSuccessAddReviewResObj(createdReview: review) {
    return {
        heading: HEADING_SUCCESS_ADD_REVIEW,
        data: createdReview,
    };
}

export function generateSuccessApproveReviewResObj(
    reviewId: number,
    approvedReview: review
) {
    return {
        heading: `Review with id ${reviewId} has been approved.`,
        data: approvedReview,
    };
}

export function generateSuccessGameCreatedResObj(game: game) {
    return {
        heading: `Game with id ${game.id} has been created.`,
        data: game,
    };
}

export function generateReviewErrAlreadyApprovedResObj(reviewId: number) {
    return {
        heading: `Review with id ${reviewId} has already been approved.`,
    };
}

export function generateReviewErrInvalidReviewIdResObj(reviewId: number) {
    return {
        heading: `Review with id ${reviewId} not found.`,
    };
}
