import { useEffect, useRef } from "react";
import { Color, Group, HemisphereLight, MathUtils, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import SectorMesh from "./SectorMesh";

import { AngleAndRatio, PieData, Pie3DProps } from "./index.d"
import styles from "./index.less"

const getAngleAndRatio = (items: { value: number }[]) => {
    const result: AngleAndRatio[] = []
    const total = items.reduce((acc, cur) => acc + cur.value, 0)
    let startAngle = 0
    items.forEach((item, index) => {
        const ratio = item.value / total
        const angle = MathUtils.degToRad(ratio * 360)
        result.push({
            angle,
            ratio,
            startAngle,
            endAngle: startAngle + angle
        })
        startAngle += angle
    })
    return result
}

const Pie3D: React.FC<Pie3DProps> = ({ data, radius, height }) => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        if (canvasRef.current === null) return
        if (data.length <= 1) return //若饼图只有 1 个项目，则不绘制

        const sectorRadius = radius ? radius : 1 //饼图半径，若未指定半径，则默认为 1
        const maxHeight = height ? height : 1 //饼图最大高度，若未指定高度，则默认为 1

        const allAngleAndRatio = getAngleAndRatio(data) //获取饼状图各项的角度和占比

        const sectorGroup = new Group() //创建扇形网格组
        let singleMaxHeight = 0 //用于记录单个扇形中的最大高度
        allAngleAndRatio.forEach((item, index) => {
            if (item.ratio === 0) return
            //获取到饼图各个扇形网格
            const currentHeight = item.ratio * maxHeight
            singleMaxHeight = Math.max(singleMaxHeight, currentHeight)
            const sectorMesh = new SectorMesh(sectorRadius, currentHeight, 32, 1, false, item.startAngle, item.endAngle - item.startAngle, new Color(data[index].color))
            sectorGroup.add(sectorMesh)
        })

        //有个各个扇形的高度并不相同，因此需要调整扇形的位置(y值)，以便它们底部对齐
        sectorGroup.children.forEach((item) => {
            item.position.y = ((item as SectorMesh).height - singleMaxHeight) / 2
        })

        //整体修改(提高)饼图在场景中的 y 坐标，以便确保饼图(的底部)在场景中的位置相对固定
        sectorGroup.children.forEach((item) => {
            item.position.y += singleMaxHeight / 2
        })

        //开始添加 Three.js 相关代码
        const canvas = canvasRef.current

        const renderer = new WebGLRenderer({ canvas, antialias: true })
        const scene = new Scene()
        scene.background = new Color(0x666666)
        const camera = new PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000)
        camera.position.set(0, 1, 2)

        const light = new HemisphereLight(0x999999, 0x333333, 2)
        scene.add(light)

        const light2 = new PointLight(0xffffff, 2, 100)
        light2.position.set(0, 2, 0)
        scene.add(light2)

        scene.add(sectorGroup)

        const controls = new OrbitControls(camera, canvas)
        controls.update()

        const handleResize = () => {
            const width = canvas.clientWidth
            const height = canvas.clientHeight
            camera.aspect = width / height

            camera.updateProjectionMatrix()
            renderer.setSize(width, height, false)
        }
        handleResize()

        const render = () => {
            renderer.render(scene, camera)
            window.requestAnimationFrame(render)
        }
        window.requestAnimationFrame(render)

        return () => {
            //
        }

    }, [canvasRef, data, radius, height])

    return (
        <canvas ref={canvasRef} className={styles.canvas} />
    )
}

export default Pie3D
