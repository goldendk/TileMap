///<reference path="../_declare/babylon.d.ts"/>

module TileMap{

class TileUI{
    public data:Object;
    public tileMesh:BABYLON.Mesh;

    /**
     * Constructs a new TileUI with default values.
     * @param data
     * @param mesh
     */
    constructor(data:Object={}, mesh:BABYLON.Mesh){
        this.data = data;
        this.tileMesh = mesh;
    }

    /**
     * Sets a new facing of the Tile. Expects an URL to an image that can be loaded
     * onto a texture.
     * @param url
     */
    public setFace(url:String):void{

    }

    /**
     * Sets the border color of the tile. Expects a RRGGBB value.
     * @param color
     */
    public setBorderColor(color:string):void{

    }


}






}