import {DrawerScreenProps} from '@react-navigation/drawer';

export type RootDrawerParamList = {
  Home: {
    temperature: number;
    co2: number;
    humidity: number;
    realtemp: number;
    realhumid: number;
  };
  온도: undefined;
  습도: undefined;
  종합공기질: undefined;
};

type Home_Props = DrawerScreenProps<RootDrawerParamList, 'Home'>;

export type HomeNavigationProp = Home_Props['navigation'];

export type HomeRouteProp = Home_Props['route'];

export type navProps = {
  time: string[];
  value: number[];
  selected: number;
};

export interface TempHumid {
  temperature: number;
  humidity: number;
  realtemp: number;
  realhumid: number;
}

export interface RouteParams extends TempHumid {
  co2: number;
}

export interface ScreenParams {
  type: string;
}

export type Home_Screen_Props = {
  navigation: HomeNavigationProp;
  route: HomeRouteProp;
};
