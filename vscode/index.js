import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js";
import Stats from "https://cdn.jsdelivr.net/npm/stats-js@1.0.1/src/Stats.js";
import {GUI} from "https://unpkg.com/dat.gui@0.7.7/build/dat.gui.module.js";
import { OrbitControls } from "./jsm/OrbitControls.js";


//scene
var scene = new THREE.Scene();

//background
scene.background = new THREE.Color(0x18B0F0);
scene.fog = new THREE.Fog(0xFCDDE4, 10, 100);

//camera    
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//render
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//lights
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(-0.5,1,1);
scene.add(directionalLight);

//mainPlane
var planeGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

//OrbitControls
var orbitControls = new OrbitControls(camera, renderer.domElement);


//Stats
    var stats = new Stats();
    function newStats() {
        stats.setMode(2);
        stats.domElement.style.position = "absolute";
        stats.domElement.style.left = "100px";
        stats.domElement.style.top = "10px";
        document.getElementById("stats").appendChild(stats.domElement);
        return stats;

    }

//Building
var controls = new (function () {
    this.addBuilding = function () {
        var geometry = new THREE.BoxGeometry( 2, changeData(1,35), 2 );
        var material = new THREE.MeshPhongMaterial( {color: randomColor()} );
        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = changeData(-50,50);
        cube.position.z = changeData(-50,50);
        scene.add( cube );
    };
});

//Generate Value
function changeData (start, end ){
    return Math.floor(Math.random() * (end - start) ) + start;
}

//GUI
function newBuilding() {
    var gui = new GUI();
    gui.add(controls, 'addBuilding');
}
//RandomSelect
function RandomSelec(){
	var VarList = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
	var RandomNumber = (Math.random()*15).toFixed(0);
	return VarList[RandomNumber];
}
//Random Color
function randomColor(){
	var selectColor = "";
	for(var i=0;i<6;i++){
		selectColor = selectColor + RandomSelec() ;
	}
	return "#" + selectColor;
}

//camera
camera.position.z = 30;
camera.position.y = 30;
orbitControls.update();

//animation
function animation() {
    requestAnimationFrame(animation);
    stats.update();
    renderer.render(scene, camera);
}

//methods callback
newStats();
newBuilding();
animation();