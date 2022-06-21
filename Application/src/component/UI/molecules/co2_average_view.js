import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import { ChartView } from './chart_view';
import {Picker} from '@react-native-picker/picker';

export const CO2Average = () => {
    const [selected, setSelected] = useState(12);
    const [time, setTime] = useState([0]);
    const [value, setValue] = useState([0]);

    useEffect(()=> {
        getCO2DataAPI();
    }, []);

    const getCO2DataAPI = async() => {
        try{
            const {data:data} = await fetch('http://3.35.57.189:8080/Home-Sensor/co2/get-data').then(res=>res.json());
            return getTimeAndValue(data);
            
        }
        catch{
            console.log('error');
        }
    }

    const getTimeAndValue =  (data) =>{
        data.map(item =>setTime((prev) =>[...prev,item.Time]))
        data.map(item =>setValue((prev)=> [...prev,item.Value]) )
    }
    return (
        <View style={styles.container} >
            <ChartView time = {time} value = {value} selected = {selected}/>
            <> 
            <Picker
                selectedValue = {selected}
                onValueChange = {(item, idx) => {
                    setSelected(item);
                }
            }>
                <Picker.Item label="1시간" value={6}/>
                <Picker.Item label="2시간" value={12}/>
                <Picker.Item label="6시간" value={36}/>
            </Picker>
            </>
        </View>
    )
}

const styles = StyleSheet.create ({
    container : {
        display: 'flex',
        flexDirection:'column',
    },
    picker : {
        alignContent: 'center',
        justifyContent : 'center',
        paddingBottom: 10,
        paddingTop: 10
    },
})