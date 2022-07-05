export interface Forecast {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      dataType: string;
      items: {
        item: item[];
      };
    };
  };
}

interface item {
  baseData: string;
  baseTime: string;
  category: string;
  nx: number;
  ny: number;
  obsrValue: string;
}

export interface Params {
  ServiceKey: string;
  pageNo : string;
  numOfRows: string;
  dataType: string;
  base_date: string;
  base_time: string;
  nx: string;
  ny: string;
}

export interface Grid {
  lat: number;
  lng: number;
  x: number;
  y: number;
}

export type ParamList = {[key : number]: Params};