import { useRef, useEffect } from 'react';
import styles from './index.less';
import { WebGLRenderer, Scene, Color, PerspectiveCamera } from 'three';

const ParticleEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current === null) return;

    //开始添加 Three.js 相关代码
    const canvas = canvasRef.current;

    const renderer = new WebGLRenderer({ canvas, antialias: true });
    const scene = new Scene();
    scene.background = new Color(0x666666);
    const camera = new PerspectiveCamera(
      75,
      canvas.width / canvas.height,
      0.1,
      1000,
    );

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
