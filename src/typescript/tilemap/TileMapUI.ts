///<reference path="../_declare/babylon.d.ts" />
///<reference path="BaseTileRenderer" />

namespace TileMap{


    export class TileMapUI{
        private scene:BABYLON.Scene;
        private camera:BABYLON.ArcRotateCamera;
        private canvas:HTMLCanvasElement;
        private engine:BABYLON.Engine;
        public tileRenderer:TileUIRenderer;
        private meshes:Object = {};
        private cameraControl:CameraControl;
        private cameraType:string;

        private clickListeners:Object = {
            "tileClick":[],
            "voidClick":[]
        };

        constructor(canvas:HTMLCanvasElement, cameraType:string){
            this.canvas = canvas;
            this.cameraType = cameraType;
        }

        

        //SETUP the scene.
        public initBabylon() {
            // load the 3D engine
            this.engine = new BABYLON.Engine(this.canvas, true);
            // call the createScene function
            this.createScene();
           
           // this.scene.debugLayer.show();
            // run the render loop
            this.engine.runRenderLoop( () => {
                this.cameraControl.onRenderScene();
                this.scene.render()
            });
            // the canvas/window resize event handler
            window.addEventListener('resize', () => this.engine.resize());
        }
        private createScene() {
            // This creates a basic Babylon Scene object (non-mesh)
            this.scene = new BABYLON.Scene(this.engine);
            // This creates and positions a free camera (non-mesh)
            this.cameraControl = buildCameraControl(this.cameraType);     // Camera
            this.cameraControl.attach(this.scene, this.canvas);

           // this.setupSkyBox();
            this.setupGround();
            var spot = new BABYLON.DirectionalLight("spot", new BABYLON.Vector3(1, 1, 1), this.scene);
            spot.intensity = 0.9;
            spot.diffuse = new BABYLON.Color3(1, 1, 1);

            //listen for user interaction.
            window.addEventListener("click", (e) => {
               this.onSceneClick();
            });


        };
        private setupGround(){
            var ground = BABYLON.Mesh.CreateGround("ground", 512, 512, 2, this.scene, false);
            ground.position.z = 0;
            window["ground"] = <any>ground;
            ground.rotate(new BABYLON.Vector3(-1,0,0), -Math.PI/2)
            ground.position.z = 1;

        }

        private setupSkyBox(){
            var skybox = BABYLON.Mesh.CreateBox("skyBox", 16.0, this.scene);
            var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
            skyboxMaterial.backFaceCulling = false;
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/nebula", this.scene);
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
            skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            skybox.material = skyboxMaterial;
        }

        public registerTileClickedListener(listener:Function){
                this.clickListeners["tileClick"].push(listener);
        }

        public registerVoidClickedListener(listener:Function){
            this.clickListeners["voidClick"].push(listener);
        }

        /**
         * General listener for scene clicks. Will defer to tile or void click listener.
         */
        private onSceneClick(){
            var tileUI = this.findTileUnder({x:this.scene.pointerX, y:this.scene.pointerY});
            var pickResult = this.scene.pick(this.scene.pointerX, this.scene.pointerY);


            console.log("World point: " + pickResult.pickedPoint);
            if(tileUI != null){
                this.onTileClicked(tileUI);
            }
            else{
                this.onVoidClicked();
            }
        }

        private onTileClicked(tile:TileUI){
            var listeners = this.clickListeners['tileClick'];
            for(var key in listeners){
                listeners[key].call(window, tile, {
                    screenX: this.scene.pointerX,
                    screenY: this.scene.pointerY,
                })
            }
        }

        /**
         * Adds a new tile to the map using the tile data provided.
         * @param tileData the tile data.
         * @param size size of the tile. Uses TileMap.DEFAULT_TILE_SIZE as fallback.
         */
        public addTile(tileData:TileData, size:number=TileMap.DEFAULT_TILE_SIZE):TileUI{

            var mesh:BABYLON.Mesh = TileMap.createTile(this.scene,
                tileData.tileface,
                size, BABYLON.Color3.FromHexString(
                    tileData.color || "#999999"
                ) );
            var tile:TileUI = new TileUI(tileData, mesh);
            tile.p = tileData.p;
            tile.q = tileData.q;
            this.meshes[mesh.name] = mesh;
            var point:Point = TileMap.calculatePoint(tile.p, tile.q);
            mesh.position.x = point.x;
            mesh.position.y = point.y;
            return tile;
        }

        /**
         * Removes the provided tile from the map.
         * @param clickedTile the tile to remove.
         */
        removeTile(clickedTile:TileUI):void {
            console.log("Removing tile: (" + clickedTile.p + ", " + clickedTile.q + ")");
            var mesh = this.meshes[clickedTile.tileMesh.name];
            if(mesh != null){
                console.log("Removing " + clickedTile.tileMesh.name + " from TileMap" );
                mesh.dispose();
                delete this.meshes[clickedTile.tileMesh.name];
            }
        }

        public findTileUnder(point:TileMap.Point):TileUI{
            var pickResult = this.scene.pick(point.x, point.y);

            console.log("Picking mesh under (" + point.x + ", " + point.y + ")");
           // console.log("camera: alpha" + this.camera.alpha + " beta: " + this.camera.beta + " radius "+ this.camera.radius );
            var value:TileUI = null;
            if (pickResult.hit) {
                // Call event listeners with tileLeftClicked event.
                var mesh:BABYLON.AbstractMesh = pickResult.pickedMesh;
                if(mesh['tileObj'] != null ){
                    var pickedTile:BABYLON.Mesh =<BABYLON.Mesh> mesh['tileObj'];
                    value = <TileUI>pickedTile['tileUI'];
                }// we have a tile or a child of one.
                console.log(pickResult.pickedMesh.name);
            }
            console.log("Picked Tile: " + (value == null ? "none" : value.tileMesh.name));
            return value;
        }



        private onVoidClicked(){
            var listeners = this.clickListeners['voidClick'];

            var  coord = TileMap.calculateCoordinate(this.scene.pointerX, this.scene.pointerY);
            for(var key in listeners){
                listeners[key].call(window, {
                    x: this.scene.pointerX,
                    y: this.scene.pointerY,
                    p: coord.p,
                    q: coord.q
                })
            }
        }
    }
}