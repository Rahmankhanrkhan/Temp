import React, { useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Context as AuthContext } from '../context/authContext'
import { NavigationEvents } from 'react-navigation';
import NavLink from '../component/NavLink';
import AuthForm from '../component/AuthForm';

const SigninScreen = () => {
    const { state, signIn, clearMessage } = useContext(AuthContext)
    return (
        <View style={styles.container} >
            <NavigationEvents
                onWillBlur={clearMessage}
            />
            <AuthForm
                submitButtonText='Sign in'
                headerText='Signin with Books  '
                onSubmit={signIn}
                errorMessage={state.errorMessage}
            />
            <NavLink
                route='Signup'
                text='Did not have an account?'
            />
        </View>
    )
};

SigninScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});

export default SigninScreen;
