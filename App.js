import {Navigation} from 'react-native-navigation';

import Login from './src/components/views/Login/index';
import Home from './src/components/views/Home/index';
import AddPost from './src/components/views/Admin/AddPost/index';
import UserPosts from './src/components/views/Admin/UserPosts/index';
import ConfigureStore from './src/components/Store/config';
import {Provider} from 'react-redux';
import SidedrawerComponent from './src/components/views/Sidedrawer';

const Store = ConfigureStore();

Navigation.registerComponent(
  "sellitApp.Login",
  ()=>
  Login,
  Store,
  Provider
);
Navigation.registerComponent(
  "sellitApp.Home",
  ()=>
  Home,
  Store,
  Provider
);
Navigation.registerComponent(
  "sellitApp.AddPost",
  ()=>
  AddPost,
  Store,
  Provider
);
Navigation.registerComponent(
  "sellitApp.SidedrawerComponent",
  ()=>
  SidedrawerComponent,
  Store,
  Provider
);
Navigation.registerComponent(
  "sellitApp.UserPosts",
  ()=>
  UserPosts,
  Store,
  Provider
);
Navigation.startSingleScreenApp({
  screen:{
    screen:"sellitApp.Login",
    title:"Login",
    navigatorStyle:{
      navBarHidden:true
    }
  }
})