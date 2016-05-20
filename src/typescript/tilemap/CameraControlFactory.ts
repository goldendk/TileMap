/**
 * Created by Karl-JohanV on 14-05-2016.
 */
namespace TileMap{
    
    export function buildCameraControl(type:string){
        if(TileMap.ORTH_CAM){
            return new OrtogonalCameraControl();
        }    
    
        else{
            return new DefaultTileMapCameraControl();
        }
    } 
    
}
