import { useEffect, useRef } from 'react';
import styles from './index.less';
import { WebGLRenderer } from 'three';
import { earthCamera } from './tool/camera';

export default function Earth() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    //开始添加 Three.js 相关代码
    const canvas = canvasRef.current;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const camera = new earthCamera(width, height).camera;

    console.log(camera);
    const renderer = new WebGLRenderer({ canvas, antialias: true });

    const handleResize = () => {
      // camera.aspect = width / height;

      // camera.updateProjectionMatrix()
      renderer.setSize(width, height, false);
    };
    handleResize();

    const render = () => {
      // renderer.render(scene, camera)
      window.requestAnimationFrame(render);
    };
    window.requestAnimationFrame(render);
  }, [canvasRef]);
  return (
    <div className={styles.earth}>
      <canvas ref={canvasRef} />
    </div>
  );
}
