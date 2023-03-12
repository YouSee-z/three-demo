// // camera.position.set(200, 300, 200); //相机在Three.js坐标系中的位置
// camera.position.set(-209, 179, -301); //浏览器控制台选择一个相机视角
// camera.lookAt(0, 0, 0); //相机指向Three.js坐标系原点
// /**
import * as THREE from 'three';
import { Camera } from 'three';

class earthCamera {
  private size = 200;
  private scale: number;
  public camera: Camera;
  constructor(width: number, height: number) {
    this.scale = width / height;
    const cameras = new THREE.OrthographicCamera(
      -this.size * this.scale,
      this.size * this.scale,
      this.size,
      -this.size,
      1,
      1000,
    );
    cameras.position.set(-209, 179, -301); //浏览器控制台选择一个相机视角
    cameras.lookAt(0, 0, 0); //相机指向Three.js坐标系原点
    this.camera = cameras;
  }
}

export { earthCamera };
