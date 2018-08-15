import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, ScrollView, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { getUserPosts, deleteUserPost } from '../../../Store/actions/user_action';
import { bindActionCreators } from 'redux';

class UserPosts extends Component {

  static navigatorButtons = {
    leftButtons: Platform.OS === 'ios' ?
      [
        {
          title: "Go Back",
          id: "goBack",
          buttonColor: "white"
        }
      ]
      : null
  }

  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      modal: false,
      toDelete: ''
    }

    if (Platform.OS === 'ios') {
      this.props.navigator.setOnNavigatorEvent((event) => {
        if (event.id === 'goBack') {
          this.props.navigator.dismissAllModals({
            animationType: 'slide-down'
          })
        }
      })
    }
  }

  componentDidMount() {
    const UID = this.props.User.userData.uid;

    this.props.getUserPosts(UID);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.User.userPosts) {
      this.setState({
        posts: nextProps.User.userPosts
      })
    }
  }

  showConfirm = (ID) => {
    this.setState({
      modal: true,
      toDelete: ID
    })
  }

  deletePost = (ID) => {
    this.props.deleteUserPost(ID, this.props.User.userData).then(() => {
      const UID = this.props.User.userData.uid;

      this.props.getUserPosts(UID);

      this.setState({
        modal: false,
        toDelete: ''
      });
    })
  }

  showposts = (posts) => (
    posts ?
      posts.map((item, i) => (
        <View style={styles.itemWrapper} key={item.id}>
          <View style={styles.itemTitle}>
            <Text style={{ fontWeight: 'bold' }}>
              {item.title}
            </Text>
          </View>

          <View style={styles.itemDescription}>
            <Text>{item.description}</Text>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.small}>Price: $ {item.price}</Text>
              <Text style={styles.small}>Category: {item.category}</Text>
            </View>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() => this.showConfirm(item.id)}
            >
              <Text
                style={{ fontWeight: '700', color: '#F44336', paddingBottom: 10 }}
              >
                Delete Post
              </Text>
            </TouchableOpacity>
          </View>


          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modal}
          >
            <View style={{ padding: 50 }}>
              <Text style={{ fontSize: 20 }}>
                Are you sure to delete this post ?
                </Text>
            </View>

            <View style={{ marginTop: 50 }}>
              <TouchableOpacity
                onPress={() => this.deletePost(this.state.toDelete)}
              >
                <Text style={styles.modalDelete}>
                  Yes, Delete it
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    modal: false,
                    toDelete: ''
                  })
                }}
              >
                <Text
                  style={styles.modalClose}>
                  No, Keep it
              </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      ))
      : null
  )

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{ marginBottom: 30 }}>
            <Text>You have {this.state.posts.length} posts</Text>
          </View>
          {
            this.showposts(this.state.posts)
          }
        </View>
      </ScrollView>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  itemWrapper: {
    borderWidth: 1,
    borderColor: '#ececec',
    borderRadius: 2,
    marginBottom: 20
  },
  itemTitle: {
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    padding: 10,
    backgroundColor: '#f5f5f5'
  },
  itemDescription: {
    padding: 10
  },
  small: {
    fontSize: 12
  },
  buttons: {
    paddingRight: 10,
    alignItems: 'flex-end'
  },
  modalDelete: {
    marginBottom: 20,
    alignSelf: 'center',
    fontSize: 20,
    color: '#F44336'
  },
  modalClose: {
    marginBottom: 20,
    alignSelf: 'center',
    fontSize: 20,
    color: '#00ADA9'
  }
})

function mapStateToProps(state) {
  return {
    User: state.User
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserPosts, deleteUserPost }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);

