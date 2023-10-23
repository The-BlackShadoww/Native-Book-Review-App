import * as actionTypes from "./actionTypes";

const INITIAL_STATE = {
    books: [],
    reviews: [],
    reviewMsg: false,
    isAuth: false,
    token: null,
};

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATE_USER:
            return {
                ...state,
                isAuth: true,
                token: action.payload,
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                token: null,
            };
        case actionTypes.STORE_BOOKS:
            return {
                ...state,
                books: action.payload,
            };
        case actionTypes.STORE_REVIEWS:
            return {
                ...state,
                reviews: action.payload,
            };
        case actionTypes.ADD_REVIEW:
            return {
                ...state,
                reviews: state.reviews.concat(action.payload),
            };
        case actionTypes.REVIEWS_MSG:
            return {
                ...state,
                reviewMsg: action.payload,
            };
        default:
            return state;
    }
};
