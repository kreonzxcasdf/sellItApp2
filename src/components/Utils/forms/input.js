import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Picker } from 'react-native';

const Input = (props) => {
    let template = null;

    switch (props.type) {
        case "textInput":
            template =
                <TextInput
                    underlineColorAndroid="transparent"
                    {...props}
                    style={[styles.input, props.overrideStyle]}
                />
            break;
        case "picker":
            template =
                <Picker
                    selectedValue={props.value}
                    {...props}
                >
                    {
                        props.options.map((item, i) => (
                            <Picker.Item
                                key={i}
                                label={item}
                                value={item}
                            >
                            </Picker.Item>
                        ))
                    }
                </Picker>
            break;
        default:
            return template
    }
    return template;
}



const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: '#eaeaea',
        fontSize: 18,
        padding: 5,
        marginTop: 10
    }
})

export default Input;