import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Easing, Image } from 'react-native';
import BackImage from '../../../assets/images/loginPanel.jpg';
import LoginForm from './LoginForm';

class LoginPanel extends Component {

    state = {
        animFinished: false,    
        backimage: new Animated.Value(0),
        inputForm: new Animated.Value(0)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.show && !this.state.animFinished){
            Animated.parallel([
                Animated.timing(this.state.backimage,{
                    toValue: 1,
                    duration: 1000
                }),
                Animated.timing(this.state.inputForm,{
                    toValue: 1,
                    duration: 1500
                })
            ]).start(
                this.setState({
                    animFinished: true
                })
            )
        }
    }

    render() {
        return (
            <View>
                <Animated.View
                    style={{
                        opacity: this.state.backimage
                    }}
                >
                    <Image 
                        style={
                            this.props.orientation === "Portrait" 
                            ? styles.imageStylePortrait
                            : styles.imageStyleLandscape   
                        }
                        source={BackImage}
                        resizeMode={'contain'}
                    />
                </Animated.View>
                <Animated.View
                    style={{
                        opacity: this.state.inputForm,
                        top: this.state.inputForm.interpolate({
                            inputRange:[0,1],
                            outputRange:[100,30]
                        })
                    }}
                >
                  <LoginForm
                    platform={this.props.platform}
                  />
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageStylePortrait: {
        width: 270,
        height: 150 
    }, 
    imageStyleLandscape: {
        width: 270,
        height: 0
    }
})

export default LoginPanel;