import * as THREE from 'three';
import { EarthRadius, MockData } from './static';
// import MockData from './MockData.js';
import { flyArc } from './arc';
const R= EarthRadius


import { createPointMesh } from './pointMesh';
import { createWaveMesh } from './waveMesh';
import { createConeMesh } from './coneMesh';
// import config from '../config.js'
// var R = config.R;//地球半径

const flyArcGroup = new THREE.Group();
// 通过轨迹线连接洛阳和世界其它城市的飞线
//批量绘制轨迹线
const flyArr: any[] = []; //所有飞线的集合，用来在渲染循环中设置飞线动画
const WaveMeshArr: any[] = []; //所有波动光圈集合
const startmesh = createPointMesh(R, MockData.start.E, MockData.start.N); //静态圆点平面
flyArcGroup.add(startmesh);
const startWaveMesh = createWaveMesh(R * 1.2, MockData.start.E, MockData.start.N); //波动光圈
flyArcGroup.add(startWaveMesh);
WaveMeshArr.push(startWaveMesh);
const ConeMesh = createConeMesh(R, MockData.start.E, MockData.start.N); //棱锥
flyArcGroup.add(ConeMesh);

MockData.endArr.forEach((coord) => {
  /*调用函数flyArc绘制球面上任意两点之间飞线圆弧轨迹*/
  const arcline = flyArc(MockData.start.E, MockData.start.N, coord.E, coord.N);
  flyArcGroup.add(arcline); //飞线插入flyArcGroup中
  flyArr.push(arcline.flyLine); //获取飞线段

  const mesh = createPointMesh(R, coord.E, coord.N); //静态圆点平面
  flyArcGroup.add(mesh);
  const WaveMesh = createWaveMesh(R, coord.E, coord.N); //波动光圈
  flyArcGroup.add(WaveMesh);
  WaveMeshArr.push(WaveMesh);
});

export { flyArcGroup, flyArr, WaveMeshArr, ConeMesh };
