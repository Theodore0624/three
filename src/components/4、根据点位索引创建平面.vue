<script setup>
import * as THREE from "three";
// 轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
  45, //视角
  window.innerWidth / window.innerHeight, //宽高比
  0.1, //进平面
  1000 //远平面
);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

// 设置相机位置
camera.position.z = 5;
camera.position.y = 5;
camera.position.x = 5;

camera.lookAt(3, 0, 0);

// 渲染函数
function animate() {
  requestAnimationFrame(animate);
  controls.update()
  // 渲染
  renderer.render(scene, camera);
}
animate();



// 根据点位创建平面
const geometry = new THREE.BufferGeometry();
// // 创建顶点数据 三个一组xyz 
// const vertices = new Float32Array([
//   -1,-1,0,1,-1,0,1,1,0,
//   1,1,0,-1,1,0,-1,-1,0
// ])
// // 创建顶点属性
// geometry.setAttribute("position",new THREE.BufferAttribute(vertices,3))



// 根据索引创建平面
const vertices2 = new Float32Array([
  -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0
])
geometry.setAttribute("position", new THREE.BufferAttribute(vertices2, 3))

// 创建索引
const indexs = new Uint16Array([0, 1, 2, 2, 3, 0])
geometry.setIndex(new THREE.BufferAttribute(indexs, 1))

const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide,  //vertices逆时针排序是正面 顺时针排序是反面 添加这行就两面都能看到
  wireframe: true
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

</script>

<template>
  <div></div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

body {
  width: 100%;
  height: 100%;

}

canvas {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
