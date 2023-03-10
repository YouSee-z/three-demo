import * as THREE from "three"
const scene = new THREE.Scene();
class Room {
    private name
    constructor(
        name: any,
        roomIndex: any,
        textureUrl: any,
        position = new THREE.Vector3(0, 0, 0),
        euler = new THREE.Euler(0, 0, 0)
    ) {
        this.name = name;
        // 添加立方体
        const geometry = new THREE.BoxGeometry(10, 10, 10);
        geometry.scale(1, 1, -1);
        // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        // const cube = new THREE.Mesh(geometry, material);
        // scene.add(cube);

        // 4_b,
        const arr = [
            `${roomIndex}_l`,
            `${roomIndex}_r`,
            `${roomIndex}_u`,
            `${roomIndex}_d`,
            `${roomIndex}_b`,
            `${roomIndex}_f`,
        ];
        const boxMaterials: any[] | undefined = [];

        arr.forEach((item) => {
            // 纹理加载
            let texture = new THREE.TextureLoader().load(`${textureUrl}/${item}.jpg`);
            // 创建材质
            if (item === `${roomIndex}_u` || item === `${roomIndex}_d`) {
                texture.rotation = Math.PI;
                texture.center = new THREE.Vector2(0.5, 0.5);
                boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }));
            } else {
                boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }));
            }
        });
        const cube = new THREE.Mesh(geometry, boxMaterials);
        cube.position.copy(position);
        cube.rotation.copy(euler);
        // cube.geometry.scale(1, 1, -1);
        scene.add(cube);

        THREE.DefaultLoadingManager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
            progress.value = new Number((loaded / total) * 100).toFixed(2);
        };
    }
}

export { Room }