import React, { useState } from 'react';
import { View, StyleSheet, Keyboard, } from 'react-native'
import { Text, Input, Button } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Spacer from './Space';
import SafeAreaView from 'react-native-safe-area-view';

const AuthForm = ({ headerText, onSubmit, submitButtonText, errorMessage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    return (
        <SafeAreaView forceInset={{ top: 'always' }} >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
                <View>
                    <Spacer>
                        <Text style={styles.headerText} h3> {headerText}  </Text>
                    </Spacer>

                    <Spacer>
                        <Input
                            label='Email'
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                    </Spacer>

                    <Spacer>
                        <Input
                            secureTextEntry
                            label='Password'
                            value={password}
                            onChangeText={setPassword}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                    </Spacer>

                    {
                        errorMessage ?
                            <Text style={styles.response} > {errorMessage} </Text>
                            : null
                    }

                    <Spacer>
                        <Button
                            title={submitButtonText}
                            onPress={() => onSubmit({ email, password })}

                        />
                    </Spacer>

                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    response: {
        color: 'red',
        alignItems: 'center',
        alignContent: 'center',
        fontSize: 20,
        justifyContent: 'center',
        // marginLeft: 150
        textAlign: 'center'
    },
    headerText: {
        textAlign: 'center'
    }
})

export default AuthForm;