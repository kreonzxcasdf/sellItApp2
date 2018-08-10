import {Navigation} from 'react-native-navigation';

import FalseIcon from '../../../assets/images/circle.png';

const loadTabs = () => {
    Navigation.startTabBasedApp({
        tabs:[
            {
                screen:"sellitApp.Home",
                label:"Home",
                title:"Home",
                icon:FalseIcon
            },
            {
                screen:"sellitApp.AddPost",
                label:"Sell it",
                title:"Sell it",
                icon:FalseIcon
            }
        ]
    })
}

export default loadTabs;