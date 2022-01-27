import * as PIXI from 'pixi.js';
import * as ROT from '../node_modules/rot-js';
import { Entity } from './entity.js'
import { Loader } from './loader.js';
import { MapGenerator, MapEntity, WallTile, WallType, FloorTile, FloorType } from './mapgen.js';
import { ItemContainer, LootChest } from './itemContainer.js';
import { Unit } from './unit.js'
import { Player } from './player.js';
import { SelectedTile } from './selectedTile.js'

/*

class Entity {
    constructor(){
        this.uniqueID = Entity.Entities.length;
        Entity.Entities.push(this);
        this.type = "entity";
    }
    static Entities = [];
}
class MapEntity extends Entity {
    constructor (x,y){
        super();
        this.x = x;
        this.y = y;
        this.tweakX = 0;
        this.tweakY = 0;
        this.type = "mapEntity";
        MapEntity.mapEntities.push(this);
    };
    getMapCoordinates(){
        return [this.x, this.y];
    };
    getSpriteCoordinates () {
        if (this.sprite === undefined){
            return [null,null];
        };
        var x = this.sprite.x 
        var y = this.sprite.y
        return [x,y];
    };
    _initSetSpriteCoordinates (x,y) {
        if (this.sprite === undefined){
            return [null,null];
        }
        this.sprite.x = x + this.tweakX;
        this.sprite.y = y + this.tweakY;
        return [x,y];
    }
    setSpriteCoordinates (x,y){
        this.sprite.x = x;
        this.sprite.y = y;
    }
    static mapEntities = [];
}

class Unit extends MapEntity {
    constructor(x,y){
        super(x,y);
        this.type = "unit";
        this.direction = 'up'; //initial direction hardcoded as up should be done procedurally eventually;
        this.directions = {
            'up' : undefined,
            'down' : undefined,
            'left' : undefined,
            'right' : undefined,
        }
    }

    changeDirection(dir) {
        if (Object.keys(this.directions).includes(dir)){
            this.direction = dir;
            return true;
        }
        return false;
    }

    takeTurn(){

    }
}

class Monster extends Unit {
    constructor(x,y,breed){
        super(x,y)
        this.breed = breed;
    }
}

class Breed {
    constructor(name, AI, hp, moves){//x,y == spawnpoint;

    }
}

class PlayerClass {
    constructor () {

    }
}

class Player extends Unit {
    constructor(x,y){
        super(x,y);
        this.isPlayer = true;
        this.textures = {
            'up' : undefined,
            'down' : undefined,
            'left' : undefined,
            'right' : undefined,
        };
        this.sprite = undefined;
        this.tweakX = 0;
        this.tweakY = -42;
    }
    changeDirection(dir){
        if (super.changeDirection(dir)){
            this.sprite.texture = this.textures[dir];
        }
    }
}


class LootChest extends MapEntity {
    constructor (x,y, chestType) {
        super(x,y);
        this.type = "lootChest"
        this.tweakX = 16;
        this.tweakY = -9;
        this.chestType = chestType || '1';
        this.sprite = undefined;
        if (LootChest.chestTypes[this.chestType] === undefined){
            LootChest.chestTypes[this.chestType] = [];
        }
        LootChest.chestTypes[this.chestType].push(`${this.x},${this.y}`)
        this._getLoot(chestType);
    }

    _getLoot(chestType) {
        //not yet implemented
    }
    static chestTypes = {};
}

class TileType {
    constructor (spriteName, onStep) {
        this.spriteName = `assets/tiles/${spriteName}.png`;
        this.onStep = onStep;
    }
}

class FloorTile extends MapEntity {
    constructor (x,y, tileType) {
        super(x,y);
        this.type = "floorTile";
        this.sprite = undefined;
        this.altTexture = undefined;


        this.tileType = tileType || FloorTile.getDefaultTileType();

        this.highlighted = false;
        if (FloorTile.tileTypes[this.tileType] === undefined){
            FloorTile.tileTypes[this.tileType] = [];
        }

        FloorTile.tileTypes[this.tileType].push(`${this.x},${this.y}`);
    }
    static tileTypes = {};

    static getDefaultTileType () {
        return new TileType ('tile1', function(){})
    }
    textureSwap () {
        if (this.sprite === undefined){
            return;
        }
        var hold = this.sprite.texture;
        this.sprite.texture = this.altTexture;
        this.altTexture = hold;
    }
    getSpritePos () {
        return [this.sprite.x, this.sprite.y];
    }
}

class SelectedTile extends MapEntity {
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
}*/

class Renderer {
    constructor (camera) {
        this.app = new PIXI.Application();
        document.body.appendChild(this.app.view);
        this.app.stage.interactive = true;
    }
    makeSprite(texture) {
        return new PIXI.Sprite(texture);
    }
    getStage(){
        return this.app.stage
    }

    addCamera (camera) {
        this.camera = camera;
        camera.calibrate(this.app.renderer);
    }

    addInputHandler () {
        
        this.inputhandler = new Inputhandler(this.app.stage);
    }

    hide (entityID) {
        if (Entity.Entities[entityID].sprite !== undefined){
            Entity.Entities[entityID].sprite.visible = false;
        }
    }
    unhide (entityID) {
        if (Entity.Entities[entityID].sprite !== undefined){
            Entity.Entities[entityID].sprite.visible = true;
        }
    }
    resize (xVal, yVal){

    }
}

class dimensionCast {
    constructor () {

    }
    canToMap (x,y) { // converts canvas x,y into map x,y;

    }

    mapToCan (x,y) {
        
    }

    canvCoordToCell(){}
}

class Camera extends Entity {
    constructor (gameInstance) {
        super();
        this.type = `camera`;
        this.x = gameInstance.map.player.x;
        this.y = gameInstance.map.player.y;
        console.log(gameInstance)
    }

    calibrate (rendererViewport) {
        //must remember to call camera calibrate on resize
        this.defaultCenterX = rendererViewport.width/2; //may need to be tweaked b/c anchor is currently in topright for each sprite;
        this.defaultCenterY = rendererViewport.height/2;
    }

    update(x,y){
        this.x = x;
        this.y = y;
        this.focus();
    }

    focus () {//places active center at render center...?
        Entity.Entities.forEach(function(entity, entityID){ // This needs to be reworked...
            if (true){

            }
            var entityLoc = Entity.getMapCoordinates(entityID);
            if (entityLoc === undefined){
                return;
            }
            var relativeLoc = this.getRelativePosition(entityLoc[0], entityLoc[1]);
            var newLoc = this.castToRenderCoordinates(relativeLoc[0], relativeLoc[1]);
            Entity._initSetSpriteCoordinates(entityID, newLoc[0], newLoc[1]);

        }, this)
    }

    getRelativePosition (x,y){
        var deltaX = x - this.x;
        var deltaY = y - this.y;

        return [deltaX, deltaY];
    } 

    castToRenderCoordinates (x,y) { //takes map value (e.g. (1,1) , or (23, 5)) and casts to canvas pix dimenstions (320,160)
        var outputX = this.defaultCenterX + (32 * x) - (32 * y);
        var outputY = this.defaultCenterY + (16 * x) + (16 * y);
        return [outputX, outputY];
    }
}

/*
class Loader {
    constructor (renderer) {
        this.app = renderer.app
        this.tilesLoaded = false;
        this.playerSpriteLoaded = false;
        this.lootChestsLoaded = false;
        this.loaded = false;
        this.assetsToLoad = 0;
    }
    _preload () {
        this._preloadFloorTiles();
        this._preloadLootChests();
        this._preloadPlayer();
    }
    load() {

        this._preload()
        this.app.loader.load((loader, resources) => {
  
            this._loadFloorTiles(resources);
            this._loadLootChests(resources);
            this._loadPlayerSprites(resources);
            //onInitialLoad();

            for (var i = 0; i < arguments.length; i ++){
                arguments[i]();
            }
        })
    }

    _preloadMonsters() {
        this.app.loader.add('goblin', `assets/goblin1.png`)
    }
    _loadMonsters(){
        
    }
    _preloadFloorTiles () {
        this.app.loader.add('highlight','assets/highlight.png')
         for (var key in FloorTile.tileTypes){
            this.assetsToLoad ++;
            this.app.loader.add(`floorTile${key}`, `assets/tile${key}.png`)
        }
    }
    _loadFloorTiles (resources) {
        
        for (var key in FloorTile.tileTypes){
            FloorTile.tileTypes[key].forEach(function(locString){
                var loc = locString.split(',');
                var tile = new PIXI.Sprite(resources[`floorTile${key}`].texture);
                tile.x = (loc[0]*32) - (loc[1]*32);
                tile.y =  (loc[1] * 16) + (loc[0] * 16);
                var tileObj = gameInstance.map.floorTiles[locString];
                tileObj.sprite = tile;
                
                this.app.stage.addChild(tile)
            }, this);
        }

        Entity.Entities[0].sprite = new PIXI.Sprite(resources['highlight'].texture);
        this.app.stage.addChild(Entity.Entities[0].sprite)

       

    }
    _preloadLootChests() {
        for (var key in LootChest.chestTypes){
            this.app.loader.add(`lootChest${key}`,`assets/lootChest${key}.png`)
        }
    }
    _loadLootChests (resources) {
        for (var key in LootChest.chestTypes){
            LootChest.chestTypes[key].forEach(function(locString){
                var loc = locString.split(',');
                var chest = new PIXI.Sprite(resources[`lootChest${key}`].texture);
                chest.x = 16 + (loc[0]*32) - (loc[1]*32);
                chest.y =  (loc[1] * 16) + (loc[0] * 16) - 9;
                gameInstance.map.lootChests[locString].sprite = chest;
                this.app.stage.addChild(chest);
            }, this)
        }
    }
    _preloadPlayer () {
        //hardcoded basic sprite before implement spritesheets with PIXI
        //need texture packer (will help eliminate eventual download overhead)
       

        this.app.loader.add('playerSprite','assets/up.png')
        

    }
    _loadPlayerSprites (resources) {
     
        var sprite = new PIXI.Sprite(resources[`playerSprite`].texture);
        sprite.x = (gameInstance.player.x) * 32 - (gameInstance.player.y*32);
        sprite.y = (gameInstance.player.y) *16 + (gameInstance.player.x * 16);
        gameInstance.player.sprite = sprite;
        this.app.stage.addChild(sprite);
    }
}
*/

class TurnsQueue {
    constructor () {

    }
    static _queue = [];
    static addActiveUnit (uniqueID) {
        

    }
    static removeActiveUnit (uniqueID) {

    }
    static doTurn () {
        
    }
}

class Tileattack {
    constructor (relX, relY) {
        
    } 
}

class Tilemove {
    constructor (dir) {
       
        if (Tilemove.mapToCoordinates[dir] === undefined){
            return;
        }
        this.scalars = Tilemove.mapToCoordinates[dir];

    }

    static mapToCoordinates = { //Still maybe should work out diagonal moves
        up : [0,-1],
        down : [0,1],
        left : [-1,0],
        right : [1,0],
    }

    do(unit, totalFrameCount){ //might eventually depreciate totalframecount for fixed value
        var currentLoc = unit.getSpritePos();
        //still need to check map to see if it's a valid move.

        unit.x += this.scalars[0];
        unit.y += this.scalars[1];

        var scx = this.scalars[0];
        var scy = this.scalars[1];

        var frames = [];

        //var dX = currentLoc[0] + (scalars[0]*32) - (scalars[1]*32);
        //var dY = currentLoc[1] + (scalars[0] * 16) + (scalars[1] * 16);
        for (var i = 0; i <= totalFrameCount; i ++){

            var obj = {
                i : i,
                scalars: [scx, scy],
                tickerFunc : function () {
                    var x = 0;
                    var y = 0;
                    if (this.scalars[0] === 0){
                        x = (-this.i/totalFrameCount) + Math.pow((this.i/totalFrameCount),2);
                        y = (this.i/totalFrameCount) * this.scalars[1];
                    } else if (this.scalars[1] === 0) {
                        y = (-this.i/totalFrameCount) + Math.pow((this.i/totalFrameCount),2);
                        x = (this.i/totalFrameCount) * this.scalars[0];
                    }
                 
                    var newX = currentLoc[0] + (32*x) - (32*y);
                    var newY = currentLoc[1] + (16*x) + (16*y);
                    unit.setSpritePos(newX, newY);
                    if (this.i === totalFrameCount){
                        gameInstance.display.camera.update(unit.x, unit.y)
                    }
                },
            }
            frames.push(obj.tickerFunc.bind(obj));
        }

        return new TickerEvent(frames);
    }
}

class TickerEvent {
    constructor(frames, options){
        this.frames = frames;
        //frames should be an array of functions, each to be done on a tick of the app.
        this.options = options;
    }
}

class Action {
    constructor (unit, action, params) {
        this.unit = unit;
        this.action = action;
        this.params = params;
    }
}

class Pathfinder {
    constructor (gameMap) {
        this.gameMap = gameMap;
    }
    astar (fromX,fromY,toX,toY) {
        const callback = function (x,y){
            var bool = (`${x},${y}` in this.gameMap.floorTiles);
            return bool;
        }.bind(this)
        const pather = new ROT.Path.AStar(toX, toY, callback, {topology:4});
        var truPath = [];
        var relPath = [];
        var pathCallback = function(x,y){
            truPath.push([x,y]);
        }
        pather.compute(fromX, fromY, pathCallback);
        for (var i = 1; i < truPath.length; i ++){
            var x = truPath[i-1][0] - truPath[i][0];
            var y = truPath[i-1][1] - truPath[i][1];
            //console.log(x,y)
            if (x == 0){
                if (y == 1){
                    relPath.push('up');
                }
                if (y == -1){
                    relPath.push('down');
                }
            }
            if (y == 0){
                if (x == 1){
                    relPath.push('left');
                }
                if (x == -1){
                    relPath.push('right');
                }
            }
            
            
        }
        return relPath;
    }
}

class ActionSystem {
    constructor () {
    
    }

    static actions = {
        left : new Tilemove("left"),
        right : new Tilemove("right"),
        up : new Tilemove("up"),
        down: new Tilemove("down"),
    }

    static defaultFramerate = 10;

    static actionDelegator = {};


    static addActionQueue(unit){
        ActionSystem.actionDelegator[unit.uniqueID] = []; 
    }

    static wipeFutureActionsFor(unit){
        ActionSystem.actionDelegator[unit.uniqueID] = [];
    }

    static assignAction(unit, action){ //constructs tickerevent from action
        if (ActionSystem.actions[action] === undefined){
            return;
        }
        if (unit.uniqueID === undefined){
            return ActionSystem.actions[action].do(Entity.Entities[unit], ActionSystem.defaultFramerate);
        } else if (unit.uniqueID !== undefined){
            return ActionSystem.actions[action].do(unit, ActionSystem.defaultFramerate);
        }
    }

    static queueAction(unit, action){
        if (ActionSystem.actions[action] === undefined){
            return;
        }
        if (ActionSystem.actionDelegator[unit.uniqueID] === undefined){
            ActionSystem.addActionQueue(unit);
        }
        ActionSystem.actionDelegator[unit.uniqueID].push(action);
    }

    static actionsAreQueued () {
        return (Object.keys(ActionSystem.actionDelegator).length > 0)
    }

    static getNextActions(){
        var sovereignActions = [];
        for (var key in ActionSystem.actionDelegator){
            var actionToBuild = ActionSystem.actionDelegator[key].shift();
            var builtAction = ActionSystem.assignAction(Entity.Entities[key], actionToBuild)
            sovereignActions.push(builtAction);
            if (ActionSystem.actionDelegator[key].length == 0){
                delete ActionSystem.actionDelegator[key];
            }
        }
        return sovereignActions;
    }

}


class TickerQueue {
    //We want an auto actions loader to the app.ticker
    //anims should be queued, ticker should pull one "frame" of do per tick
    constructor () {

    }
    static _queue = []
    static enqueue (tickerEvent) {
        for (var i = 0; i < tickerEvent.frames.length; i ++){
            if (TickerQueue._queue[i] === undefined){
                TickerQueue._queue[i] = [];
            }
            TickerQueue._queue[i].push(tickerEvent.frames[i]);
        }
    }
    static shouldGetEvents () {
        return TickerQueue._queue.length >= 1;
    }
    static getTickerEvents () {
        return TickerQueue._queue.shift()
    }
    static fetchFromActionSystem (actionSystem) {
        if (actionSystem.actionsAreQueued()){
                actionSystem.getNextActions().forEach(function(action){
                TickerQueue.enqueue(action)
            })
        }   
    }
}

class Inputhandler {
    constructor (stage, domain) {
        this.game = domain;
        this.stage = stage;
        this.setMouseIsOver = this.setMouseIsOver.bind(this);
        this.handleMousemove = this.handleMousemove.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleLeftClick = this.handleLeftClick.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
        this.stage.on('mousemove', this.handleMousemove);
        this.stage.on('click', this.handleLeftClick)
        document.addEventListener('contextmenu', (e) => {e.preventDefault(); this.handleRightClick(e)})
        document.addEventListener('keydown', this.handleKeyPress);    
    }
    handleLeftClick(e){
        var game = this.game
        var path = this.game.pathfinder.astar(this.game.map.player.x,this.game.map.player.y, this.game.map.selectedTile.x, this.game.map.selectedTile.y);
        path.forEach(function(dir){
            ActionSystem.queueAction(game.map.player,dir) //<---- needs to be revised for modularity
        })
    }
    handleRightClick(e){

    }
    handleKeyPress(e){
        var lett = e.code[e.code.length-1 ]
        var game = this.game
        const map = {
            'W' : function () {
                ActionSystem.queueAction(game.map.player, 'up')
                            },
            'A' : function () {
                ActionSystem.queueAction(game.map.player, 'left')

            },
            'S' : function () {
                ActionSystem.queueAction(game.map.player, 'down')

            },
            'D' : function () {
                ActionSystem.queueAction(game.map.player, 'right')
            }
        }
        if (map[lett] !== undefined){
            map[lett]();
        }
    }

    handleMousemove (e) {
        var x = e.data.global.x;
        var y = e.data.global.y;


        var gameCamera = gameInstance.display.camera;

        var centerX = gameCamera.x; // center of game board
        var centerY = gameCamera.y;

        var defaultCenterX = gameCamera.defaultCenterX; //center of the screen, regardless of map coord
        var defaultCenterY = gameCamera.defaultCenterY;

        var relativeLocCartesian = [x - defaultCenterX, y - defaultCenterY];

        var xm = (relativeLocCartesian[0] + 2*relativeLocCartesian[1])/64 - .5;
        var ym = (2*relativeLocCartesian[1] - relativeLocCartesian[0])/64 - .5;
        var outX = centerX + Math.floor(xm)
        var outY = centerY + Math.floor(ym + 1);

        //console.log(outX, outY);
        
        this.setMouseIsOver(outX, outY)
        
    }

    setMouseIsOver (x,y) {
        
        this.game.selectTile(x,y)
    }
}

class EnemySpawner {
    constructor (map) {
        this.map = map;
    }
    randomSpawnNGoblins (n) {
        for (var i = 0; i < n; i++){
            var index = Math.floor(ROT.RNG.getUniform() * this.map.freeCells.length)
            var loc = this.map.freeCells.splice(index, 1)[0];
            this.map.monsters[`${loc[0]},${loc[1]}`] = new Goblin(loc[0],loc[1]);
        }
    }
}

class Game {
    constructor () {
        this.display = new Renderer;
        this.loader = new Loader(this.display);
        this.engine = null;
        this.map = {
            floorTiles : {}, //holds floorTile Objects, where key = coordinate
            monsters : {}, //holds all monster objects, where key = coordinate
            lootChests : {}, // holds loot chest objects, where key = coordinate
            freeCells : [],
            selectedTile : {}, // holds the one and only selected tile
         };
         this.player = null;
         this._generateMap(); 
         this._makeSelectedTile();
         //this._generateBoxes(10);
         this._spawnPlayer();
    }
    selectTile (x,y) {

        if (this.map.floorTiles[`${x},${y}`] !== undefined){
            var coordinates = this.map.floorTiles[`${x},${y}`].getSpritePos();
            this.display.unhide(this.map.selectedTile.uniqueID)
            this.map.selectedTile.updateSpritePosition(coordinates[0], coordinates[1]);
            this.map.selectedTile.setGridPosition(x,y);
        } else {
            this.display.hide(this.map.selectedTile.uniqueID);
        }
    }
    _generateMap () {
        this.map = MapGenerator.getMap();
        this.loader.addToLoadQueue(MapGenerator.getLoadables())
        this.loader.addToProcessQueue(MapGenerator.allocateFromLoadedResources)

    }
    _makeSelectedTile(){
        this.map.selectedTile = new SelectedTile(0,0);
        this.loader.addToLoadQueue(SelectedTile.getLoadables());
        this.loader.addToProcessQueue(SelectedTile.allocateFromLoadedResources)
    }

    _generateBoxes (boxCount) {
        for (var i = 0; i < boxCount; i++){
            var index = Math.floor(ROT.RNG.getUniform() * this.map.freeCells.length);
            var loc = this.map.freeCells.splice(index, 1)[0];
            this.map.lootChests[`${loc[0]},${loc[1]}`] = new LootChest(loc[0],loc[1]);
        }
    }

    _spawnPlayer () {
        var index = Math.floor(ROT.RNG.getUniform() * this.map.freeCells.length)
        var loc = this.map.freeCells.splice(index, 1)[0];
        this.map.player = new Player(loc[0],loc[1]);
        this.loader.addToLoadQueue(Player.getLoadables());
        this.loader.addToProcessQueue(Player.allocateFromLoadedResources);
    }

    _postLoadInit () {
        var domain = this;
        const camera = new Camera(domain);
        this.display.addCamera(camera);
        camera.focus();
        this.actionSystem = new ActionSystem();
        this.pathfinder = new Pathfinder(domain.map);


        var fps = gameInstance.display.app.ticker.FPS
        let text = new PIXI.Text(`FPS: ${fps}`,{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});

        this.display.app.stage.addChild(text)

        function updateFPS () {
            text.text = `FPS: ${this.display.app.ticker.FPS}`
        }

        updateFPS = updateFPS.bind(this);

        this.display.app.ticker.add(updateFPS);

        //TickerQueue may not always be accessible here? Idk...
        this.display.app.ticker.add(function(){
            if (TickerQueue.shouldGetEvents()){
               
                TickerQueue.getTickerEvents().forEach(function(event){
                    event();
                });
            } else {
                TickerQueue.fetchFromActionSystem(ActionSystem);
            }
        })
        this.InputHandler = new Inputhandler(this.display.app.stage, this)
    }
}

//spin up game instance (all this shit (bootup functions) should probably get thrown in a bucket)

const gameInstance = new Game;
gameInstance.loader.addToProcessQueue(gameInstance._postLoadInit.bind(gameInstance))
gameInstance.loader.loadOntoMap(gameInstance.map);