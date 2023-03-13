
import { useEffect, useRef } from 'react';
import styles from './index.less';

const HomePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    if (!canvasRef.current) return
    

  }, [canvasRef])

  return (

    <div className={styles.container}>
      <canvas ref={canvasRef}></canvas>
    </div>

  );
};

export default HomePage;
