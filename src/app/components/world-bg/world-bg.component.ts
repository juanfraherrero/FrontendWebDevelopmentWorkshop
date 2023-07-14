import { Component, Input, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import CameraOrientationState from '../../../assets/helpersTHREE/CameraOrientationState';
import { PerspectiveCameraForResizableWindow , handleCameraRotation, handleMouseMovement } from '../../../assets/helpersTHREE/CameraWithMouseRotation';
import { Texture } from 'three';

@Component({
  selector: 'app-world-bg',
  template: `
    <canvas #worldBg></canvas>
    `
})
export class WorldBgComponent {
  @ViewChild('worldBg', { static: true }) canvasElementRef!: ElementRef<HTMLCanvasElement>; // obtenemos el elemento canvas del DOM
  
  private background: Texture;

  constructor() {
    // Asignar un valor inicial a 'background'
    this.background = new THREE.Texture();
  }

  ngOnInit() {
    const scene = new THREE.Scene();
    const textureLoader = new THREE.TextureLoader();
    this.background = textureLoader.load('assets/cielo_estrellado.jpg');                            //creas una escena
    scene.background = this.background;      //le asignas un color de fondo

    const renderer = new THREE.WebGLRenderer({ canvas: this.canvasElementRef.nativeElement }); // le pasamos el elemento canvas al renderer
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    // const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // creas la camara
    // const camera = PerspectiveCameraForResizableWindow(cameraFOV, howNearToRender, howFarToRender, renderer)
    const camera = PerspectiveCameraForResizableWindow(30, 0.1, 10000, renderer);
    const mouse = new THREE.Vector2();
    let cameraOrientationState = new CameraOrientationState();
    function onMouseMove(event: MouseEvent) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
    
      handleMouseMovement(mouse.x, mouse.y, cameraOrientationState);
    }
    document.addEventListener('mousemove', onMouseMove, false);
    

    // controles de la orbita
    const controls = new TrackballControls( camera, renderer.domElement );
    

    const material = new THREE.MeshPhongMaterial()
    const texture = new THREE.TextureLoader().load('../../../assets/worldColour.5400x2700.jpg') // cargamos la textura del mundo
    material.map = texture
    
    const normalTexture = new THREE.TextureLoader().load( '../../../assets/earth_normalmap_8192_4096.jpg' ) // cargamos la textura normal del mundo
    material.normalMap = normalTexture
    material.normalScale.set(0.2, 0)

    const bumpTexture = new THREE.TextureLoader().load( '../../../assets/earth_bumpmap.jpg')
    material.bumpMap = bumpTexture
    material.bumpScale = 0.001
    
    const world = new THREE.Mesh( 
      new THREE.CapsuleGeometry( 0.8, 0.1, 15, 50 ),
      material
    );
    scene.add( world );

    // LUCES
    const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    pointLight.position.set( 5, 5, -20 );
    scene.add( pointLight );

    const ambienLight = new THREE.AmbientLight( 0xffffff, 0.3 );
    scene.add( ambienLight );

    // posicion camara
    camera.position.setZ( 5 );
    controls.update();
    
    window.addEventListener('resize', onWindowResize, false)
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.render(scene, camera)
    }

    const animate = function () {
      requestAnimationFrame( animate );

      world.rotation.y += 0.005;

      // controls.update();
      handleCameraRotation(camera, cameraOrientationState);

      renderer.render( scene, camera );
    }    
    animate();
  }
}
