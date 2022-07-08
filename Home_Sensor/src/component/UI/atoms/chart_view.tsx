import React, {ReactElement} from 'react';
import {View, Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
import {LineChart} from 'react-native-chart-kit';
import {navProps} from '../../../types/navigation/navigationTypes';

export const ChartView = ({time, value, selected}: navProps): ReactElement => {
  const xAxis = (): number[] => {
    if (selected === 36) {
      return [
        0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36,
      ];
    } else {
      return [selected];
    }
  };
  const xArray = xAxis();
  return (
    <View>
      <LineChart
        data={{
          labels: [
            ...time
              .slice(0, selected + 1)
              .map(item => sliceString(item))
              .reverse(),
          ],
          datasets: [
            {
              data: [...value.slice(0, selected + 1).reverse()],
            },
          ],
        }}
        width={screenWidth} // from react-native
        height={500}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={2} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#0099FF',
          backgroundGradientFrom: '#00CCDB',
          backgroundGradientTo: '#0063D6',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#00CCDB',
          },
        }}
        verticalLabelRotation={70}
        bezier
        hidePointsAtIndex={xArray}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const sliceString = (item: string): string => {
  return item.toString().split('-').join('').substring(9, 18);
};
