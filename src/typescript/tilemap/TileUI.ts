///<reference path="../_declare/babylon.d.ts"/>
///<reference path="core"/>
namespace TileMap{

export class TileUI{
    public data:Object;
    public tileMesh:BABYLON.Mesh;

    public p:number;
    public q:number;
    /**
     * Constructs a new TileUI with default values.
     * @param data
     * @param mesh
     */
    constructor(data:Object={}, mesh:BABYLON.Mesh){
        this.data = data;
        this.tileMesh = mesh;
        this.tileMesh['tileUI'] = this;
    }

    /**
     * Sets a new facing of the Tile. Expects an URL to an image that can be loaded
     * onto a texture.
     * @param url
     */
    public setFace(url:string):void{
        this.tileMesh[TileMap.TILE_DISC_NAME].diffuseTexture = new BABYLON.Texture(url, this.tileMesh.getScene());
    }

    /**
     * Sets the border color of the tile. Expects a RRGGBB value.
     * @param color
     */
    public setBorderColor(color:string):void{
        var tileColor = new BABYLON.StandardMaterial(this.tileMesh.name + "_tileColor" , this.tileMesh.getScene());
        var _color:BABYLON.Color3 = TileMap.stringToColor(color);
        if (_color != null) {
            tileColor.diffuseColor = _color;
            tileColor.emissiveColor = new BABYLON.Color3(_color.r / 3, _color.g / 2, _color.g / 2);

        }
        this.tileMesh.material = tileColor;
    }

    /**
     * Rotes the tile.
     * @param degrees the number of degrees to rotate the tile. Usually a factor of 60.
     */
    public rotate(degrees:number):void{
        this.tileMesh.rotate(BABYLON.Vector3.Up(), degrees);
    }


}






}