import React, {useState, useEffect, ReactElement} from 'react';
import {StyleSheet, View} from 'react-native';
import {ChartView} from '../atoms/chart_view';
import {Picker} from '@react-native-picker/picker';
import {Data} from '../../../types/server/serverAPITypes';

export const TempAverage = (): ReactElement => {
  const [selected, setSelected] = useState<number>(12);
  const [time, setTime] = useState<string[]>(['']);
  const [value, setValue] = useState<number[]>([0]);

  useEffect(() => {
    getTempDataAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTempDataAPI = async (): Promise<void> => {
    try {
      const data: Data = await fetch(
        'http://3.35.57.189:8080/Home-Sensor/temperature/get-data',
      ).then(res => res.json());
      return getTimeAndValue(data);
    } catch {
      console.log('error');
    }
  };

  const getTimeAndValue = (data: Data): void => {
    data.data.map(item => setTime(prev => [...prev, item.Time]));
    data.data.map(item => setValue(prev => [...prev, item.Value]));
  };

  return (
    <View style={styles.container}>
      <ChartView time={time} value={value} selected={selected} />
      <>
        <Picker
          selectedValue={selected}
          onValueChange={item => {
            setSelected(item);
          }}>
          <Picker.Item label="1시간" value={6} />
          <Picker.Item label="2시간" value={12} />
          <Picker.Item label="6시간" value={36} />
        </Picker>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  picker: {
    alignContent: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
});
