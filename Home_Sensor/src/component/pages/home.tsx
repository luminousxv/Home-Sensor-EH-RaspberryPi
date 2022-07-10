import React, {ReactElement} from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {TempView} from '../UI/atoms/temp_view';
import {AirQCView} from '../UI/atoms/airQC_view';
import {
  Home_Screen_Props,
  RouteParams,
} from '../../types/navigation/navigationTypes';

export default function HomeScreen({
  navigation,
  route,
}: Home_Screen_Props): ReactElement {
  const {temperature, co2, humidity, realtemp, realhumid}: RouteParams =
    route.params;
  return (
    <View style={styles.container}>
      <View style={styles.tempcontainer}>
        <>
          <TempView
            temperature={temperature}
            humidity={humidity}
            realtemp={realtemp}
            realhumid={realhumid}
          />
        </>
        <View style={styles.buttonview}>
          <TouchableOpacity
            style={styles.buttonview}
            onPress={() => navigation.navigate('온도')}>
            <Text style={styles.textstyle}> 온도 통계치</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonview}
            onPress={() => navigation.navigate('습도')}>
            <Text style={styles.textstyle}> 습도 통계치</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.co2container}>
        <>
          <AirQCView co2={co2} />
        </>
        <View style={styles.buttonview}>
          <TouchableOpacity
            style={styles.buttonview}
            onPress={() => navigation.navigate('종합공기질')}>
            <Text style={styles.textstyle}>통계치</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  buttonview: {
    //marginTop: 10,
    // flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  tempcontainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  co2container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  textstyle: {
    fontSize: 20,
  },
});
