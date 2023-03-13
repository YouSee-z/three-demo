// 引入three.js
import * as THREE from 'three';
import { EarthRadius } from './static';
const R = EarthRadius;
import irisDiaphragm from '../../../assets/Earth/地球光圈.png';
// import config from '../config.js'
// var R = config.R;//地球半径
// 纹理贴图
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(irisDiaphragm); //加载纹理贴图
// 创建精灵材质对象SpriteMaterial
const spriteMaterial = new THREE.SpriteMaterial({
  map: texture, //设置精灵纹理贴图
  transparent: true, //开启透明
  opacity: 0.5, //可以通过透明度整体调节光圈
});
// 创建表示地球光圈的精灵模型
const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(R * 3.0, R * 3.0, 1); //适当缩放精灵
sprite.scale.set(R * 4.0, R * 4.0, 1); //光圈相比较地球偏大

export { sprite };
