import React, {ReactElement} from 'react';
import 'react-native-gesture-handler';
import {View} from 'react-native';
import {HumidAverage} from '../UI/molecules/humid_average_view';

export default function HumidityScreen(): ReactElement {
  return (
    <View>
      <>
        <HumidAverage />
      </>
    </View>
  );
}
