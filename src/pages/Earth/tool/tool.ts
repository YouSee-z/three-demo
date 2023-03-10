/**
 * 经纬度坐标转球面坐标
 * @param {地球半径} R
 * @param {经度(角度值)} longitude
 * @param {维度(角度值)} latitude
 */
function getxyzPosition(R: number, longitude: number, latitude: number) {
  const lon = -((longitude * Math.PI) / 180); //转弧度值  // three.js坐标系z坐标轴对应经度-90度，而不是90度
  const lat = (latitude * Math.PI) / 180; //转弧度值
  // lon = -lon;

  // 经纬度坐标转球面坐标计算公式
  const x = R * Math.cos(lat) * Math.cos(lon);
  const y = R * Math.sin(lat);
  const z = R * Math.cos(lat) * Math.sin(lon);
  // 返回球面坐标
  return {
    x: x,
    y: y,
    z: z,
  };
}

export { getxyzPosition };
