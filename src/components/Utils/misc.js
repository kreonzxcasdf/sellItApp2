import {
    Dimensions,
    Platform,
    AsyncStorage
} from 'react-native';

export const getOrientation = (value) => {
    return Dimensions.get("window").height > value ? 'Portrait' : 'Landscape';
}

export const FIREBASEURL = 'https://sellitapp-88ad6.firebaseio.com' 
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

export const navigatorDrawer = (event, $this) => {
    if(event.type === "NavBarButtonPress" && event.id === 'DrawerButton'){
        $this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true
        })
    }
}

export const navigatorDeepLink = (event, $this) => {
    if(event.type === "DeepLink") {
        $this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true
        })

        if(event.payload.typeLink === 'tab') {
            $this.props.navigator.switchToTab({
                tabIndex: event.payload.indexLink
            })
        } else {
            $this.props.navigator.showModal({
                screen: event.link,
                animationType: 'slide-horizontal',
                navigatorStyle: {
                    navBarBackgroundColor : '#00ADA9',
                    screenBackgroundColor : '#ffffff',
                },
                backButtonHidden: false
            })
        }

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

export const gridTwoColumns = (list) => {
    let newArticles = [];
    let articles = list;

    let count = 1;
    let vessel = {};

    if(articles) {
        articles.forEach ( element  => {
            if( count == 1) {
                vessel["blockOne"] = element;
                count++;
            } else {
                vessel["blockTwo"] = element;
                newArticles.push(vessel);

                count = 1;
                vessel = {};
            }
        })
    }
    return newArticles;
}