import { useEffect, useRef } from 'react';
import styles from './index.less';
import * as THREE from "three"
import { WebGLRenderer } from 'three';
import { earthCamera } from './tool/camera';
import backImg from "../../assets/Earth/back1.jpg"
import { earth } from './tool/earth'//绘制地球
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
    scene.add(earth); //添加地球

    // 平行光1
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(400, 200, 300);
    scene.add(directionalLight);
    // 平行光2
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight2.position.set(-400, -200, -300);
    scene.add(directionalLight2);
    //环境光
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
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

    const render = () => {

      renderer.render(scene, camera)
      window.requestAnimationFrame(render);
    };
    window.requestAnimationFrame(render);
  }, [canvasRef, parentDomRef]);
  return (
    <div className={styles.earth} ref={parentDomRef}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
