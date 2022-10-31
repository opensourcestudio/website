const inw = window.innerWidth - (window.innerWidth * 0.015);
const pi = Math.PI;
const inh = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({antialias: true});
const canvas = document.getElementById("ctx");
// var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var geometry = new THREE.BoxGeometry(0.02, 0.02, 1.2);
var material = new THREE.MeshLambertMaterial({color: 0xF7F7F7});
let Mesh;
function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}

function rnr(min, max) {
    return Math.random() * (max - min) + min;
}

function init() {
    renderer.setClearColor("#121212");
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;
canvas.appendChild(renderer.domElement);
window.addEventListener('resize', () => {
renderer.setSize(window.innerWidth, window.innerHeight);
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
})
}





let balloonLoader = new THREE.GLTFLoader();

        balloonLoader.load('models/osslogo.gltf', (gltf) => {
            Mesh = gltf.scene;
            let smth = 0.5;
            Mesh.scale.set(smth, smth, smth);
            scene.add(Mesh);
            Mesh.position.x = 0;
            Mesh.position.y = 0;
            Mesh.position.z = -10;
            Mesh.rotation.set(pi/2, pi, 0);
            Mesh.name = "oss";
            // console.log(Mesh);
        });
function makeit() {
    // const controls = new OrbitControls(camera, renderer.domElement);
    
        
for (var i = 0; i<90;i++ ){
    
    var mesh = new THREE.Mesh(geometry, material);
    var threechoice = Math.random();
    
    if (threechoice >= 0 && threechoice < 1/3) 
    {
        
        var first = rnr(0.2, 0.5);
        mesh.position.x = first * 15;
        mesh.position.y = (Math.random()-0.5) * 6;
        mesh.position.z = (Math.random() - 0.3) * 15;
        
    } 
    else if (threechoice >= 1/3 && threechoice < 2/3) 
    {
        
        var second = rnr(-0.5, -0.2);
        mesh.position.x = second * 15;
        mesh.position.y = (Math.random()-0.5) * 6;
        mesh.position.z = (Math.random() - 0.3) * 15;
    } 
    else 
    {
        
        var third = rnr(-0.2, 0.2);
        mesh.position.x = third * 14;
        if (Math.round(Math.random()) == 1) {
            mesh.position.y = rnr(0.2, 0.5) * 14;
            // console.log("first");
        }
        else {
            mesh.position.y = rnr(-0.5, -0.2) * 14;
            // console.log("second");
        }
        mesh.position.z = (Math.random() - 0.3) * 15;
        
    
    }
    mesh.name = "bob";
    scene.add(mesh);
}

}


function setLight() {
    var light = new THREE.PointLight(0xFFFFFF, 1, 500);
    light.position.set(0, 0, 0);

    scene.add(light)

    var light = new THREE.PointLight(0xFFFFFF, 0.5, 500);
    light.position.set(0, 0, 25);

    scene.add(light)

}





// function onMouseMove(event) {
//     event.preventDefault();

// mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
// mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
// console.log(`${mouse.x},${mouse.y}`);

// raycaster.setFromCamera(mouse, camera);

// var intersects = raycaster.intersectObjects(scene.children, true);
//         for (var i = 0; i < intersects.length; i++) {
//             this.tl = new TimelineMax();
//             this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut});
//             this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut});
//             this.tl.to(intersects[i].object.position, .5, {x: 2, ease: Expo.easeOut});
//             this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI*.5, ease: Expo.easeOut}, "=-1.5");
//         }
// }
function animate() {
    requestAnimationFrame(animate);
    Mesh.rotation.set(Mesh.rotation.x +0.01, 
                      Mesh.rotation.y +0.015,
                      Mesh.rotation.z +0.01);
    scene.traverse(function (object) {
        if (object.isMesh && object.name == "bob") {
            
            if (object.position.z <= -11) {
                object.position.z = 10;
            }
            else {
                object.position.z -= 0.1;
            }
        }
        else {

        }
    })
    
    renderer.render(scene, camera);
}

init();
setLight();
makeit();
animate();




// window.addEventListener("click", onMouseMove);