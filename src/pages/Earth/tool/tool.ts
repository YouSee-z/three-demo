import * as THREE from 'three';

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

//求三个点的外接圆圆心，p1, p2, p3表示三个点的坐标Vector3。
function threePointCenter(
  p1: { lengthSq: () => any; x: any; y: any },
  p2: { lengthSq: () => any; x: any; y: any },
  p3: { lengthSq: () => any; x: any; y: any },
) {
  const L1 = p1.lengthSq(); //p1到坐标原点距离的平方
  const L2 = p2.lengthSq();
  const L3 = p3.lengthSq();
  const x1 = p1.x,
    y1 = p1.y,
    x2 = p2.x,
    y2 = p2.y,
    x3 = p3.x,
    y3 = p3.y;
  const S = x1 * y2 + x2 * y3 + x3 * y1 - x1 * y3 - x2 * y1 - x3 * y2;
  const x = (L2 * y3 + L1 * y2 + L3 * y1 - L2 * y1 - L3 * y2 - L1 * y3) / S / 2;
  const y = (L3 * x2 + L2 * x1 + L1 * x3 - L1 * x2 - L2 * x3 - L3 * x1) / S / 2;
  // 三点外接圆圆心坐标
  const center = new THREE.Vector3(x, y, 0);
  return center;
}

/*计算球面上两点和球心构成夹角的弧度值
参数point1, point2:表示地球球面上两点坐标Vector3
计算A、B两点和顶点O构成的AOB夹角弧度值*/
function radianAOB(A: any, B: any, O: any) {
  // dir1、dir2：球面上两个点和球心构成的方向向量
  const dir1 = A.clone().sub(O).normalize();
  const dir2 = B.clone().sub(O).normalize();
  //点乘.dot()计算夹角余弦值
  const cosAngle = dir1.clone().dot(dir2);
  const radianAngle = Math.acos(cosAngle); //余弦值转夹角弧度值,通过余弦值可以计算夹角范围是0~180度
  // console.log('夹角度数',THREE.Math.radToDeg(radianAngle));
  return radianAngle;
}


/*绘制一条圆弧曲线模型Line
5个参数含义：(圆心横坐标, 圆心纵坐标, 飞线圆弧轨迹半径, 开始角度, 结束角度)*/
function circleLine(x: number, y: number, r: number, startAngle: number, endAngle: number) {
  // var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
  const geometry = new THREE.BufferGeometry();
  // THREE.ArcCurve创建圆弧曲线
  const arc = new THREE.ArcCurve(x, y, r, startAngle, endAngle, false);
  //getSpacedPoints是基类Curve的方法，返回一个vector2对象作为元素组成的数组
  const points = arc.getSpacedPoints(50); //分段数50，返回51个顶点
  geometry.setFromPoints(points); // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
  const material = new THREE.LineBasicMaterial({ color: 0x009999 }); //线条材质
  const line = new THREE.Line(geometry, material); //线条模型对象
  return line;
}

export { getxyzPosition, threePointCenter, radianAOB,circleLine };
