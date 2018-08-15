import {
    GET_ARTICLES,
    ADD_ARTICLES,
    RESET_ARTICLES
} from '../types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_ARTICLES:
            return { ...state, list: action.payload }
        case ADD_ARTICLES:
            return { ...state, newArticle: action.payload }
        case RESET_ARTICLES:
            return { ...state, newArticle: action.payload }
        default:
            return state;
    }
}