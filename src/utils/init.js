import * as THREE from "three";
// 轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const threeClass = {
  init: class init {
    constructor() {
      this.scene = null;
      this.controls = null;
      this.camera = null;
      this.renderer = null;
      this.axesHelper = null;
      // 创建场景
      this.scene = new THREE.Scene();

      // 创建相机
      this.camera = new THREE.PerspectiveCamera(
        45, //视角
        window.innerWidth / window.innerHeight, //宽高比
        0.1, //进平面
        1000 //远平面
      );

      // 创建渲染器
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.renderer.domElement);

      this.axesHelper = new THREE.AxesHelper(5);
      this.scene.add(this.axesHelper);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);

      this.controls.enableDamping = true;

      this.controls.dampingFactor = 0.08;

      this.camera.position.z = 5;
      this.camera.position.y = 5;
      this.camera.position.x = 5;

      this.camera.lookAt(3, 0, 0);
      this.animate = this.animate.bind(this);

      // 监听窗口变化
      window.addEventListener("resize", () => {
        // 重置渲染器宽高比
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // 重置相机宽高比
        this.camera.aspect = window.innerWidth / window.innerHeight;
        // 更新相机投影矩阵
        this.camera.updateProjectionMatrix();
      });
    }
    // 渲染函数
    animate() {
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }
  },
};
