import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Easing, Image, Button } from 'react-native';

import Input from '../../Utils/forms/input';
import ValidationRules from '../../Utils/forms/validationRules';
import loadTabs from '../Tabs/tabs';
import { connect } from 'react-redux';
import { signUp, signIn } from '../../Store/actions/user_action';
import { bindActionCreators } from 'redux';

import { setToken } from '../../Utils/misc';

class LoginForm extends Component {

    state = {
        type: 'Login',
        action: 'Login',
        actionMode: 'Not a user, Register',
        hasErrors: false,
        form: {
            email: {
                value: "",
                valid: false,
                type: "textInput",
                rules: {
                    isRequired: true,
                    isEmail: true
                }
            },
            password: {
                value: "",
                valid: false,
                type: "textInput",
                rules: {
                    isRequired: true,
                    minLength: 6
                }
            },
            confirmPassword: {
                value: "",
                valid: false,
                type: "textInput",
                rules: {
                    confirmPass: "password"
                }
            }
        }
    }

    updateInput = (name, value) => {
        this.setState({
            hasErrors: false
        })

        let formCopy = this.state.form;
        formCopy[name].value = value;

        let rules = formCopy[name].rules;
        let valid = ValidationRules(value,rules,formCopy);

        console.log(valid)

        formCopy[name].valid = valid;

        this.setState({
            form: formCopy
        })
    }

    changeFormType = () => {
        const type = this.state.type;
        this.setState({
            type: type === 'Login' ? 'Register' : 'Login',
            action: type === 'Login' ? 'Register' : 'Login',
            actionMode: type === 'Login' ? 'Not registered, Login' : 'Not a user, Register'
        })
    }

    confirmPassword = () => (
        this.state.type != 'Login' ?
            <Input
                placeholder="Confirm your password"
                type={this.state.form.confirmPassword.type}
                value={this.state.form.confirmPassword.value}
                onChangeText={ value => this.updateInput("confirmPassword",value) }
                secureTextEntry
            />
        :null
    )

    formHasError = () => (
        this.state.hasErrors ? 
            <View style={styles.errorContainer}>
                <Text style={styles.errorLabel}>Opps, check your info</Text>
            </View>
        :
            null
    )

    submitUser = () => {
        let isFormValid = true;
        let formToSubmit = {};
        const formCopy = this.state.form;

        for(let key in formCopy){
            if(this.state.type === 'Login'){
                if(key !== 'confirmPassword' ){
                    isFormValid = isFormValid && formCopy[key].valid;
                    formToSubmit[key] = formCopy[key].value;
                }
            } else {
                isFormValid = isFormValid && formCopy[key].valid;
                formToSubmit[key] = formCopy[key].value;
            }
        }

        if(isFormValid) {
            if(this.state.type === "Login"){
                this.props.signIn(formToSubmit).then(()=>{
                    this.manageAccess()
                })
            } else {
                this.props.signUp(formToSubmit).then(()=>{
                    this.manageAccess()
                })
            }
        } else {
            this.setState({
                hasErrors: true
            })
        }

    }

    manageAccess = () => {
        if(!this.props.User.userData.uid){
            this.setState({
                hasErrors: true
            })
        } else {
            setToken(this.props.User.userData,()=>{
               this.setState({hasErrors: false})
               loadTabs();
            })
        }
    }



    render() {
        return (
            <View style={styles.formContainer}>
                <Input
                    placeholder="Enter your email"
                    type={this.state.form.email.type}
                    value={this.state.form.email.value}
                    onChangeText={value => this.updateInput("email", value)}
                    autoCapitalize={"none"}
                    keyboardTypes={"email-address"}
                />
                <Input
                    placeholder="Enter your password"
                    type={this.state.form.password.type}
                    value={this.state.form.password.value}
                    onChangeText={value => this.updateInput("password", value)}
                    secureTextEntry={true}
                />

                {this.confirmPassword()}
                {this.formHasError()}

                <View
                    style={
                        this.props.platform === "android"
                            ? styles.buttonStyleAndroid
                            : styles.buttonStyleIos
                    }
                >
                    <Button
                        title={this.state.type}
                        color="#fd9727"
                        onPress={this.submitUser}
                    />
                </View>
                <View
                    style={
                        this.props.platform === "android"
                            ? styles.buttonStyleAndroid
                            : styles.buttonStyleIos
                    }
                >
                    <Button
                        title={this.state.actionMode}
                        color="#fd9727"
                        onPress={this.changeFormType}
                    />
                </View>
                <View
                    style={
                        this.props.platform === "android"
                            ? styles.buttonStyleAndroid
                            : styles.buttonStyleIos
                    }
                >
                    <Button
                        title="I'll do it later"
                        color="#fd9727"
                        onPress={() => loadTabs()}
                    />
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        minHeight: 400
    },
    buttonStyleAndroid: {
        marginBottom: 10,
        marginTop: 10,
    },
    buttonStyleIos: {
        marginBottom: 0
    },
    errorContainer: {
        marginBottom: 20,
        marginTop: 10
    },
    errorLabel : {
        color: 'red',
    }
})

function mapStateToProps(state) {
    return {
        User: state.User
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({signUp,signIn},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);