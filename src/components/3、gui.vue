<script setup>
import {threeClass} from '/src/utils/init'
import * as THREE from "three";
import {GUI} from "three/examples/jsm/libs/lil-gui.module.min.js"

const threeBox = new threeClass.init()

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'orange' });
const cube = new THREE.Mesh(geometry, material);
threeBox.scene.add(cube);
threeBox.animate()

let guiObj = {
  Fullscreen:()=>{
    document.body.requestFullscreen()
  }
}
// 创建gui实体
const gui = new GUI()
gui.add(guiObj,"Fullscreen").name('全屏')

// 创建gui分类文件夹
const folder = gui.addFolder('实体位置')

// 控制实体位置 第一个参是实体 第二个参是属性 3、4个参是范围
// gui.add(cube.position,"x",-5,5).name('实体x轴位置')
// 或者 step是步长
folder.add(cube.position,"x").min(-5).max(5).step(2).name('实体x轴位置').onChange((val)=>cgMeth(val))
folder.add(cube.position,"y").min(-5).max(5).step(2).name('实体y轴位置').onFinishChange((val)=>finishcgMeth(val))

// 更改触发事件
const cgMeth=(val)=>{
  console.log(val,'即时触发')
}
// 完成更改触发事件
const finishcgMeth=(val)=>{
  console.log(val,'完成触发')
}



// 自检参数类型 此处是布尔
gui.add(material,"wireframe").name("材质")

// 修改颜色
let color = {
  cubeColor:'orange'
}
// 自检参数类型 此处是颜色 
gui.addColor(color,"cubeColor").name('实体颜色').onChange(val=>{
  cube.material.color.set(val)
})
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
.btn{
  position: fixed;
}
</style>
