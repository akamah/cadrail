import * as THREE from 'three';
import 'three-examples/controls/OrbitControls';


import { End, Pole, Point, Dir, Rot, Rail, Straight, Curve, Flip } from 'librail';
import { Layout, LayoutObserver } from './rail/Layout';
import { ModelManager } from './model/ModelManager';
import { StraightModel } from './model/Model';


export class RailView implements LayoutObserver {
    readonly WIDTH = 800;
    readonly HEIGHT= 600;

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
        this.renderer.setSize(this.WIDTH, this.HEIGHT);
        document.body.appendChild(this.renderer.domElement);
        this.renderer.domElement.setAttribute('tabindex', '0');
        this.renderer.domElement.focus();
    }
    
    private initCamera() {
        const radius = 1000;
        const ratio = this.WIDTH / this.HEIGHT;
        const w = radius * ratio;
        const h = radius;
        
        this.camera = new THREE.OrthographicCamera(-w, w, h, -h, 0, 5000);
        this.camera.position.set(0, 200, 0);
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

        const p = Math.SQRT1_2;
        const q = 1 - p;

        const l = 216;

        {
            var c = this.load('curve_8', blue);
        }
        {
            var c = this.load('slope', blue);
            c.rotateX(Math.PI);
            c.position.setY(66);
        }
        {
            this.load('pier', yellow).position.setY(0);
            this.load('pier', yellow).position.setY(-66);
            this.load('pier', yellow).position.setX(2*l);
            this.load('pier', yellow).position.set(2*l, -66, 0);
            var pier = this.load('pier', yellow);
            pier.position.set(l*p, -66, -l*q);
            pier.rotateY(Math.PI / 4);
        }
    }

    private handle = End.of(Point.zero(), Dir.East, Pole.Plus);

    private onKeyDown(event: KeyboardEvent) {
        event.stopPropagation();
        event.preventDefault();        

        if (event.code === "ArrowUp") {
            const r = new Rail(
                Straight, 0, 
                this.handle,
                Flip.No);

            this.layout.add(r);
            this.handle = r.ends()[1].opposite();
        } else if (event.code === "ArrowLeft") {
            const r = new Rail(
                Curve, 0, 
                this.handle,
                Flip.No);

            this.layout.add(r);
            this.handle = r.ends()[1].opposite();
        }
    }

    public render() {
        window.requestAnimationFrame(this.render.bind(this));
        
        this.renderer.render(this.scene, this.camera);
    }

    // a rail is added to the layout
    // so we need to add a rail model to the scene
    public railAdded(layout: Layout, rail: Rail) {
        console.log(rail.ends());
        if (rail.factory === Straight) {
            const m = new StraightModel(rail);
            m.addToScene(this.scene);   
        } else if (rail.factory === Curve) { // STUB!!!
            const m = new StraightModel(rail);
            m.addToScene(this.scene);   
        }            
    }

    public railRemoved(layout: Layout, rail: Rail) {
    }
}

