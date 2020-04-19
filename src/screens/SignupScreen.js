import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Button, Text } from 'react-native';
import { Context as AuthContext } from '../context/authContext';
import AuthForm from '../component/AuthForm'
import { NavigationEvents } from 'react-navigation';
import NavLink from '../component/NavLink';

const SignupScreen = ({ navigation }) => {
    const { state, signUp, clearMessage } = useContext(AuthContext)

    return (
        <View style={styles.container} >
            <NavigationEvents
                onWillBlur={clearMessage}
            />
            <AuthForm
                headerText='Signup with Books'
                errorMessage={state.errorMessage}
                onSubmit={signUp}
                submitButtonText='Sign Up'
            />

            <NavLink
                text='Already have an account?'
                route='Signin'
            />

        </View>
    );
};

SignupScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}

const styles = StyleSheet.create({
    container: {
        // borderColor: 'red',
        // borderWidth: 10,
        flex: 1,
        justifyContent: 'center',
    }
});

export default SignupScreen;
