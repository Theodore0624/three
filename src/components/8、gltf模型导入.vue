<script setup>
import {threeClass} from '/src/utils/init'
import * as THREE from "three";
import { RGBELoader } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const threeBox = new threeClass.init()
threeBox.scene.background = new THREE.Color('grey')

// 加载模型
const gltfLoader = new GLTFLoader()
gltfLoader.load(
  "./gltf/duck/scene.gltf",
  (gltf)=>{
    threeBox.scene.add(gltf.scene)
    
  }
)

gltfLoader.load(
  "./gltf/build/scene.gltf",
  (gltf)=>{
    threeBox.scene.add(gltf.scene)
    
  }
)

// 加载环境贴图
const rgbe = new RGBELoader()
rgbe.load("./img/hdr.hdr",(envMap)=>{
  threeBox.scene.environment = envMap
  // 将环境贴图的光照射到模型上显色
  envMap.mapping = THREE.EquirectangularReflectionMapping
})
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
.btn{
  position: fixed;
}
</style>
