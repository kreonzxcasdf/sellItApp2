import {
    Dimensions,
    Platform,
    AsyncStorage
} from 'react-native';

export const getOrientation = (value) => {
    return Dimensions.get("window").height > value ? 'Portrait' : 'Landscape';
}

export const APIKEY = 'AIzaSyBLNQFatL8zC8XavMUKnMq_BsXZF_ZFz8Y'
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`
export const SIGNIN= `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`


export const setOrientationListener = (cb) => {
    return Dimensions.addEventListener("change",cb);
} 

export const removeOrientationListener = () => {
    return Dimensions.removeEventListener("change");
}

export const getPlatform = () => {
    if(Platform.OS === 'ios'){
        return 'ios';
    } else {
        return 'android';
    } 
}

export const setToken = (values, cb) => {
    const dateNow = new Date();
    const expiration = dateNow.getTime() + (3600 * 1000);

    AsyncStorage.multiSet([
        ['@sellitApp@token', values.token],
        ['@sellitApp@refreshToken',values.refToken],
        ['@sellitApp@expiredToken', expiration.toString()],
        ['@sellitApp@uid', values.uid]
    ]).then(() => {
        cb()
    })
}

export const getToken = (cb) => {
    AsyncStorage.multiGet([
        '@sellitApp@token',
        '@sellitApp@refreshToken',
        '@sellitApp@expiredToken',
        '@sellitApp@uid'
    ]).then(values=>{
        cb(values)
    })
}