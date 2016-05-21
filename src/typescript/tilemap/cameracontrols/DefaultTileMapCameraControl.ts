/**
 * Created by Karl-JohanV on 14-05-2016.
 */
namespace TileMap{

    export class DefaultTileMapCameraControl implements CameraControl{
        private camera:BABYLON.ArcRotateCamera;
     
        attach(scene:BABYLON.Scene, canvas:HTMLCanvasElement):void {
            this.camera = new BABYLON.ArcRotateCamera("Camera", -.5*Math.PI , 2, 120, BABYLON.Vector3.Zero(), scene);
            this.camera.setTarget(BABYLON.Vector3.Zero());
            this.camera.attachControl(canvas);
        }

        onRenderScene():void {
            // Camera
            // if (this.camera.beta < Math.PI *.5*.92)
            //     this.camera.beta = Math.PI*.5*.92;
            //
            // else if (this.camera.beta > (Math.PI) * 0.92)
            //     this.camera.beta = (Math.PI ) * 0.92;
            //
            // if(this.camera.alpha > -.1 ) {
            //     this.camera.alpha = -.1;
            // }
            // if(this.camera.alpha < -1* Math.PI *.92){
            //     this.camera.alpha = -1* Math.PI *.92;
            // }
            //
            //
            // if (this.camera.radius > 1000)
            //     this.camera.radius = 1000;
            //
            // if (this.camera.radius < 50)
            //     this.camera.radius = 50;


        }
    }



}