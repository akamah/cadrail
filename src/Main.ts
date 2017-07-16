import * as THREE from "three";

export = class Main {
    private renderer: THREE.WebGLRenderer;
    private scene:    THREE.Scene;
    private camera:   THREE.Camera;

    private cube:     THREE.Mesh;

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
        const ratio = window.innerWidth / window.innerHeight;
        this.camera = new THREE.OrthographicCamera(-ratio, ratio, 1, -1);
        this.camera.position.z = 5;
    }

    private initScene() {
        this.scene = new THREE.Scene();

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshLambertMaterial({ color: 0x00FEFE });

        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        const light = new THREE.PointLight(0xFFFFFF);
        this.cube.rotation.x = 30;
        light.position.set(10, 20, 30);

        this.scene.add(light);

		const axisHelper = new THREE.AxisHelper(1);
		this.scene.add(axisHelper);
    }

    public render() {
        window.requestAnimationFrame(this.render.bind(this));

        this.cube.rotation.x += 0.08;
        this.cube.rotation.y += 0.1;
        this.renderer.render(this.scene, this.camera);
    }
}