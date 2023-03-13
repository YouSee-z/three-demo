// // 引入Three.js
// import * as THREE from 'three';
// // 引入Three.js扩展库
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { earth } from './earth/index.js'//绘制地球
// import { flyArcGroup, flyArr, WaveMeshArr, ConeMesh } from './fly/index.js'//绘制轨迹线、飞线、波动光圈
// /**
//  * 创建场景对象Scene
//  */
// const scene = new THREE.Scene();
// const textureLoader = new THREE.TextureLoader();
// scene.background=textureLoader.load('./back1.jpg');

// earth.add(flyArcGroup);
// scene.add(earth);
// /**
// * 光源设置
// */
// // 平行光1
// var directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
// directionalLight.position.set(400, 200, 300);
// scene.add(directionalLight);
// // 平行光2
// var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
// directionalLight2.position.set(-400, -200, -300);
// scene.add(directionalLight2);
// //环境光
// var ambient = new THREE.AmbientLight(0xffffff, 0.6);
// scene.add(ambient);

// // width和height用来设置Three.js输出Canvas画布尺寸，同时用来辅助设置相机渲染范围
// var width = window.innerWidth; //窗口文档显示区的宽度
// var height = window.innerHeight; //窗口文档显示区的高度
// /**
// * 相机设置
// */
// var k = width / height; //Three.js输出的Cnavas画布宽高比
// var s = 200; //控制相机渲染空间左右上下渲染范围，s越大，相机渲染范围越大
// //THREE.OrthographicCamera()创建一个正投影相机对象
// // -s * k, s * k, s, -s, 1, 1000定义了一个长方体渲染空间，渲染空间外的模型不会被渲染
// var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
// // camera.position.set(200, 300, 200); //相机在Three.js坐标系中的位置
// camera.position.set(-209, 179, -301); //浏览器控制台选择一个相机视角
// camera.lookAt(0, 0, 0); //相机指向Three.js坐标系原点
// /**
//  * 创建渲染器对象
//  */
// var renderer = new THREE.WebGLRenderer({
//   antialias: true, //开启锯齿
// });
// renderer.setPixelRatio(window.devicePixelRatio);//设置设备像素比率,防止Canvas画布输出模糊。
// renderer.setSize(width, height); //设置渲染区域尺寸
// // renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
// // renderer.domElement表示Three.js渲染结果,也就是一个HTML元素(Canvas画布)
// // document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

// // 渲染循环
// function render() {
//   // 批量设置所有飞线的运动动画
//   flyArr.forEach((fly) => {
//     fly.rotation.z += 0.02; //调节飞线速度
//     if (fly.rotation.z >= fly.flyEndAngle) fly.rotation.z = fly.startAngle;
//   });
//   // 所有波动光圈都有自己的透明度和大小状态
//   // 一个波动光圈透明度变化过程是：0~1~0反复循环
//   if (WaveMeshArr.length) {
//     WaveMeshArr.forEach(function (mesh) {
//       mesh._s += 0.007;
//       mesh.scale.set(mesh.size * mesh._s, mesh.size * mesh._s, mesh.size * mesh._s);
//       if (mesh._s <= 1.5) {
//         mesh.material.opacity = (mesh._s - 1) * 2;//2等于1/(1.5-1.0)，保证透明度在0~1之间变化
//       } else if (mesh._s > 1.5 && mesh._s <= 2) {
//         mesh.material.opacity = 1 - (mesh._s - 1.5) * 2;//2等于1/(2.0-1.5) mesh缩放2倍对应0 缩放1.5被对应1
//       } else {
//         mesh._s = 1.0;
//       }
//     })
//   }
//   earth.rotateY(0.001);//地球绕y轴旋转动画
//   ConeMesh.rotateZ(-0.02);//棱锥自转
//   renderer.render(scene, camera); //执行渲染操作
//   requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
//   // console.log(camera.position)
// }
// render();

// // Three.js三维坐标轴 三个坐标轴颜色RGB分别对应xyz轴
// // var axesHelper = new THREE.AxesHelper(250);
// // scene.add(axesHelper);


// //创建控件对象  控件可以监听鼠标的变化，改变相机对象的属性
// // 旋转：拖动鼠标左键
// // 缩放：滚动鼠标中键
// // 平移：拖动鼠标右键
// new OrbitControls(camera, renderer.domElement);




// export { scene, renderer, camera }

