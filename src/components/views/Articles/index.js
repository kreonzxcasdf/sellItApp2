import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, Linking, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Article = (props) => {

    const articleImage = () => (
        <View style={{ position: 'relative' }}>
            <Image
                resizeMode={"cover"}
                style={styles.articleImage}
                source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
            />
            <Text style={styles.priceTag}>
                $ {props.ArticleData.price}
            </Text>
        </View>
    )

    const articleText = () => (
        <View style={styles.articleText}>
            <Text style={styles.articleTitle}>
                {props.ArticleData.title}
            </Text>
            <Text style={styles.articleDescription}>
                {props.ArticleData.description}
            </Text>
        </View>
    )

    const ownerNfo = () => (
        <View style={styles.ownerNfo}>
            <Text>Contact the owner of this article to following this email:</Text>
            <Icon.Button
                name="envelope-o"
                color="#00ADA9"
                backgroundColor="#FFFFFF"
                onPress={()=> openEmail()}
            >
                <Text style={{fontSize: 20}}>
                    {props.ArticleData.email}
                </Text>
            </Icon.Button>
        </View>
    )

    const openEmail = () => {
        Linking.openURL(`mailto://${props.ArticleData.email}
        &subject=Regrading ${props.ArticleData.title}`)
    }

    return (
        <ScrollView>
            {articleImage()}
            {articleText()}
            {ownerNfo()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    articleImage: {
        width: '100%',
        height: 250
    },
    priceTag: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#FF6444',
        padding: 10,
        color: 'white'
    },
    articleTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#474143',
        marginTop: 10
    },
    articleDescription: {
        marginTop: 10,
        fontSize: 18
    },
    articleText: {
        padding: 10
    },
    ownerNfo: {
        marginTop:30,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: 'lightgrey'
    }
})

export default Article;