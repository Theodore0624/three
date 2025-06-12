<script setup>
import { threeClass } from '/src/utils/init'
import * as THREE from "three";

const threeBox = new threeClass.init()
let boxGeo = new THREE.BoxGeometry(1, 1, 100)
let material = new THREE.MeshBasicMaterial({
  color: 'orange'
})

// 创建场景雾(根据相机距离算)
threeBox.scene.fog = new THREE.Fog('grey', 0.1, 50)
// 设置场景背景颜色 和雾统一
threeBox.scene.background = new THREE.Color('grey')

let box = new THREE.Mesh(boxGeo, material)
threeBox.scene.add(box)
threeBox.animate()

</script>

<template>
  <div>
    <!-- <button @click="clickAll" class="btn">点击全屏</button> -->
  </div>
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

.btn {
  position: fixed;
}
</style>
