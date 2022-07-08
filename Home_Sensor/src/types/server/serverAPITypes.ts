export interface Sensor {
  code: number;
  CO2: number;
  Temperature: number;
  Humidity: number;
}

export interface Data {
  data: ValueArray[];
}

interface ValueArray {
  Time: string;
  Value: number;
}
