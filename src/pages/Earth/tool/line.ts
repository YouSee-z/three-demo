import * as THREE from 'three';

/*绘制一条圆弧飞线
5个参数含义：( 飞线圆弧轨迹半径, 开始角度, 结束角度)*/
function createFlyLine(r: number, startAngle: number, endAngle: number) {
  const geometry = new THREE.BufferGeometry(); //声明一个几何体对象BufferGeometry
  // THREE.ArcCurve创建圆弧曲线
  const arc = new THREE.ArcCurve(0, 0, r, startAngle, endAngle, false);
  //getSpacedPoints是基类Curve的方法，返回一个vector2对象作为元素组成的数组
  const pointsArr = arc.getSpacedPoints(80); //分段数80，返回81个顶点
  geometry.setFromPoints(pointsArr); // setFromPoints方法从pointsArr中提取数据改变几何体的顶点属性vertices
  // 每个顶点对应一个百分比数据attributes.percent 用于控制点的渲染大小
  const percentArr = []; //attributes.percent的数据
  for (let i = 0; i < pointsArr.length; i++) {
    percentArr.push(i / pointsArr.length);
  }
  const percentAttribue = new THREE.BufferAttribute(
    new Float32Array(percentArr),
    1,
  );
  // 通过顶点数据percent点模型从大到小变化，产生小蝌蚪形状飞线
  geometry.attributes.percent = percentAttribue;
  // 批量计算所有顶点颜色数据
  const colorArr = [];
  for (let i = 0; i < pointsArr.length; i++) {
    const color1 = new THREE.Color(0x00aaaa); //轨迹线颜色 青色
    const color2 = new THREE.Color(0xffff00); //黄色
    const color = color1.lerp(color2, i / pointsArr.length);
    colorArr.push(color.r, color.g, color.b);
  }
  // 设置几何体顶点颜色数据
  geometry.attributes.color = new THREE.BufferAttribute(
    new Float32Array(colorArr),
    3,
  );
  // 点模型渲染几何体每个顶点
  const material = new THREE.PointsMaterial({
    // color: 0xffff00,
    size: 3.2, //点大小
    vertexColors: THREE.VertexColors, //使用顶点颜色渲染
  });
  // 修改点材质的着色器源码(注意：不同版本细节可能会稍微会有区别，不过整体思路是一样的)
  material.onBeforeCompile = function (shader) {
    // 顶点着色器中声明一个attribute变量:百分比
    shader.vertexShader = shader.vertexShader.replace(
      'void main() {',
      [
        'attribute float percent;', //顶点大小百分比变量，控制点渲染大小
        'void main() {',
      ].join('\n'), // .join()把数组元素合成字符串
    );
    // 调整点渲染大小计算方式
    shader.vertexShader = shader.vertexShader.replace(
      'gl_PointSize = size;',
      ['gl_PointSize = percent * size;'].join('\n'), // .join()把数组元素合成字符串
    );
  };
  const FlyLine = new THREE.Points(geometry, material);
  // var material = new THREE.LineBasicMaterial({color: 0xffff00,});//线条材质
  // var line = new THREE.Line(geometry, material);//线条模型对象
  return FlyLine;
}

export { createFlyLine };
