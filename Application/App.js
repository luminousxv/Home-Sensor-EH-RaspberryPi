/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import {Button, Platform} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from './src/component/pages/home';
import TemperatureScreen from './src/component/pages/temperature_screen';
import CO2Screen from './src/component/pages/CO2';
import HumidityScreen from './src/component/pages/humidity_screen';
import { LoadingScreen } from './src/component/pages/loading';
import { dfs_xy_conv } from './src/utils/grid';
import { getForecastAPI } from './src/api/forecast';


const Drawer = createDrawerNavigator();

export default function App() {
  const [co2, setCO2] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [public_loading, setPublic_loading] = useState(false);
  const [realtemp, setRealtemp] = useState(0);
  const [realhumid, setRealHumid] = useState(0);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    SplashScreen.hide();
    requestPermission().then(result => {
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          pos => {
            setLatitude(pos.coords.latitude);
            setLongitude(pos.coords.longitude);
            const rs = dfs_xy_conv("toXY", latitude, longitude);
            setRealdata(57, 121);
          },
          error => {
            console.error(error);
          }
        )
      }
    });
    getsensorAPI();
  }, [co2, temperature, humidity, realhumid, realtemp, latitude, longitude]);

  const setRealdata = async(nx, ny) => {
    const query = getForecastAPI(nx, ny);
    const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?' + query;
    try{
      const response = await fetch(url, {
        headers : {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      if (response.response.header.resultCode === "00"){
        return (
          setLiveData(response),
          setPublic_loading(true)
        )
      }
    }
    catch(error){
      console.error(error);
    }
  }

  async function requestPermission () {
    try {
      if (Platform.OS === 'ios') {
        return await Geolocation.requestAuthorization('always');
      }
    }
    catch{
      console.error(error);
    }
  }

  const getsensorAPI = async () => {
    try {
        const response = await fetch('http://3.35.57.189:8080/Home-Sensor/sensor');
        const json = await response.json();
        return (
          setValue(json),
          setLoading(true)
        );
    }
    catch{
        console.error(error);
    }
  }

  const setValue = (data) => {
    setTemperature(data.Temperature);
    setCO2(data.CO2);
    setHumidity(data.Humidity);
  }
  
  const setLiveData = (data) => {
    setRealtemp(data.response.body.items.item[3].obsrValue);
    setRealHumid(data.response.body.items.item[1].obsrValue);
  }

  const HeaderRight = () => {
    const navigation = useNavigation();
    return (
      <Button
          title='새로고침'
          onPress={() => {
            navigation.setParams({
              temperature : temperature,
              co2 : co2,
              humidity: humidity,
              realtemp : realtemp,
              realhumid: realhumid
            })
        }}
      />
    )
  }

  if (loading != false && public_loading != false) {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName = "Home"
        >
          <Drawer.Screen 
            name = "Home" 
            component={HomeScreen}
            initialParams = {{
              temperature : temperature,
              co2 : co2,
              humidity: humidity,
              realtemp : realtemp,
              realhumid: realhumid
            }}
            options={({}) => ({
              headerRight : ({}) => <HeaderRight/>,
            })}
            />
          <Drawer.Screen name = "온도" component={TemperatureScreen}/>
          <Drawer.Screen name = "습도" component={HumidityScreen}/>
          <Drawer.Screen name = "종합 공기질" component={CO2Screen}/>
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }else{
    return(
      <LoadingScreen/>
    )
  }
}


