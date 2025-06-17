<script setup>
import { threeClass } from '/src/utils/init'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js';
import * as THREE from "three";
const threeBox = new threeClass.init()
const {scene,FuncTween,animate} = threeBox   


const ball = new THREE.Mesh(
  new THREE.SphereGeometry(1,32,32),
  new THREE.MeshBasicMaterial({
    color:'orange'
  })
)

scene.add(ball)

// 第一段运动
FuncTween({index:1,tween:{position:ball.position}})
// 第一个参为目的地位置 第二个参为时间
threeBox.tween[1].to({x:4},1000) 

//tween.onStart(()=>{}) //开始回调
//.ononComplete(()=>{}) //完成回调
//.onStop(()=>{}) //停止回调
//.onUpdate(()=>{}) //更新回调

// 第二段运动
FuncTween({index:2,tween:{position:ball.position}})
threeBox.tween[2].to({y:2},1000) //.onUpdate(()=>{}) //回调

// 连接多段运动
threeBox.tween[1].chain(threeBox.tween[2])

// 多次执行
// threeBox.tween.repeat(Infinity) //无数次
// threeBox.tween.yoyo(true) //循环往复
// threeBox.tween.repeat(2)

// 每次运动延迟后执行
threeBox.tween[1].delay(1000)

// 设置运动速度变化函数
threeBox.tween[1].easing(TWEEN.Easing.Quadratic.InOut)

// 启动补间动画
threeBox.tween[1].start()

// 补间动画需要更新
animate({tween:true})

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
