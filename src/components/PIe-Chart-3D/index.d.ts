export interface PieItemData {
    name: string,
    value: number,
    color: string
}

export type PieData = PieItemData[]

export interface Pie3DProps {
    data: PieData,
    radius?: number,
    height?: number
}

//获取饼图各项的数据：角度大小、起始角度、结束角度、占比(取值范围 0-1)
export interface AngleAndRatio {
    angle: number,
    ratio: number,
    startAngle: number,
    endAngle: number
}