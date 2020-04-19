import React, { useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/authContext';
import Spacer from '../component/Space';

const AccountScreen = ({ navigation }) => {
    console.log('navigation:::',navigation)

    const { signOut } = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 10 }} >AccountScreen</Text>
            <Spacer>
                <Button
                    title='My Uploads'
                    onPress={() => navigation.navigate('Myuplods')}
                />
            </Spacer>
            <Spacer>
                <Button
                    title='Sign out'
                    onPress={signOut}
                />
            </Spacer>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default AccountScreen
