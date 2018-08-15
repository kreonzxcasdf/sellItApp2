import {
    GET_ARTICLES,
    ADD_ARTICLES,
    RESET_ARTICLES
} from '../types';

import axios from 'axios';
import { FIREBASEURL } from '../../Utils/misc';

export function getArticles(category) {
    let URL = `${FIREBASEURL}/articles.json`;

    if(category !== 'All') {
        URL = `${URL}/?orderBy=\"category\"&equalTo=\"${category}\"`
    }

    const request = axios(URL)
        .then(response => {
            const articles = [];

            for ( let key in response.data ) {
                articles.push({
                    ...response.data[key],
                    id: key
                })
            }
            return articles;
        })

    return{
        type: GET_ARTICLES,
        payload : request
    }
}

export function addArticles(data, token) {
    const request = axios({
        method:'POST',
        url: `${FIREBASEURL}/articles.json?auth=${token}`,
        data
    }).then( response => {
        return response.data
    })

    return {
        type: ADD_ARTICLES,
        payload: request
    }
}

export function resetArticles(){
    return {
        type: RESET_ARTICLES,
        payload: request
    }
}