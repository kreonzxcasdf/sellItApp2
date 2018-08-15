import {
    REGISTER_USER,
    SIGN_USER,
    AUTO_SIGN_IN,
    GET_USER_POSTS,
    DELETE_USER_POSTS
} from '../types';

import axios from 'axios';
import { setToken } from '../../Utils/misc';
import { SIGNUP, SIGNIN, REFRESH, FIREBASEURL } from '../../Utils/misc';

export function signIn(data) {
    const request = axios({
        method: "POST",
        url: SIGNIN,
        data: {
            email: data.email,
            password: data.password,
            returnSecureToken: true
        },
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        return false;
    })

    return {
        type: SIGN_USER,
        payload: request
    }
}

export function signUp(data) {
    const request = axios({
        method: "POST",
        url: SIGNUP,
        data: {
            email: data.email,
            password: data.password,
            returnSecureToken: true
        },
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        return false
    });

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export const autoSignIn = (refToken) => {
    const request = axios({
        method: "POST",
        url: REFRESH,
        data: "grant_type=refresh_token&refresh_token=" + refToken,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(response => {
        console.log(response.data)
        return response.data
    }).catch(e => {
        return false
    })

    return {
        type: AUTO_SIGN_IN,
        payload: request
    }
}

export function getUserPosts(UID) {
    const request = axios(`${FIREBASEURL}/articles.json?orderBy=\"uid\"&equalTo=\"${UID}\"`)
        .then(response => {
            let articles = [];

            for (let key in response.data) {
                articles.push({
                    ...response.data[key],
                    id: key
                })
            }

            return articles
        })

    return {
        type: GET_USER_POSTS,
        payload: request
    }
}

export const deleteUserPost = (POSTID, USERDATA) => {
    const promsie = new Promise((resolve, reject) => {
        const URL = `${FIREBASEURL}/articles/${POSTID}.json`

        const request = axios({
            method: "DELETE",
            url: `${URL}?auth=${USERDATA.token}`
        }).then(response => {
            resolve({ deletePost: true })
        }).catch(e => {
            const signIn = autoSignIn(USERDATA.refToken)

            signIn.payload.then(response => {
                let newToken = {
                    token: response.id_token,
                    refToken: response.refToken,
                    uid: response.user_id

                }

                setToken(newToken, () => {
                    axios({
                        method: "DELETE",
                        url: `${URL}?auth=${USERDATA.token}`
                    }).then(() => {
                        resolve({
                            userData: newToken,
                            deletePost: true
                        })
                    })
                })
            })
        })
    })

    return {
        type: DELETE_USER_POSTS,
        payload: promsie
    }

}