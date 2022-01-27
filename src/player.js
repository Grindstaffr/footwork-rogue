import { Entity } from './entity.js'
import { Unit } from './unit.js';

export class Player extends Unit {
	constructor(x,y){
		super(x,y)
		//tweak valuies are hardcoded on devSprites and should eventually be deprecated
		this.tweakX = 0;
		this.tweakY = -42;
		this.actions = {};
	}
	static getLoadables () {
		return [['playerSprite', 'assets/playerSprites/up.png']]
	}
	static allocateFromLoadedResources (resources, map, display) {
		var pSprite = display.makeSprite(resources[`playerSprite`].texture)
		pSprite.x = (map.player.x*32)-(map.player.y*32);
		pSprite.y = (map.player.x*16)+(map.player.y*16);
		map.player.sprite = pSprite;
		display.getStage().addChild(pSprite);
	}
}