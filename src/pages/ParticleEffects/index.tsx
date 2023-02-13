import { useRef, useEffect } from 'react';
import styles from './index.less';
import {
  WebGLRenderer,
  Scene,
  Color,
  PerspectiveCamera,
  EquirectangularReflectionMapping,
} from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

const ParticleEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current === null) return;

    //开始添加 Three.js 相关代码
    const canvas = canvasRef.current;

    const renderer = new WebGLRenderer({ canvas, antialias: true });
    const scene = new Scene(); //场景
    scene.background = new Color(0x666666);
    const camera = new PerspectiveCamera(
      75,
      canvas.width / canvas.height,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 2);
    // 更新摄像头
    camera.aspect = canvas.width / canvas.height;
    //   更新摄像机的投影矩阵
    camera.updateProjectionMatrix();
    //
    scene.add(camera);

    // 创建纹理加载器对象
    const rgbeLoader = new RGBELoader();

    rgbeLoader.loadAsync('./assets/2k.hdr').then((texture) => {
      texture.mapping = EquirectangularReflectionMapping;
      scene.background = texture;
      scene.environment = texture;
    });

    const handleResize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;

      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    handleResize();

    const render = () => {
      renderer.render(scene, camera);
      window.requestAnimationFrame(render);
    };
    window.requestAnimationFrame(render);

    return () => {
      //
    };
  }, [canvasRef]);
  return <canvas ref={canvasRef} className={styles.canvas} />;
};

export default ParticleEffects;
