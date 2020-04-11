import React, { Component } from 'react'
import { View } from 'react-native'
import { addData } from '../actions/actions';
import { connect } from 'react-redux';
import FormField from '../component/FormField';
import fireaBaseConfig from '../config/fireBaseConfig';
import { set } from 'react-native-reanimated';

class CreateScreen extends Component {
  constructor(props) {
    super(props)
    this.bookDb = fireaBaseConfig.child('books')
  }

  onSubmit = (title, author) => {
    const { navigation, addData, data } = this.props
    const elements = {
      title, author,
      id: new Date().getTime()
    }
    console.log('Data ', elements.id)
    this.bookDb.child(elements.id).set(elements)
    addData(elements);
    navigation.pop()
  }
  render() {
    return (
      <View>
        <FormField
          buttonText='Add'
          onSubmit={this.onSubmit}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.data
  }
}

export default connect(mapStateToProps, { addData })(CreateScreen)