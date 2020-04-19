import React, { useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-elements';
import { Context as AuthContext} from '../context/authContext';

const AccountScreen = () => {
    
    const {signOut} = useContext(AuthContext)
    return (
        <View  style = {styles.container}>
            <Text style= {{fontSize: 10}} >AccountScreen</Text>
            <Button
                title = 'Sign out'
                onPress={signOut}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    }
});

export default AccountScreen
