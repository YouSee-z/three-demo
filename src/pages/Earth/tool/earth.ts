// 引入three.js
import * as THREE from 'three';
import { EarthRadius } from './static';
// import {countryLine} from './line.js'
import Sprite from './Sprite.js';

// var R = config.R;//地球半径

// r：地球半径
function createSphereMesh(r) {
  // TextureLoader创建一个纹理加载器对象，可以加载图片作为纹理贴图
  let textureLoader = new THREE.TextureLoader();
  let texture = textureLoader.load('./earth.png'); //加载纹理贴图
  // var geometry = new THREE.SphereBufferGeometry(r, 40, 40); //创建一个球体几何对象
  let geometry = new THREE.SphereGeometry(r, 40, 40);
  //材质对象Material
  // MeshLambertMaterial  MeshBasicMaterial
  let material = new THREE.MeshLambertMaterial({
    // color: 0x00ffff,
    map: texture, //设置地球颜色贴图map
    // transparent:true,
    // opacity:0.5,//半透明效果
  });
  let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  return mesh;
}

const earth = new THREE.Group(); //地球组对象
earth.add(Sprite); //地球光圈
earth.add(createSphereMesh(EarthRadius)); //球体Mesh插入earthGroup中
// R * 1.001比地球R稍大，以免深度冲突
// earth.add(countryLine(EarthRadius* 1.001));//国家边界集合插入earthGroup中

export { earth };
