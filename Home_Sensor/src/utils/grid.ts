// 소스출처 : http://www.kma.go.kr/weather/forecast/digital_forecast.jsp  내부에 있음
//<!--
//
// LCC DFS 좌표변환을 위한 기초 자료

import {Grid} from '../types/server/publicAPITypes';

const RE = 6371.00877; // 지구 반경(km)
const GRID = 5.0; // 격자 간격(km)
const SLAT1 = 30.0; // 투영 위도1(degree)
const SLAT2 = 60.0; // 투영 위도2(degree)
const OLON = 126.0; // 기준점 경도(degree)
const OLAT = 38.0; // 기준점 위도(degree)
const XO = 43; // 기준점 X좌표(GRID)
const YO = 136; // 기1준점 Y좌표(GRID)
//
// LCC DFS 좌표변환 ( code : "toXY"(위경도->좌표, v1:위도, v2:경도), "toLL"(좌표->위경도,v1:x, v2:y) )
//

export function dfs_xy_conv(code: string, v1: number, v2: number): Grid {
  const DEGRAD: number = Math.PI / 180.0;
  const RADDEG: number = 180.0 / Math.PI;

  const re: number = RE / GRID;
  const slat1: number = SLAT1 * DEGRAD;
  const slat2: number = SLAT2 * DEGRAD;
  const olon: number = OLON * DEGRAD;
  const olat: number = OLAT * DEGRAD;

  let theta: number = 0;

  let sn: number =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
    Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);

  let sf: number = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;

  let ro: number = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);

  let rs: Grid = {
    lat: 0,
    lng: 0,
    x: 0,
    y: 0,
  };

  if (code === 'toXY') {
    rs.lat = v1;
    rs.lng = v2;

    let ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
    ra = (re * sf) / Math.pow(ra, sn);

    theta = v2 * DEGRAD - olon;

    if (theta > Math.PI) {
      theta -= 2.0 * Math.PI;
    }
    if (theta < -Math.PI) {
      theta += 2.0 * Math.PI;
    }
    theta *= sn;
    rs.x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    rs.y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
  } else {
    rs.x = v1;
    rs.y = v2;

    let xn: number = v1 - XO;
    let yn: number = ro - v2 + YO;
    let ra: number = Math.sqrt(xn * xn + yn * yn);

    if (sn < 0.0) {
      -ra;
    }
    let alat: number = Math.pow((re * sf) / ra, 1.0 / sn);
    alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

    if (Math.abs(xn) <= 0.0) {
      theta = 0.0;
    } else {
      if (Math.abs(yn) <= 0.0) {
        theta = Math.PI * 0.5;
        if (xn < 0.0) {
          -theta;
        }
      } else {
        theta = Math.atan2(xn, yn);
      }
    }
    let alon = theta / sn + olon;
    rs.lat = alat * RADDEG;
    rs.lng = alon * RADDEG;
  }
  return rs;
}
//-->
