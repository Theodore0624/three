<script setup>
import {threeClass} from '/src/utils/init'
import * as THREE from "three";
// 环境图hdr加载器
import { RGBELoader } from 'three/examples/jsm/Addons.js';

const threeBox = new threeClass.init()
let planeGeo = new THREE.PlaneGeometry(1,1)

// 创建纹理加载器
let textureLoader = new THREE.TextureLoader()
// 加载纹理（底图）
let texture = textureLoader.load("./img/tietu2.jpg")
// 加载ao贴图(叠加)
let aoMap = textureLoader.load("./img/tietu3.jpg")
// 透明度贴图（白色部分显示 黑色不显示）
let alphaMap = textureLoader.load("./img/透明度.jpg")
// 光照贴图（在反光的基础上 叠加反光的颜色）
let lightMap = textureLoader.load("./img/光照贴图.jpg")

let material = new THREE.MeshBasicMaterial({
    color:'white',
    side:THREE.DoubleSide,
    map:texture,    //贴图
    transparent:true,   //允许透明
    aoMap:aoMap,    //ao贴图
    aoMapIntensity:1,   //ao贴图强度
    alphaMap:alphaMap,
    lightMap:lightMap,//光照贴图
    reflectivity:1, //环境贴图反光强度
})
const plane = new THREE.Mesh(planeGeo,material)


// 实例hdr加载器
let rgbeLoader = new RGBELoader()
rgbeLoader.load("./img/hdr.hdr",(envMap)=>{
    // 设置球形映射
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    // 设置环境贴图
    threeBox.scene.background = envMap
    // 设置材料的环境贴图(反光)
    material.envMap = envMap
})


threeBox.scene.add(plane)
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
