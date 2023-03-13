import { useEffect, useRef } from 'react';
import styles from './index.less';
import * as THREE from "three"
import { WebGLRenderer } from 'three';
import { earthCamera } from './tool/camera';
import backImg from "../../assets/Earth/back1.jpg"
import { earth } from './tool/earth'//绘制地球
import { flyArr,WaveMeshArr,ConeMesh ,flyArcGroup} from './tool/fly';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import {flyArcGroup} from "./tool/"
// import { }

export default function Earth() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parentDomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    //开始添加 Three.js 相关代码
    const canvas = canvasRef.current;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const camera = new earthCamera(width, height).camera;
    const scene = new THREE.Scene();  // 场景
    const textureLoader = new THREE.TextureLoader();  // 纹理
    scene.background = textureLoader.load(backImg);
    earth.add(flyArcGroup);
    scene.add(earth); //添加地球

    // 平行光1
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(400, 200, 300);
    scene.add(directionalLight);
    // 平行光2
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight2.position.set(-400, -200, -300);
    scene.add(directionalLight2);
    //环境光
    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);
    const devicePixelRatio = window.devicePixelRatio // 像素比


    console.log(camera);
    const renderer = new WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(devicePixelRatio);//设置设备像素比率,防止Canvas画布输出模糊。
    renderer.setSize(width, height); //设置渲染区域尺寸
    earth.rotateY(0.001);//地球绕y轴旋转动画

    const handleResize = () => {
      const width = canvas.clientWidth ;
      const height = canvas.clientHeight ;
      // camera.aspect = width / height;

      // camera.updateProjectionMatrix()
      renderer.setSize(width, height, false);
    };
    handleResize();
    const earthRender = () => {
      flyArr.forEach((fly) => {
        fly.rotation.z += 0.02; //调节飞线速度
        if (fly.rotation.z >= fly.flyEndAngle) fly.rotation.z = fly.startAngle;
      });
      // 所有波动光圈都有自己的透明度和大小状态
      // 一个波动光圈透明度变化过程是：0~1~0反复循环
      if (WaveMeshArr.length) {
        WaveMeshArr.forEach(function (mesh) {
          mesh._s += 0.007;
          mesh.scale.set(mesh.size * mesh._s, mesh.size * mesh._s, mesh.size * mesh._s);
          if (mesh._s <= 1.5) {
            mesh.material.opacity = (mesh._s - 1) * 2;//2等于1/(1.5-1.0)，保证透明度在0~1之间变化
          } else if (mesh._s > 1.5 && mesh._s <= 2) {
            mesh.material.opacity = 1 - (mesh._s - 1.5) * 2;//2等于1/(2.0-1.5) mesh缩放2倍对应0 缩放1.5被对应1
          } else {
            mesh._s = 1.0;
          }
        })
      }
      earth.rotateY(0.002); //地球绕y轴旋转动画
      ConeMesh.rotateZ(-0.02); //棱锥自转
      renderer.render(scene, camera); //执行渲染操作
      // requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
      window.requestAnimationFrame(earthRender)
    }
    earthRender() 
    const render = () => {
      // earthRender()
      renderer.render(scene, camera)
      window.requestAnimationFrame(render);
      // window.requestAnimationFrame(earthRender)
    };
    window.requestAnimationFrame(render);

    new OrbitControls(camera, renderer.domElement);

  }, [canvasRef, parentDomRef]);
  return (
    <div className={styles.earth} ref={parentDomRef}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
