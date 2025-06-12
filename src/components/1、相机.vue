<script setup>
import * as THREE from "three";
// 轨道控制器
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

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

// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 创建实体
const cube = new THREE.Mesh(geometry, material);

// 将实体添加到场景
scene.add(cube);

// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 添加轨道控制器
const controls = new OrbitControls(camera,renderer.domElement)
// 添加阻尼惯性
controls.enableDamping = true
// 设置阻尼系数
controls.dampingFactor = 0.08
// 自动旋转
controls.autoRotate = true


// 设置相机位置
camera.position.z = 5;
camera.position.y = 5;
camera.position.x = 5;

camera.lookAt(3, 0, 0);

// 渲染函数
function animate() {
  requestAnimationFrame(animate);
  controls.update()
  // 旋转
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // 渲染
  renderer.render(scene, camera);
}
animate();
</script>

<template>
  <div></div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
body{
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
