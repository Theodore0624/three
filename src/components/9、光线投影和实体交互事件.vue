<script setup>
import { threeClass } from "/src/utils/init";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const threeBox = new threeClass.init();
threeBox.scene.background = new THREE.Color("grey");

// 创建球体
const ball1 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({
    color: "orange",
  })
);
ball1.position.x = -2;

const ball2 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({
    color: "green",
  })
);

threeBox.scene.add(ball1);
threeBox.scene.add(ball2);

// 创建射线
const ray = new THREE.Raycaster();
// 创建鼠标向量
const mouse = new THREE.Vector2();
// 添加监听事件
window.addEventListener("click", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);

  // 通过相机和鼠标位置更新射线
  ray.setFromCamera(mouse, threeBox.camera);

  // 计算物体和射线的交点
  const touchPoint = ray.intersectObjects([ball1, ball2]);
    console.log(touchPoint);

  if (touchPoint.length > 0) {
    console.log(touchPoint);
    
    if (!touchPoint[0].object.inSelect) {
      // 添加自定义属性 用来判断物体颜色
      touchPoint[0].object.inSelect = true;
      // 记录原本的颜色
      if (!touchPoint[0].object.oldColor) {
        touchPoint[0].object.oldColor =
          touchPoint[0].object.material.color.getHex();
      }
      // 点击时修改物体颜色
      touchPoint[0].object.material.color.set("red");
    } else {
      touchPoint[0].object.inSelect = false;
      touchPoint[0].object.material.color.set(touchPoint[0].object.oldColor);
    }
  }
});

threeBox.animate();
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
