import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Modal } from 'react-native';
import { navigatorDrawer, setToken, getToken } from '../../../Utils/misc';
import Input from '../../../Utils/forms/input';
import ValidationRules from '../../../Utils/forms/validationRules';
import { autoSignIn } from '../../../Store/actions/user_action';

import { connect } from 'react-redux';
import { addArticles, resetArticle } from '../../../Store/actions/article_action';
import { bindActionCreators } from 'redux';

class AddPost extends Component {
  constructor(props) {
    super(props)

    this.props.navigator.setOnNavigatorEvent((event) => {
      navigatorDrawer(event, this)
    })
  }

  state = {
    isloading: false,
    hasErrors: false,
    modalVisible: false,
    modalSuccess: false,
    errorArray: [],
    form: {
      category: {
        value: "",
        name: "category",
        valid: false,
        type: "picker",
        options: ['Select a category', 'Sports', 'Music', 'Clothing', 'Electronics'],
        rules: {
          isRequired: true
        },
        errorMsg: "You need to select a category"
      },
      title: {
        value: "",
        name: "title",
        valid: false,
        type: "textInput",
        rules: {
          isRequired: true,
          maxLength: 50
        },
        errorMsg: "You need to enter a title, max 50 characters"
      },
      description: {
        value: "",
        name: "description",
        valid: false,
        type: "textInput",
        rules: {
          isRequired: true,
          maxLength: 200
        },
        errorMsg: "You need to enter a description, max 200 characters"
      },
      price: {
        value: "",
        name: "price",
        valid: false,
        type: "textInput",
        rules: {
          isRequired: true,
          maxLength: 6
        },
        errorMsg: "You need to enter a price, max 6 characters"
      },
      email: {
        value: "",
        name: "email",
        valid: false,
        type: "textInput",
        rules: {
          isRequired: true,
          isEmail: true
        },
        errorMsg: "You need to enter a email, make it valid email"
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
    let valid = ValidationRules(value, rules, formCopy);
    formCopy[name].valid = valid;

    this.setState({
      form: formCopy
    })
  }

  submitFormHandler = () => {
    let isFormValid = true;
    let dataToSubmit = {};
    const formCopy = this.state.form;

    for (let key in formCopy) {
      isFormValid = isFormValid && formCopy[key].valid;
      dataToSubmit[key] = this.state.form[key].value;
    }

    if (isFormValid) {
      this.setState({
        isloading: true
      });

      getToken((value) => {
        const dateNow = new Date();
        const expiration = dateNow.getTime();
        const form = {
          ...dataToSubmit,
          uid: value[3][1]
        }

        if (expiration > value[2][1]) {
          console.log('auto sign in')
          this.props.autoSignIn(value[1][1]).then(() => {
            setToken(this.props.User.userData, () => {
              this.props.addArticles(form, this.props.User.userData.token).then(() => {
                this.setState({
                  modalSuccess: true
                })
              })
            })
          })
        } else {
          this.props.addArticles(form, value[0][1]).then(() => {
            this.setState({
              modalSuccess: true
            })
          })
        }
      })
    } else {
      let errorArray = [];

      for (let key in formCopy) {
        if (!formCopy[key].valid) {
          errorArray.push(formCopy[key].errorMsg)
        }
      }

      this.setState({
        isloading: false,
        hasErrors: true,
        modalVisible: true,
        errorArray
      })
    }

  }

  showErrorArray = (errors) => (
    errors ?
      errors.map((item, i) => (
        <Text key={i} style={styles.errorItem}>- {item}</Text>
      ))
      : null
  )

  clearError = () => {
    this.setState({
      hasErrors: false,
      modalVisible: false,
      errorArray: []
    })
  }

  resetSellitScreen = () => {
    let formCopy = this.state.form;

    for (let key in formCopy) {
      formCopy[key].valid = false;
      formCopy[key].value = "";
    }

    this.setState({
      modalSuccess: false,
      hasErrors: false,
      errorArray: [],
      loading: false
    })

    //dispatch action to clear the store ..
    this.props.resetArticle()

  }

  render() {
    return (
      <ScrollView>
        <View style={styles.formInputContainer}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.mainTitle}>Sell your things</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text>Select a category</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Input
                placeholder="Select a category"
                type={this.state.form.category.type}
                value={this.state.form.category.value}
                onValueChange={value => this.updateInput("category", value)}
                options={this.state.form.category.options}
              />
            </View>
          </View>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.secondTitle}>Describe what are you selling</Text>
          </View>

          <View>
            <Text>Please add the title and description</Text>
            <Input
              placeholder="Enter a title"
              type={this.state.form.title.type}
              value={this.state.form.title.value}
              onChangeText={value => this.updateInput("title", value)}
              overrideStyle={styles.inputTextTitle}
            />
          </View>
          <View>
            <Input
              placeholder="Enter a description"
              type={this.state.form.description.type}
              value={this.state.form.description.value}
              onChangeText={value => this.updateInput("description", value)}
              multiline={true}
              numberOfLines={4}
              overrideStyle={styles.inputTextDescription}
            />
          </View>

          <View>
            <Text style={{
              marginTop: 20,
              marginBottom: 20
            }}>Add here how much you want for the item</Text>
            <Input
              placeholder="Enter a price"
              type={this.state.form.price.type}
              value={this.state.form.price.value}
              onChangeText={value => this.updateInput("price", value)}
              overrideStyle={styles.inputTextTitle}
              keyboardType={"numeric"}
            />
          </View>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.secondTitle}>Add your contact data</Text>
          </View>

          <View>
            <Text>Please enter the emaial where users can contact you</Text>
            <Input
              placeholder="Enter a email"
              type={this.state.form.email.type}
              value={this.state.form.email.value}
              onChangeText={value => this.updateInput("email", value)}
              overrideStyle={styles.inputTextTitle}
              autoCapitalize={"none"}
              keyboardType={"email-address"}
            />
          </View>
          {
            !this.state.isloading ?
              <Button
                title="Sell it"
                color="lightgrey"
                onPress={this.submitFormHandler}
              />
              : null
          }

          <Modal
            animationType="slide"
            visible={this.state.modalVisible}
            onRequestClose={() => {

            }}
          >
            <View style={{ padding: 20, marginTop: 20 }}>
              {this.showErrorArray(this.state.errorArray)}
              <Button
                title="Got it !!!"
                onPress={this.clearError}
              />
            </View>
          </Modal>

          <Modal
            animationType="slide"
            visible={this.state.modalSuccess}
            onRequestClose={() => {

            }}
          >
            <View style={{ padding: 20 }}>
              <Text>Your data already saved</Text>
              <Button
                title="go back to home"
                onPress={() => {
                  this.resetSellitScreen();
                  this.props.navigator.switchToTab({
                    tabIndex: 0
                  })
                }}
              />
            </View>
          </Modal>


        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formInputContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 20
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00ADA9'
  },
  secondTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ADA9',
    marginTop: 20,
    marginBottom: 30
  },
  inputTextTitle: {
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 0,
    paddingTop: 10
  },
  inputTextDescription: {
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 0,
    paddingTop: 10,
    minHeight: 100
  },
  errorItem: {
    fontSize: 16,
    color: "red",
    marginBottom: 10
  }
});

function mapStateToProps(state) {
  return {
    Article: state.Article,
    User: state.User
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addArticles, autoSignIn, resetArticle }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);