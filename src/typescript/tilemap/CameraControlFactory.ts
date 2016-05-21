/**
 * Created by Karl-JohanV on 14-05-2016.
 */
namespace TileMap{
    
    export function buildCameraControl(type:string):TileMap.CameraControl{
        if(TileMap.ORTH_CAM == type){
            return new OrtogonalCameraControl();
        }
        else{
            //return new DefaultTileMapCameraControl();
                return new SimpleFreeCamControl();
            }
    } 
    
}
