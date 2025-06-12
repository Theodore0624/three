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
const geometryPlane = new THREE.BufferGeometry();

const material0 = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});
const material1 = new THREE.MeshBasicMaterial({
  color: 'orange',
});

const vertices2 = new Float32Array([
  -1, -1, 0, 1, -1, 0, 1, 1, 0,-1,1,0
])
geometryPlane.setAttribute("position", new THREE.BufferAttribute(vertices2, 3))

const indexs = new Uint16Array([0, 1, 2, 2, 3, 0])
geometryPlane.setIndex(new THREE.BufferAttribute(indexs, 1))

// 设置两个面 2种材质————从0个索引开始 每个面3个顶点 用第0个材质
geometryPlane.addGroup(0,3,0)
geometryPlane.addGroup(3,3,1)

// 将两种材质放到实体上
const cubePlane = new THREE.Mesh(geometryPlane, [material0,material1]);
scene.add(cubePlane);

// 体材质
const geometryBox = new THREE.BoxGeometry(1,1,1);
const cubeBox = new THREE.Mesh(geometryBox, [material0,material1,material0,material1,material0,material1]);
cubeBox.position.set(3,3,3)
scene.add(cubeBox);



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
