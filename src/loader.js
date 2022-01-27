export class Loader {
    constructor (renderer) {
    	this.display = renderer;
        this.app = renderer.app
        this.tilesLoaded = false;
        this.playerSpriteLoaded = false;
        this.lootChestsLoaded = false;
        this.loaded = false;
        this.assetsToLoad = 0;
        this.loadQueue = [];
        this.processQueue = [];
    }
    _preload () {
        this.loadQueue.forEach(function(loadableTuple){
        
        	this.app.loader.add(loadableTuple[0], loadableTuple[1]);
        }, this)
    }
    loadOntoMap(map) {
    	var display = this.display;
    	var processQueue = this.processQueue
        this._preload()
        this.app.loader.load((loader, resources) => {
        	console.log('loaded')
            console.log(resources)
  			processQueue.forEach(function(callback){
  				callback(resources, map, display)
  			})
        })
    }

    _preloadMonsters() {
        this.app.loader.add('goblin', `assets/goblin1.png`)
    }
    _loadMonsters(){
        
    }
    addToLoadQueue(loadablesArray){ //= ['textureTag','assetPath']
    	loadablesArray.forEach(function(loadableTuple){
    		this.loadQueue.push(loadableTuple);
    	}, this)
    }
    addToProcessQueue(callback){ // function (resources, map, display)
    	this.processQueue.push(callback);
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