import React, {ReactElement, useState} from 'react';
import 'react-native-gesture-handler';
import {View} from 'react-native';
import {Average} from '../UI/molecules/average_view';

export default function HumidityScreen(): ReactElement {
  const [type] = useState<string>('humid');
  return (
    <View>
      <>
        <Average type={type} />
      </>
    </View>
  );
}
