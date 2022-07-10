/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-sequences */
/* eslint-disable radix */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import {Button, Platform} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from './src/component/pages/home';
import TemperatureScreen from './src/component/pages/temperature_screen';
import AirQCScreen from './src/component/pages/airQC_screen';
import HumidityScreen from './src/component/pages/humidity_screen';
import {LoadingScreen} from './src/component/pages/loading';
import {dfs_xy_conv} from './src/utils/grid';
import {getForecastAPI} from './src/api/forecast';
import {Forecast, Grid} from './src/types/server/publicAPITypes';
import {Sensor} from './src/types/server/serverAPITypes';
import {
  RootDrawerParamList,
  HomeNavigationProp,
} from './src/types/navigation/navigationTypes';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function App() {
  const [co2, setCO2] = useState<number>(0);
  const [temperature, setTemperature] = useState<number>(0);
  const [humidity, setHumidity] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [public_loading, setPublic_loading] = useState<boolean>(false);
  const [realtemp, setRealtemp] = useState<number>(0);
  const [realhumid, setRealHumid] = useState<number>(0);
  const [latitude, setLatitude] = useState<number | null>();
  const [longitude, setLongitude] = useState<number | null>();
  //const route = useRoute<HomeScreenRouteProp>();

  useEffect(() => {
    SplashScreen.hide();
    requestPermission().then(result => {
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          pos => {
            setLatitude(pos.coords.latitude);
            setLongitude(pos.coords.longitude);
            const rs: Grid = dfs_xy_conv(
              'toXY',
              latitude as number,
              longitude as number,
            );
            // setRealdata(rs.x, rs.y); for Device only
            setRealdata(57, 121); // for emulator
          },
          error => {
            console.error(error);
          },
        );
      }
    });
    getsensorAPI();
  });

  const setRealdata = async (nx: number, ny: number): Promise<void> => {
    const query: string = getForecastAPI(nx, ny);
    const url: string =
      'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?' +
      query;
    try {
      const response: Forecast = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json());
      if (response.response.header.resultCode === '00') {
        return setLiveData(response), setPublic_loading(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function requestPermission(): Promise<
    Geolocation.AuthorizationResult | undefined
  > {
    try {
      if (Platform.OS === 'ios') {
        return await Geolocation.requestAuthorization('always');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getsensorAPI = async (): Promise<void> => {
    try {
      const response = await fetch(
        'http://3.35.57.189:8080/Home-Sensor/sensor',
      );
      const json: Sensor = await response.json();
      return setValue(json), setLoading(true);
    } catch (error) {
      console.error(error);
    }
  };

  const setValue = (data: Sensor): void => {
    setTemperature(data.Temperature);
    setCO2(data.CO2);
    setHumidity(data.Humidity);
  };

  const setLiveData = (data: Forecast): void => {
    setRealtemp(parseInt(data.response.body.items.item[3].obsrValue));
    setRealHumid(parseInt(data.response.body.items.item[1].obsrValue));
  };

  const HeaderRight = () => {
    const navigation = useNavigation<HomeNavigationProp>();
    return (
      <Button
        title="새로고침"
        onPress={() => {
          navigation.setParams({
            temperature: temperature,
            co2: co2,
            humidity: humidity,
            realtemp: realtemp,
            realhumid: realhumid,
          });
        }}
      />
    );
  };

  if (loading !== false && public_loading !== false) {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          useLegacyImplementation={true}
          initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            initialParams={{
              temperature: temperature,
              co2: co2,
              humidity: humidity,
              realtemp: realtemp,
              realhumid: realhumid,
            }}
            options={({}) => ({
              headerRight: ({}) => <HeaderRight />,
            })}
          />
          <Drawer.Screen name="온도" component={TemperatureScreen} />
          <Drawer.Screen name="습도" component={HumidityScreen} />
          <Drawer.Screen name="종합공기질" component={AirQCScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return <LoadingScreen />;
  }
}
