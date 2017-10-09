import * as THREE from 'three';
import 'three-examples/controls/OrbitControls';


import { Point, Dir, Rot } from 'librail';
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
        this.initLayout();
    }
    
    private initRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setPixelRatio(window.devicePixelRatio || 1);
        this.renderer.setSize(800, 600);
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
    
    private load(path: string, color: number): THREE.Mesh {
        var rail = ModelManager.create(path, color);

        this.scene.add(rail);
        return rail;
    }

    private initScene() {
        this.scene = new THREE.Scene();
            
        const light = new THREE.DirectionalLight(0xFFFFFF);
        light.position.set(200, 400, -100);
        
        this.scene.add(light);
        this.scene.add(new THREE.AmbientLight(0xAAAAAA));
        
        const axisHelper = new THREE.AxisHelper(50);
        this.scene.add(axisHelper);
    }
    
    private initHandler() {
        this.renderer.domElement.addEventListener('keydown', this.onKeyDown.bind(this), false);
    }

    private initLayout() {
        this.layout = new Layout();
        this.layout.observer = this;

        // load initial layout

        const blue = 0x3399FF;
        const gray = 0x666666;
        const yellow = 0xaaaa33;

        var c = this.load('curve_8', blue);
        c.position.z = -60;

        this.load('straight_2', blue);
        var p = this.load('pier', yellow);
        p.position.x = 108 - 7.5;
        
    }

    private x = 0;

    private onKeyDown(event: KeyboardEvent) {
        event.stopPropagation();
        event.preventDefault();        

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
        if (rail instanceof StraightRail) {
            const m = new StraightModel(rail as StraightRail);
            m.addToScene(this.scene);   
        } else {
        }            
    }

    public railRemoved(layout: Layout, rail: Rail) {
    }
}

