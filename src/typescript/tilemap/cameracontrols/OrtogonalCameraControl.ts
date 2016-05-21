namespace TileMap {
//from https://raw.githubusercontent.com/slifin/Flourish-babylon/gh-pages/js/camera2D.js
    export class OrtogonalCameraControl implements CameraControl {
        private freeCamera:BABYLON.ArcRotateCamera;
        onRenderScene():void {

        }

        alterZoom(scale:number) {
            if(scale < 1){
                scale = 0.9;
            }
            else{
                scale = 1.1
            }
            this.freeCamera.orthoTop *= (scale);
            this.freeCamera.orthoBottom *= (scale);
            this.freeCamera.orthoLeft *= (scale);
            this.freeCamera.orthoRight *= (scale);


            console.log(this.freeCamera.orthoTop + ", " + this.freeCamera.orthoBottom
            + ", " + this.freeCamera.orthoLeft + ", " +this.freeCamera.orthoRight);
            console.log("Position: " + this.freeCamera.position);
        }

        onWheel = (e:any) =>{
            e = e || window.event;

            var delta = e.deltaY || e.detail || e.wheelDelta;

            if (delta == 3) {
                delta = 100;
            }

            if (delta == -3) {
                delta = -100;
            }
            var length = delta / 35;

            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
            this.alterZoom(length);

        }

        attach(scene:BABYLON.Scene, canvas:HTMLCanvasElement):void {
            this.freeCamera = new BABYLON.ArcRotateCamera("aFreeCamera",1.5*Math.PI, Math.PI /2, 25, new BABYLON.Vector3(0, 0, 0),scene);
            //    this.freeCamera.setTarget(new BABYLON.Vector3(0, 0, 0));

            this.freeCamera.inputs.clear();
            this.freeCamera.inputs.add( new TileMap.AlwaysPanArcRotatePointersInput());
            //   this.freeCamera.inputs.clear();
            //   this.freeCamera.inputs.addMouseWheel();
            //     this.freeCamera.inputs.add(new TileMap.AlwaysPanArcRotatePointersInput());
            //this.freeCamera.inputs.remove(this.freeCamera.inputs.attached["mousewheel"]);
            //this.freeCamera.inputs.remove(this.freeCamera.inputs.attached["pointers"]);
            //this.freeCamera = new BABYLON.FreeCamera("aFreeCamera", new BABYLON.Vector3(-0.63, 0.02, -0), scene);

            this.freeCamera.position = new BABYLON.Vector3(0, 0, -60);
            this.freeCamera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

            this.freeCamera.orthoTop = 60;
            this.freeCamera.orthoBottom = -60;
            this.freeCamera.orthoLeft = -60;
            this.freeCamera.orthoRight = 60;
            this.freeCamera.attachControl(canvas);

             if (canvas.addEventListener) {
                 if ('onwheel' in document) {
                     canvas.addEventListener("wheel", this.onWheel);
                 } else if ('onmousewheel' in document) {
                     canvas.addEventListener("mousewheel", this.onWheel);
                 } else {
                     canvas.addEventListener("MozMousePixelScroll", this.onWheel);
                 }
             } else {
                 console.log("Camera does not have addEventListener!");
             }


        }
    }
}