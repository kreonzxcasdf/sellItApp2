import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import FalseIcon from '../../../assets/images/circle.png';

const navLeftButton = (sources) => {
    return {
        title: 'Drawer',
        id: 'DrawerButton',
        icon: sources[0],
        disabledIconTint : true,
        buttonColor: 'white'
    }
}

const navRightButton = (sources) => {
    return {
        title: 'DrawerRight',
        id: 'DrawerRightButton',
        icon: sources[1],
        disabledIconTint : true,
        buttonColor: 'white'
    }
}

const navStyle = {
    navBarTextFontSize: 20,
    navBarTextColor: '#ffffff',
    navBarTitleTextCentered : true, //android
    navBarBackgroundColor : '#00ADA9',
    navBarButtonColor : 'white'
}

const loadTabs = () => {
    Promise.all([
        Icon.getImageSource('navicon', 20, 'white'),
        Icon.getImageSource('search', 20, 'white'),
        Icon.getImageSource('home', 20, 'white')
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "sellitApp.Home",
                    label: "Home",
                    title: "Home",
                    icon: sources[2],
                    navigatorStyle: navStyle,
                    navigatorButtons : {
                        leftButtons: [navLeftButton(sources)],
                        rightButtons:  [navRightButton(sources)],
                    }
                },
                {
                    screen: "sellitApp.AddPost",
                    label: "Sell it",
                    title: "Sell it",
                    icon: sources[1],
                    navigatorStyle: navStyle,
                    navigatorButtons : {
                        leftButtons: [navLeftButton(sources)],
                        rightButtons:  [navRightButton(sources)],
                    }
                }
            ],
            tabsStyle: {
                tabBarButtonColor: 'grey',
                tabBarSelectedButtonColor: '#236661',
                tabBarBackgroundColor: 'white',
                tabBarTranslucent: false
            },
            appStyle: {
                tabBarButtonColor: 'grey',
                tabBarSelectedButtonColor: '#236661',
                tabBarBackgroundColor: 'white',
                tabBarTranslucent: false
            },
            drawer: {
                left:{
                    screen: "sellitApp.SidedrawerComponent",
                    fixedWidth: 500
                }
            }
        })
    })
}

export default loadTabs;