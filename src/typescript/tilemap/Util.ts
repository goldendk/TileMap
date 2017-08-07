///<reference path="../_declare/babylon.d.ts"/>

namespace TileMap {

    var TILE_COUNT:number = 0;
    var TILE_DISLAY_COUNT:number = 0;

    /**
     * Transform a hex string into a color.
     * @param color
     * @returns {BABYLON.Color3}
     */
    export function stringToColor(color:string) {
        //FIXME: implement this.
        return new BABYLON.Color3(1, 0, 0);
    }

    export function createTile(scene:BABYLON.Scene, texture:string, size:number, color?:BABYLON.Color3):BABYLON.Mesh {
        TILE_COUNT++;
        var center_x:number = 0;
        var center_y:number = 0;
        var points:Array<any> = [];
        //calculate points for centers of the 6 sides.
        for (var i = 5; i >= 0; i--) {
            var _angle:number = 2 * Math.PI / 6 * (i + 0.5);
            var x_i:number = center_x + size * Math.cos(_angle);
            var y_i:number = center_y + size * Math.sin(_angle);
            points[i] = {
                x    : x_i,
                y    : y_i,
                angle: _angle % Math.PI
            };
            console.log(JSON.stringify(points[i]));
        }
        //create a mesh (bar) for each point.
        var meshs:Array<BABYLON.Mesh> = [];
        for (var j = 5; j >= 0; j--) {
            var props = {
                "width"    : size * 1.21,
                "height"   : 0.1 * size,
                "updatable": true,
                "depth"    : 0.15 * size
            };
            var box:BABYLON.Mesh = BABYLON.MeshBuilder.CreateBox("box" + j + "_" + TILE_COUNT, props, scene);
           // box.edgesWidth = 2;
            box.rotation.z = <number> points[j].angle + (0.5 * Math.PI);
            box.position.x = <number> points[j].x;
            box.position.y = <number> points[j].y;
            meshs.push(box);
        }
        //now merge the 6 bars into a single mesh.
        var tileMesh:BABYLON.Mesh = BABYLON.Mesh.MergeMeshes(meshs);
        tileMesh.name = "Tile" + TILE_COUNT;

        //assign a color if needed to the border.
        var tileColor = new BABYLON.StandardMaterial("tileColor" + TILE_COUNT, scene);
        if (color != null) {
            tileColor.diffuseColor = color;
            //tileColor.emissiveColor = color;

        }
        tileMesh.material = tileColor;

        //create the "ground" of the Tile.
        var disc = BABYLON.Mesh.CreateDisc("disc", 1.2 * size, 6, scene, false, BABYLON.Mesh.DEFAULTSIDE);
        disc.translate(new BABYLON.Vector3(0, 0, 1), size * 0.15 / 2);

        //Give the ground a look using standard material.
        var tileFace = new BABYLON.StandardMaterial("aTileFace" + TILE_COUNT, scene);
        if (texture != null) {
            tileFace.diffuseTexture = new BABYLON.Texture(texture, scene);
        }
        disc.material = tileFace;

        //create references between border and ground components (disc and Tile... meshes).
        disc.parent = tileMesh;
        disc.name = "disc_" + tileMesh.name;
        tileMesh["disc"] = disc;
        //create association that is easy to check.
        tileMesh["tileObj"] = tileMesh;
        disc['tileObj'] = tileMesh;

        return tileMesh
    }

    export function calculatePoint(p:number, q:number, size:number = TileMap.DEFAULT_TILE_SIZE*1.21):TileMap.Point {
        var point = new TileMap.Point();
        point.x = size * 3 / 2 * p;
        point.y = size * Math.sqrt(3) * (q + p / 2);
        // point.x = Math.sqrt(3) * legSize * (q / 2 + (-p - q));
        // point.y = 3 / 2 * legSize * (q);
        return point;
    }

    export function calculateCoordinate(x:number, y:number, size:number = TileMap.DEFAULT_TILE_SIZE*1.21){
        var p = x / (size * 3 /2 );
        var q = 2* y / (Math.sqrt(3) * size) - p;
        return{ p: p, q: q};
    }
}


