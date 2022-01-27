import { Entity, MapEntity } from './entity.js'

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
    //following two functions can bhe expanded to reflect differing click commands...
    //e.g. green tile with floating boot for move,
    //red tile with floating crossed swords for attack, etc...
    static getLoadables () {
        return [['selectedTile', 'assets/tiles/highlight.png']];
    }
    static allocateFromLoadedResources (resources, map, display) {
        var sTile = display.makeSprite(resources['selectedTile'].texture);
        map.selectedTile.sprite = sTile;
        display.getStage().addChild(sTile);
    }

}