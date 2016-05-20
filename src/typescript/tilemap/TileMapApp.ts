///<reference path="TileUI"/>
///<reference path="TileMapUI"/>
///<reference path="BaseTileRenderer"/>

/**
 * Created by Karl-JohanV on 07-05-2016.
 */
namespace TileMap{
    /**
     * The TileMap application itself. This class is instantiated by applications who wants to use the map.
     * See the initialize method for details on configuring the object.
     */
    export class TileMapApp{
        private map:TileMap.TileMapUI;
        private tileSize:number;
        constructor(){

        }

        /**
         * Initializes the TileMapApp including rendering any tiles supplied by data.
         *
         */
        public initialize(iniData:TileAppData){
            var cameraType = iniData.camera || TileMap.DEFAULT_CAMERA_TYPE;
            //set the map.
            this.map = new TileMap.TileMapUI(iniData.canvas, cameraType);
            //start the map.
            this.map.initBabylon();
            //set the initial data.
            this.tileSize = iniData.tileSize || TileMap.DEFAULT_TILE_SIZE;
            this.map.tileRenderer = iniData.renderer || new TileMap.BaseTileRenderer();
            //TODO: Add skybox.

            //TODO: add data iterator.
            for(var key in iniData.data){
                var tileData =<TileData> iniData.data[key];
               this.addTile(tileData);
            }
        }

        public addTile(tileData:TileData):TileMap.TileUI{
            return this.map.addTile(tileData);
        }

        public removeTile(p:number, q:number):TileMap.TileUI {
            var point = TileMap.calculatePoint(p, q);
            var tileUI = this.map.findTileUnder(point);
            if(tileUI != null){
                this.map.removeTile(tileUI);
            }
            return tileUI;
        }

        public addTileClickListener(listener: (tile:TileUI, event:TileMapMouseEvent) => void):void {
            this.map.registerTileClickedListener(listener);
        }
        public addVoidClickListener(listener: (event:TileMapMouseEvent) => void):void{
            this.map.registerVoidClickedListener(listener);
        }

    }



}


