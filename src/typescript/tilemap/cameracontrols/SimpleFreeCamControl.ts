/**
 * Created by Karl-JohanV on 21-05-2016.
 */

namespace TileMap{
    
    
    export class SimpleFreeCamControl implements TileMap.CameraControl{

        private camera:BABYLON.ArcRotateCamera = null;
        attach(scene:BABYLON.Scene, canvas:HTMLCanvasElement):void {
            this.camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 8, 50, BABYLON.Vector3.Zero(), scene);
            this.camera.setTarget(new BABYLON.Vector3(0, 0, 0));
            this.camera.attachControl(canvas);
        }

        onRenderScene():void {
        }
    }
}