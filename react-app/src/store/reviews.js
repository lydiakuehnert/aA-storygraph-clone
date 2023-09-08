const GET_REVIEWS = "reviews/getReviews";
const CREATE_REVIEW = "reviews/createReview";
const DELETE_REVIEW = "reviews/deleteReview";
const EDIT_REVIEW = "books/editReview";


const getReviewsAction = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
};

const createReviewAction = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

const deleteReviewAction = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

const editReviewAction = (review) => {
    return {
        type: EDIT_REVIEW,
        review
    }
}


export const getReviewsThunk = (bookId) => async dispatch => {
    const res = await fetch(`/api/reviews/${bookId}`)

    if (res.ok) {
        const reviews = await res.json();
        dispatch(getReviewsAction(reviews))
    }
};

export const createReviewThunk = ({ bookId, payload }) => async dispatch => {
    const res = await fetch(`/api/reviews/${bookId}/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (res.ok) {
        const review = await res.json();
        dispatch(createReviewAction(review))
        return review;
    }
    else {
        return res
    }
}

export const deleteReviewThunk = (reviewId) => async dispatch => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
        dispatch(deleteReviewAction(reviewId))
    }
}

export const editReviewThunk = (newReview) => async dispatch => {
    const res = await fetch(`/api/reviews/edit/${newReview.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
    })

    if (res.ok) {
        const review = await res.json();
        dispatch(editReviewAction(review))
        return review;
    }
    else {
        return res
    }
}


const initialState = { book: {}, user: {} };

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_REVIEWS: {
            newState = { ...state, book: {}, user: {} }
            action.reviews.forEach(review => newState.book[review.id] = review)
            return newState
        }
        case CREATE_REVIEW: {
            newState = { ...state, book: { ...state.book }, user: {} }
            newState.book[action.review.id] = action.review;
            return newState
        }
        case DELETE_REVIEW: {
            newState = { ...state, book: { ...state.book }, user: {} }
            delete newState.book[action.reviewId]
            return newState
        }
        case EDIT_REVIEW: {
            newState = { ...state, book: { ...state.book }, user: {} }
            newState.book[action.review.id] = action.review;
            return newState;
        }
        default:
            return state;
    }
};

export default reviewReducer;