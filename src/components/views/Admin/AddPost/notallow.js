import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Navigation } from 'react-native-navigation';
import { navigatorDrawer } from '../../../Utils/misc';

class NotAllow extends Component {
    constructor(props) {
        super(props);

        this.props.navigator.setOnNavigatorEvent((event) => {
            navigatorDrawer(event, this)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Icon
                    size={60}
                    name="frown-o"
                    color="#F44336"
                />
                <Text>You need login or register </Text>

                <Button
                    title="Login / Register"
                    color="#FD9727"
                    onPress={() => {
                        Navigation.startSingleScreenApp({
                            screen: {
                                screen: "sellitApp.Login",
                                title: "Login",
                                navigatorStyle: {
                                    navBarHidden: true
                                }
                            }
                        })
                    }}
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default NotAllow;