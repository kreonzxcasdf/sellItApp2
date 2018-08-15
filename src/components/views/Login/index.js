
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, ActivityIndicator } from 'react-native';
import LoadTabs from '../Tabs/tabs';
import Logo from './Logo';
import LoginPanel from './LoginPanel';
import {
  getOrientation,
  setOrientationListener,
  removeOrientationListener,
  getPlatform,
  getToken,
  setToken
} from '../../Utils/misc';

import { connect } from 'react-redux';
import { autoSignIn } from '../../Store/actions/user_action';
import { bindActionCreators } from 'redux';
import loadTabs from '../Tabs/tabs';


class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      platform: getPlatform(),
      orientation: getOrientation(500),
      logoAnimation: false
    }

    setOrientationListener(this.changeOrientation)
  }

  showLogin = () => {
    this.setState({
      logoAnimation: true
    })
  }

  changeOrientation = () => {
    this.setState({
      orientation: getOrientation(500)
    })
  }

  componentWillUnmount() {
    removeOrientationListener();
  }

  componentWillMount() {
    getToken((values) => {
      console.log(this.props.User.userData)
      if (values[0][1] === null) {
        this.setState({ loading: false })
      } else {
        this.props.autoSignIn(values[1][1]).then(() => {
          if (!this.props.User.userData.token) {
            this.setState({ loading: false })
          } else {
            setToken(this.props.User.userData, () => {
              loadTabs(true)
            })
          }
        })
      }
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <ScrollView>
          <View style={styles.container}>
            <Logo
              orientation={this.state.orientation}
              showLogin={this.showLogin}
            />
            <LoginPanel
              orientation={this.state.orientation}
              show={this.state.logoAnimation}
              platform={this.state.platform}
            />
          </View>
        </ScrollView>

      )
    };
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

function mapStateToProps(state) {
  return {
    User: state.User
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ autoSignIn }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)