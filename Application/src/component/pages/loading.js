import React from 'react';
import 'react-native-gesture-handler';
import {View, Text, StyleSheet} from 'react-native';

export const LoadingScreen = () => {
    return(
        <View style = {styles.container}>
            <Text>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    container : {
        alignItems : 'center',
        justifyContent: 'center',
        flex: 1

    },
    textcontainer : {
        alignItems : 'center',
        justifyContent: 'center'
    }
})