import React from 'react';
import 'react-native-gesture-handler';
import { View } from 'react-native';
import { TempAverage } from '../UI/molecules/temp_average_view';

export default function TemperatureScreen () {

    return (
        <View>
            <>
                <TempAverage/>
            </>
        </View>
    )
}
