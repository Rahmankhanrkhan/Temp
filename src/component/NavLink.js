import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { withNavigation } from 'react-navigation'
import Spacer from './Space'


const NavLink = ({ navigation, text, route }) => {
  return (
    <View>
      <Spacer>
        <TouchableOpacity
          onPress={
            () => navigation.navigate(route)
          } >
          <Text style={styles.link}>{text}</Text>
        </TouchableOpacity>
      </Spacer>
    </View>
  )
}

const styles = StyleSheet.create({
  link: {
    fontSize: 20,
    color: 'blue'
  }
})

export default withNavigation(NavLink);
