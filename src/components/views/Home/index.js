import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { navigatorDrawer, navigatorDeepLink, gridTwoColumns } from '../../Utils/misc';

import HorizontalScroll from './horizontal_scroll_icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getArticles } from '../../Store/actions/article_action';
import BlockItem from './blockItem';

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isloading: true,
      articles: [],
      categories: ['All', 'Sports', 'Music', 'Clothing', 'Electronics'],
      categorySelected: "All"
    }

    this.props.navigator.setOnNavigatorEvent((event) => {
      navigatorDeepLink(event, this)
      navigatorDrawer(event, this)
    })
  }

  componentDidMount() {
    this.props.getArticles('All').then(() => {
      const newArticles = gridTwoColumns(this.props.Articles.list)
      this.setState({
        isloading: false,
        articles: newArticles
      })
    })
  }

  updateCategoryHandler = (value) => {
    this.setState({
      isloading: true,
      categorySelected: value,
      articles: []
    })

    this.props.getArticles(value).then(() => {
      const newArticles = gridTwoColumns(this.props.Articles.list)
      this.setState({
        isloading: false,
        articles: newArticles
      })
    })

  }

  showArticles = () => (
    this.state.articles.map((item, i) => (
      <BlockItem
        key={`columnHome-${i}`}
        item={item}
        iteration={i}
      />
    ))
  )

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <HorizontalScroll
            categories={this.state.categories}
            categorySelected={this.state.categorySelected}
            updateCategoryHandler={this.updateCategoryHandler}
          />
          {
            this.state.isloading ?
              <View style={styles.isloading}>
                <Icon name="gears" size={30} color='lightgrey'></Icon>
                <Text style={{ color: 'lightgrey' }}>Loading....</Text>
              </View>
              : null
          }
          <View style={styles.articleContainer}>
            <View style={{ flex: 1 }}>
              {this.showArticles()}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  isloading: {
    flex: 1,
    alignItems: "center",
    marginTop: 50
  },
  articleContainer: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

function mapStateToProps(state) {
  return {
    Articles: state.Article
  }
}

function mapDispatchToPros(dispatch) {
  return bindActionCreators({ getArticles }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToPros)(Home);