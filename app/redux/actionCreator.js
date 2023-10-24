import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authUser = (token) => {
    return {
        type: actionTypes.AUTHENTICATE_USER,
        payload: token,
    };
};

export const logout = () => {
    return {
        type: actionTypes.LOGOUT,
    };
};

export const tryAuth = (email, password, mode) => (dispatch) => {
    let URL = "";
    const API_KEY = "AIzaSyA3wVP7b7E8ioKXx3yTvnWGSJhjtcjtqIs";
    const data = {
        email: email,
        password: password,
        returnSecureToken: true,
    };
    console.log(data);

    if (mode === "signUp") {
        URL =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
            API_KEY;
    } else if (mode === "login") {
        URL =
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
            API_KEY;
    }
    axios
        .post(URL, data)
        .then((response) => {
            const data = response.data;
            if (data.error) {
                alert(data.error.message);
            } else {
                dispatch(authUser(data.idToken));
                alert("Login successful");
            }
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
            alert("Authentication Failed");
        });
};

export const bookStore = (book) => {
    return {
        type: actionTypes.STORE_BOOKS,
        payload: book,
    };
};

export const fetchBooks = () => (dispatch) => {
    axios
        .get(
            "https://native-book-review-app-default-rtdb.firebaseio.com/Books.json"
        )
        .then((response) => {
            dispatch(bookStore(response.data));
            console.log(response.data);
        })
        .catch((error) => console.log(error));
};

export const reviewMsg = (review) => {
    return {
        type: actionTypes.REVIEWS_MSG,
        payload: review,
    };
};

export const addReview = (rvw) => {
    return {
        type: actionTypes.ADD_REVIEW,
        payload: rvw,
    };
};

export const postReview = (review) => (dispatch) => {
    const rvw = {
        review: review,
    };

    axios
        .post(
            "https://native-book-review-app-default-rtdb.firebaseio.com/Reviews.json",
            rvw
        )
        .then((response) => {
            dispatch(addReview(rvw));
            dispatch(reviewMsg(true));
            console.log(response.data);
        })
        .catch((error) => console.log(error));
};

export const storeReviews = (rvw) => {
    return {
        type: actionTypes.STORE_REVIEWS,
        payload: rvw,
    };
};

export const fetchReviews = () => (dispatch) => {
    axios
        .get(
            "https://native-book-review-app-default-rtdb.firebaseio.com/Reviews.json"
        )
        .then((response) => {
            const data = response.data;
            const reviews = Object.keys(data).map((id) => {
                return {
                    id,
                    review: data[id].review,
                };
            });

            dispatch(storeReviews(reviews));
            console.log(reviews);
        })
        .catch((error) => console.log(error));
};
