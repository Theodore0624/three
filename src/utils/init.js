import * as THREE from "three";
// 轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 导入补间动画加载器
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js';

export const threeClass = {
  init: class init {
    constructor(param) {
      this.scene = null;
      this.controls = null;
      this.camera = null;
      this.renderer = null;
      this.axesHelper = null;
      // 创建场景
      this.scene = new THREE.Scene();

      // 补间动画
      this.tween = []
      
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

      this.camera.position.set(5,5,5)

      this.camera.lookAt(3, 0, 0);
      this.animate = this.animate.bind(this);
      this.FuncTween = this.FuncTween.bind(this);


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
    animate(param) {
      const callback = ()=>{
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        if(param.tween){
          TWEEN.update()
        }   
        requestAnimationFrame(callback) 
        }
      callback()
    }
    FuncTween(param){
      // 可能有多段动画
      this.tween[param.index] = new TWEEN.Tween(param.tween.position)
    }
  },
};
