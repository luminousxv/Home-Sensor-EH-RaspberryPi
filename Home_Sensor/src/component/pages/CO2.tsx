import React, {ReactElement} from 'react';
import 'react-native-gesture-handler';
import {View} from 'react-native';
import {CO2Average} from '../UI/molecules/co2_average_view';

export default function CO2Screen(): ReactElement {
  return (
    <View>
      <>
        <CO2Average />
      </>
    </View>
  );
}
