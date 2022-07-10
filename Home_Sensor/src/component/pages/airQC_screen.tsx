import React, {ReactElement, useState} from 'react';
import 'react-native-gesture-handler';
import {View} from 'react-native';
import {Average} from '../UI/molecules/average_view';

export default function AirQCScreen(): ReactElement {
  const [type] = useState<string>('air');
  return (
    <View>
      <>
        <Average type={type} />
      </>
    </View>
  );
}
