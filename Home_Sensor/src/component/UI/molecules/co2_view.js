import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export const CO2View = ({co2}) => {
    return (
        <View style={styles.co2textcontainer}>
            <Text style = {styles.sensorTitle}>종합 공기질(NH3, CO2 등등)</Text>
            <Text style = {styles.co2text}>공기질: {co2} ppm</Text>
        </View>
    )
}
const styles = StyleSheet.create ({
    co2textcontainer: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-start',
        //backgroundColor: 'gray',
    },
    co2text : {
        //height: "50%",
        fontSize: 30,
        fontWeight: 'normal',
        fontWeight: '400',
    },
    sensorTitle : {
        height: '40%',
        fontSize: 30,
        fontWeight: 'bold',
        fontWeight: 'bold',
    },
})