///<reference path="TileUI"/>

namespace TileMap{
    export var TILE_DISC_NAME:string = "disc";
    export var DEFAULT_TILE_SIZE:number = 2;
    export var TILE_COUNT:number = 0;
    export var DEFAULT_CAMERA_TYPE = "defaultCamera";
    export var ORTH_CAM = "orthocam";
    /**
     * Simple mouse event interface.
     */
    export interface TileMapMouseEvent{
        screenX:number;
        screenY:number;
    }

    /**
     * Encapsulation of the rendering of a Tile.
     * Allows for other apps to specialise the look of the tiles
     * as they are rendered on the scene.
     */
    export interface TileUIRenderer{
        render(tile:TileUI, tileData:Object):void;
    }
    /**
     * Simple representation of a point.
     */
    export class Point{
        x:number;
        y:number;
    }

    /**
     * Interface defining object able to configure an instance of TileMapApp.
     */
    export interface TileAppData{
        canvas:HTMLCanvasElement,
        tileSize?:number,
        skybox?:string,
        renderer?:TileUIRenderer,
        camera?:string,
        data:Array<TileData>
    }

    export interface TileData{
        p:number,
        q:number,
        tileface?:string,
        color?:string
    }

    /**
     * Abstracts a camera control viewing the TileMap. It will define the camera constructed
     */
    export interface CameraControl{
        /**
         * Called once, and only once, before displaying the UI to the user.
         *
         * @param scene
         */
        attach(scene:BABYLON.Scene, canvas:HTMLCanvasElement):void;
        /**
         * Called by UI whenever the scene is about to be rendered.
         */
        onRenderScene():void;

    }

}