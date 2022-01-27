import * as ROT from '../node_modules/rot-js'
import { Entity, MapEntity } from './entity.js'

export class MapGenerator {
	constructor () {
	}
	static getMap () {
		return MapGenerator._generateMap('one')
	}
	static _generateMap (mapLevel, params) {
		const map = {
			floorTiles : {},
			wallTiles: {},
			monsters : {},
			lootChests : {},
			freeCells : [],
			selectedTile: {},
		};
		return MapGenerator.router[mapLevel](map);
	}
	static router = {
		one : function (map) {
			var digger = new ROT.Map.Digger();
			var digCallback = function (x,y,value){
				if (value){return;}
				var key = x + ',' + y;
				map.floorTiles[key] = new FloorTile(x,y)
				map.freeCells.push([x,y]);
			}
			digger.create(digCallback);
			return map;
		},

	}

	static getLoadables () {
		var queue = [];
		for (var key in FloorTile.tileTypes){
			queue.push([`floorTile${key}`, TileType.getAssetAddress(key)])
		}
		for (var key in WallTile.wallTypes){
			queue.push([`wallTile${key}`, WallType.getAssetAddress(key)])
		}
		return queue;
	}

	static allocateFromLoadedResources (resources, map, display) {
		for (var key in FloorTile.tileTypes){
			FloorTile.tileTypes[key].forEach(function(locString){
				var loc = locString.split(',');
                var tile = display.makeSprite(resources[`floorTile${key}`].texture);
                tile.x = (loc[0]*32) - (loc[1]*32);
                tile.y =  (loc[1] * 16) + (loc[0] * 16);
                var tileObj = map.floorTiles[locString];
                tileObj.sprite = tile;
                display.getStage().addChild(tile)
			})
		}
		for (var key in WallTile.wallTypes){
			WallTile.wallTypes[key].forEach(function(locString){
				var loc = locString.split(',');
				var wall = dispaly.makeSprite(resouces[`wallTile${key}`].texture);
				wall.x = (loc[0]*32) - (loc[1]*32);
                wall.y =  ((loc[1] * 16) + (loc[0] * 16)) - 32;
                var wallObj = map.wallTiles[locString];
                wallObj.sprite = wall;
                display.getStage().addChild(wall);
			})
		}
		
	}

}



export class SelectedTile extends MapEntity {
    constructor(x,y){
        super(x,y)
        this.sprite = undefined;
        this.type = 'selectedTile'
    }
    updateSpritePosition(x,y){
        this.sprite.x = x;
        this.sprite.y = y;
        
    }
    getSpritePos () {
        return [this.sprite.x, this.sprite.y];
    }
    setGridPosition (x,y) {
        this.x = x;
        this.y = y;
    }
}

export class WallTile extends MapEntity {
	constructor (x,y,wallType){
		super(x,y);
		this.type = "wallTile"
		this.sprite = undefined;

		this.wallType = wallType || WallTile.getDefaultWallType();

		if (WallTile.wallTypes[this.wallType.name] === undefined){
			WallTile.wallTypes[this.wallType.name] = [];
		}

		WallTile.wallTypes[this.wallType.name].push(`${this.x}, ${this.y}`)
	}
	static wallTypes = {};

	static getDefaultWallType () {
		return new WallType('wall1')
	}
	getSpritePos () {
		return [this.sprite.x, this.sprite.y];
	}
}

export class WallType {
	constructor(name){
		this.name = name
	}
	static getAssetAddress(name) {
		return `assets/walls/${name}.png`
	}
}

export class FloorTile extends MapEntity {
    constructor (x,y, tileType) {
        super(x,y);
        this.type = "floorTile";
        this.sprite = undefined;

        this.tileType = tileType || FloorTile.getDefaultTileType();

        if (FloorTile.tileTypes[this.tileType.name] === undefined){
            FloorTile.tileTypes[this.tileType.name] = [];
        }

        FloorTile.tileTypes[this.tileType.name].push(`${this.x},${this.y}`);
    }
    static tileTypes = {};

    static getDefaultTileType () {
        return new TileType ('tile1', function(){})
    }
    getSpritePos () {
        return [this.sprite.x, this.sprite.y];
    }
}

export class TileType {
    constructor (name, onStep) {
        this.name = name;
        this.onStep = onStep;
    }
    static getAssetAddress(name) {
    	return `assets/tiles/${name}.png`
    }
}