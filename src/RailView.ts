import * as THREE from "three";

export class RailView {
    private renderer: THREE.WebGLRenderer;
    private scene:    THREE.Scene;
    private camera:   THREE.Camera;
    
    private rail:     THREE.Mesh;
    
    constructor() {
        this.initRenderer();
        this.initCamera();
        this.initScene();
    }
    
    private initRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }
    
    private initCamera() {
        const radius = 10;
        const ratio = window.innerWidth / window.innerHeight;
        const w = radius * ratio;
        const h = radius;

        this.camera = new THREE.OrthographicCamera(-w, w, h, -h);
        this.camera.position.set(100, 100,  500);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
    

    private initScene() {
        this.scene = new THREE.Scene();
            
        var loader = new THREE.JSONLoader();

        loader.load('./model/straight.json', (geometry, materials) => {
            this.rail = new THREE.Mesh(geometry, materials[0]);
            this.scene.add(this.rail);
            this.rail = new THREE.Mesh(geometry, materials[0]);
            this.rail.position.x = 216;
            this.scene.add(this.rail);
        });
        const light = new THREE.PointLight();
        light.position.set(200, 400, -100);
        
        this.scene.add(light);
        this.scene.add(new THREE.AmbientLight());
        
        const axisHelper = new THREE.AxisHelper(50);
        this.scene.add(axisHelper);
        
    }
    
    public render() {
        window.requestAnimationFrame(this.render.bind(this));
        
        this.renderer.render(this.scene, this.camera);
    }
}
