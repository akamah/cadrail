import * as THREE from 'three'
import 'three-examples/controls/OrbitControls';

interface OutlineEffectParameters {
    defaultThickness?: number,
    defaultColor?: THREE.Color,
    defaultAlpha?: number,
    defaultKeepAlive?: boolean
}

import { End, Pole, Point, Dir, Rot, Rail, Straight, Curve, Flip, Slope, Turnout } from 'librail';
import { Layout, LayoutObserver } from './rail/Layout';
import { ModelManager } from './model/ModelManager';
import { Model, StraightModel, CurveModel, SlopeModel, TurnoutModel } from './model/Model';
import { FrontierManager, FrontierManagerObserver } from './rail/FrontierManager';


export class RailView implements LayoutObserver, FrontierManagerObserver  {
    readonly WIDTH = 1024;
    readonly HEIGHT= 576;

    private renderer: THREE.WebGLRenderer;
    private scene:    THREE.Scene;
    private camera:   THREE.Camera;
    private controls: THREE.OrbitControls;
    
    private layout: Layout;
    private frontierManager: FrontierManager;

    private frontier: THREE.Mesh;

    constructor() {
        this.initRenderer();
        this.initCamera();
        this.initScene();
        this.initHandler();
        this.initLayout();
        this.initFrontier();
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
        
        this.camera = new THREE.OrthographicCamera(-w, w, h, -h, 0, 100000);
        this.camera.position.set(0, 5000, 1000);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableKeys = false;
        this.controls.maxPolarAngle = Math.PI * 87 / 180;

        this.controls.update();
        // need to set `controls.target` correctly 
        // when adding rails in order to maintain appropriate viewpoint.
    }
    
    private load(path: string, color: number): THREE.Mesh {
        var rail = ModelManager.create(path, color);

        this.scene.add(rail);
        return rail;
    }

    private initFloor() {
        let loader = new THREE.TextureLoader();

        loader.load('./assets/grass.png', texture => {
            var geometry = new THREE.PlaneBufferGeometry(10000, 10000);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(10, 10);
            var material = new THREE.MeshBasicMaterial( {map: texture } );
            var plane = new THREE.Mesh( geometry, material );
            plane.rotateX(-Math.PI / 2);
            plane.position.setY(-4);
            this.scene.add( plane );
        });
    }

    private initFrontier() {
        var geometry = new THREE.CylinderBufferGeometry(0, 15, 40, 6, 1);
        var material = new THREE.MeshLambertMaterial( { color: 0xFFFFFF });
        this.frontier = new THREE.Mesh(geometry, material);
        this.updateFrontier(this.frontierManager.selection);

        this.scene.add(this.frontier);
    }

    private initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x88DDFF);
            
        const light = new THREE.DirectionalLight(0xFFFFFF);
        light.position.set(200, 400, -100);
        
        this.scene.add(light);
        this.scene.add(new THREE.AmbientLight(0xAAAAAA));

        this.initFloor();

        if (0) {
            const axisHelper = new THREE.AxisHelper(50);
            this.scene.add(axisHelper);
        }
    }
    
    private initHandler() {
        window.document.addEventListener('keydown', this.onKeyDown.bind(this), false);
    }

    public updateFrontier(f: End) {
        let vec3 = Model.pointToVec3(f.point);
        vec3.y += 20;
        let euler = new THREE.Euler(0, f.dir.dir * Math.PI / 4, Math.PI / 2);

        this.frontier.position.copy(vec3);
        this.frontier.setRotationFromEuler(euler);

        this.controls.target = vec3;
        this.controls.update();
    }

    public selectionChanged(fm: FrontierManager, f: End) {
        if (f) {
            console.log(f.toString());
            this.updateFrontier(f);
        }
    }

    private initLayout() {
        this.layout = new Layout();
        this.layout.observer = this;

        this.frontierManager = new FrontierManager();
        this.frontierManager.observer = this;

        if (0) {
            // load initial layout
            const blue = 0x3399FF;
            const gray = 0x666666;
            const yellow = 0xaaaa33;

            const p = Math.SQRT1_2;
            const q = 1 - p;
            const l = 216;

//            this.load('curve_8', blue);
//            var c = this.load('slope', blue);
//            c.rotateX(Math.PI);
//            c.position.setY(66);

            var c = this.load('pier', yellow);
            var d = this.load('pier', yellow);

            c.position.set(3*l*p, 0, -3*l*q);
            d.position.set(2*l, 0, -l);
            c.rotateY(Math.PI / 4);
        }
    }

    private onKeyDown(event: KeyboardEvent) {
        let handle = this.frontierManager.selection.opposite();
        var r: Rail;

        if (event.code === "ArrowUp") {
            r = new Rail(
                Straight, 0, 
                handle,
                Flip.No);
        } else if (event.code === "ArrowLeft") {
            r = new Rail(
                Curve, 0, 
                handle,
                Flip.No);
        } else if (event.code === "ArrowRight") {
            r = new Rail(
                Curve, 0, 
                handle,
                Flip.Yes);
        } else if (event.code === "KeyW") {
            r = new Rail(
                Slope, 0, 
                handle,
                Flip.No);
        } else if (event.code === "KeyS") {
            r = new Rail(
                Slope, 0, 
                handle,
                Flip.Yes);
        } else if (event.code === "KeyL") {
            r = new Rail(
                Turnout, 0, 
                handle,
                Flip.No);
         } else if (event.code === "KeyR") {
            r = new Rail(
                Turnout, 0, 
                handle,
                Flip.Yes);
        } else if (event.code === "Tab") {
            event.stopPropagation();
            event.preventDefault();
            this.frontierManager.selectNext();
            return;
        } else {
            return;
        }

        this.layout.add(r);

        for (let e of r.ends()) {
            this.frontierManager.addEnd(e);
        }

        event.stopPropagation();
        event.preventDefault();
    }

    public render() {
        window.requestAnimationFrame(this.render.bind(this));

        this.renderer.render(this.scene, this.camera);
    }

    // a rail is added to the layout
    // so we need to add a rail model to the scene
    // this is ugly glue code
    public railAdded(layout: Layout, rail: Rail) {
        if (rail.factory === Straight) {
            const m = new StraightModel(rail);
            m.addToScene(this.scene);   
        } else if (rail.factory === Curve) { // STUB!!!
            const m = new CurveModel(rail);
            m.addToScene(this.scene);   
        } else if (rail.factory === Slope) {
            const m = new SlopeModel(rail);
            m.addToScene(this.scene);
        } else if (rail.factory === Turnout) {
            const m = new TurnoutModel(rail);
            m.addToScene(this.scene);
        }
    }

    public railRemoved(layout: Layout, rail: Rail) {
    }
}

