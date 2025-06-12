<script setup>
import {threeClass} from '/src/utils/init'
import * as THREE from "three";

const threeBox = new threeClass.init()

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'orange' });

const cube = new THREE.Mesh(geometry, material);
const parentCube = new THREE.Mesh(geometry, material);

// cube.position.x = 2 或者
parentCube.position.set(0,0,0)
cube.position.set(3,0,0)
// 子实体是根据父元素的相对位置存在的坐标

// 将子实体添加到父实体
parentCube.add(cube)

// 实体缩放 子元素跟随缩放
parentCube.scale.set(2,2,2)

// 实体旋转(弧度制) 子元素跟随缩放
parentCube.rotation.x = Math.PI/4

threeBox.scene.add(parentCube);


threeBox.scene.add(cube);
threeBox.animate()

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
