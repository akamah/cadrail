import * as THREE from 'three';
import 'three-examples/controls/OrbitControls';


import { Point } from './core/Point';
import { Dir } from './core/Dir';
import { Rot } from './core/Rot';
import { Rail, StraightRail } from './rail/Rail';
import { Layout, LayoutObserver } from './rail/Layout';
import { ModelManager } from './model/ModelManager';
import { StraightModel } from './model/Model';


export class RailView implements LayoutObserver {
    private renderer: THREE.WebGLRenderer;
    private scene:    THREE.Scene;
    private camera:   THREE.Camera;
    private controls: THREE.OrbitControls;
    
    private layout: Layout;

    constructor() {
        this.initRenderer();
        this.initCamera();
        this.initScene();
        this.initHandler();

        this.layout = new Layout();
        this.layout.observer = this;
    }
    
    private initRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.renderer.domElement.setAttribute('tabindex', '0');
        this.renderer.domElement.focus();
    }
    
    private initCamera() {
        const radius = 1000;
        const ratio = window.innerWidth / window.innerHeight;
        const w = radius * ratio;
        const h = radius;
        
        this.camera = new THREE.OrthographicCamera(-w, w, h, -h, 10, 5000);
        this.camera.position.set(-200, 200, 200);
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableKeys = false;

        // need to set `controls.target` correctly 
        // when adding rails in order to maintain appropriate viewpoint.
    }
    
    private load(path: string, color: number) {
        var rail = ModelManager.create(path);

        this.scene.add(rail);
    }

    private initScene() {
        this.scene = new THREE.Scene();
            
        const light = new THREE.DirectionalLight(0xFFFFFF);
        light.position.set(200, 400, -100);
        
        this.scene.add(light);
        this.scene.add(new THREE.AmbientLight(0xAAAAAA));
        
        const axisHelper = new THREE.AxisHelper(50);
        this.scene.add(axisHelper);
        
        const blue = 0x3399FF;
        const gray = 0x666666;

        this.load('autopoint_a', blue);
        this.load('autopoint_b', gray);
        this.load('autopoint_c', gray);
        this.load('autopoint_ab', blue);
        this.load('autopoint_bc', gray);
        this.load('autopoint_abc', blue);
        this.load('autopoint_decoration', blue);        

    }
    
    private initHandler() {
        this.renderer.domElement.addEventListener('keydown', this.onKeyDown.bind(this), false);
    }

    private x = 0;

    private onKeyDown(event: KeyboardEvent) {
//        event.stopPropagation();
//        event.preventDefault();        
        console.log('key pressed');

        if (event.keyCode == 38) {
            const r = new StraightRail(
                Point.of(new Rot(this.x)),
                Dir.North,
                false, false);

            this.layout.add(r);
            this.x += 4;
        }
    }

    public render() {
        window.requestAnimationFrame(this.render.bind(this));
        
        this.renderer.render(this.scene, this.camera);
    }

    // a rail is added to the layout
    // so we need to add a rail model to the scene
    public railAdded(layout: Layout, rail: Rail) {
        console.log('rail added');

        const m = new StraightModel(rail as StraightRail);
        m.addToScene(this.scene);
    }

    public railRemoved(layout: Layout, rail: Rail) {
    }
}

