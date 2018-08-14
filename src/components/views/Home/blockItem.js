import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity } from 'react-native';

const BlockItem = (props) => {

    const itemImage = () => (
        <View>
            <Image
                resizeMode={"cover"}
                style={styles.itemImage}
                source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
            />
        </View>
    )

    const itemText = (item) => (
        <View style={styles.itemTextContainer}>
            <Text style={styles.itemTextTitle}>
                {item.title}
            </Text>
            <Text style={styles.itemTextPrice}>
                $ {item.price}
            </Text>
        </View>
    )

    const block = ({ item, i }) => (
        <View
            style={styles.blockRow}
        >
            <TouchableOpacity style={{ flex: 2 }}
                onPress={() =>{
                    props.goto(item.blockOne)
                }}
            >
                <View
                    style={[
                        styles.blockGridStyle,
                        styles.blockGridStyleLeft
                    ]}
                >
                    {itemImage()}
                    {itemText(item.blockOne)}
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 2 }}
                onPress={() =>{
                    props.goto(item.blockTwo)
                }}
            >
                <View
                    style={[
                        styles.blockGridStyle,
                        styles.blockGridStyleRight
                    ]}
                >
                    {itemImage()}
                    {itemText(item.blockTwo)}
                </View>
            </TouchableOpacity>
        </View>
    )
    return (
        <View>
            {block(props)}
        </View>
    )
}

const styles = StyleSheet.create({
    blockRow: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between'
    },
    itemImage: {
        width: '100%',
        height: 200
    },
    itemTextContainer: {
        padding: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#FF6444'
    },
    itemTextTitle: {
        fontWeight: "700",
        color: "#4c4c4c",
        marginBottom: 5
    },
    itemTextPrice: {
        fontWeight: "500",
        color: "#00ada9",
        marginBottom: 5
    },
    blockGridStyle: {
        backgroundColor: '#f1f1f1'
    },
    blockGridStyleLeft: {
        marginRight: 2.5
    },
    blockGridStyleRight: {
        marginLeft: 2.5
    }
})


export default BlockItem;