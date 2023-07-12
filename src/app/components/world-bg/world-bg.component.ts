import { Component, Input, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import CameraOrientationState from '../../../assets/helpersTHREE/CameraOrientationState';
import { PerspectiveCameraForResizableWindow , handleCameraRotation, handleMouseMovement } from '../../../assets/helpersTHREE/CameraWithMouseRotation';

@Component({
  selector: 'app-world-bg',
  template: `
    <canvas #worldBg></canvas>
    `
})
export class WorldBgComponent {
  @ViewChild('worldBg', { static: true }) canvasElementRef!: ElementRef<HTMLCanvasElement>; // obtenemos el elemento canvas del DOM
  
  private background:THREE.ColorRepresentation = 0x4CAF50; // color de fondo del canvas
  


  ngOnInit() {
    const scene = new THREE.Scene();                            //creas una escena
    scene.background = new THREE.Color( this.background );      //le asignas un color de fondo

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


    const worldTexture  = new THREE.TextureLoader().load( '../../../assets/earthTextureNasa.webp' );  // cargamos la textura del mundo

    const world = new THREE.Mesh(
      new THREE.CapsuleGeometry( 1.0, 0.2, 15, 50 ),
      new THREE.MeshStandardMaterial({
        map: worldTexture
      })
    );
    scene.add( world );

    // LUCES
    const pointLight = new THREE.PointLight( 0xffffff, 1.0 );
    pointLight.position.set( 5, 5, 5 );
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
