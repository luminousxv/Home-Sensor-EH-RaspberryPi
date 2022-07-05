import {
  DrawerScreenProps,
} from "@react-navigation/drawer";

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

export type Props = DrawerScreenProps<RootDrawerParamList, "Home">;

export type HomeScreenNavigationProp = Props['navigation'];

export type HomeScreenRouteProp = Props['route'];
