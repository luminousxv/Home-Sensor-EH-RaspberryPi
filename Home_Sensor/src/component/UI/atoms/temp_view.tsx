import React, {ReactElement} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TempHumid} from '../../../types/navigation/navigationTypes';

export const TempView = ({
  temperature,
  humidity,
  realtemp,
  realhumid,
}: TempHumid): ReactElement => {
  return (
    <View style={styles.temptextcontainer}>
      <Text style={styles.sensorTitle}>온/습도</Text>
      <Text style={styles.temptext}>측정 온도: {temperature}°C</Text>
      <Text style={styles.humidtext}>측정 습도: {humidity}%</Text>
      <Text style={styles.humidtext}>현재 온도 : {realtemp}°C</Text>
      <Text style={styles.humidtext}>현재 습도 : {realhumid}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  temptextcontainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  sensorTitle: {
    height: '40%',
    fontSize: 30,
    fontWeight: 'bold',
  },
  humidtext: {
    fontSize: 30,
    fontWeight: 'normal',
  },
  temptext: {
    fontSize: 30,
    fontWeight: 'normal',
  },
});
