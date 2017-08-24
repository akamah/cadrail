import * as THREE from 'three';
import 'three-examples/controls/OrbitControls';


import { Rail, StraightRail } from './rail/Rail';
import { Layout, LayoutObserver } from './rail/Layout';

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
        this.camera.position.z = 2000;
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableKeys = false;
        this.controls.addEventListener('change', this.render);

        // need to set `controls.target` correctly 
        // when adding rails in order to maintain appropriate viewpoint.
    }
    
    private load(path: string, color: number) {
        var loader = new THREE.JSONLoader();

        var material = new THREE.MeshLambertMaterial({ color: color});

        loader.load('./build/assets/' + path, (geometry, materials) => {
            var rail = new THREE.Mesh(geometry, material);
          this.scene.add(rail);
        });
    }

    private initScene() {
        this.scene = new THREE.Scene();
            
        const light = new THREE.PointLight();
        light.position.set(200, 400, -100);
        
        this.scene.add(light);
        this.scene.add(new THREE.AmbientLight());
        
        const axisHelper = new THREE.AxisHelper(50);
        this.scene.add(axisHelper);
        
        const blue = 0x3399FF;
        const gray = 0x666666;

        this.load('autopoint_a.json', blue);
        this.load('autopoint_b.json', gray);
        this.load('autopoint_c.json', gray);
        this.load('autopoint_ab.json', blue);
        this.load('autopoint_bc.json', gray);
        this.load('autopoint_abc.json', blue);
        this.load('autopoint_decoration.json', blue);        

    }
    
    private initHandler() {
        this.renderer.domElement.addEventListener('keydown', this.onKeyDown.bind(this), false);
    }

    private onKeyDown(event: KeyboardEvent) {
        event.stopPropagation();
        event.preventDefault();        
        console.log('key pressed');

        this.layout.add(new StraightRail());
    }

    public render() {
        window.requestAnimationFrame(this.render.bind(this));
        
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);
    }

    // a rail is added to the layout
    // so we need to add a rail model to the scene
    public railAdded(layout: Layout, rail: Rail) {
        console.log('rail added');
    }

    public railRemoved(layout: Layout, rail: Rail) {
    }
}

