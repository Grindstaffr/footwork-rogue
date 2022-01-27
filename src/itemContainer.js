import { Entity } from './entity.js'
export class ItemContainer extends Entity {
	constructor(x,y){
		super(x,y)
		this.contents = {};
	}
	getContents () {
		return this.contents;
	}
}

export class LootChest extends ItemContainer {
	constructor(x,y,chestType){
		super(x,y);
		this.tweakX = 16;
		this.tweakY = -9;
		this.sprite = undefined;

		this.chestType = chestType || LootChest.getDefaultChestType()

		if (LootChest.chestTypes[this.chestType.name] === undefined){
			LootChest.chestTypes[this.chestType.name] = [];
		}
		LootChest.chestTypes[this.chestType.name].push(`${this.x},${this.y}`);
		this.chestType._getLoot()
	}

	static chestTypes = {};

	static getDefaultChestType () {
		return new ChestType('basic', 'lootChest1');
	}
}

export class ChestType {
	constructor (name, textureName, params) {
		this.name = name;
		this.textureName = textureName;
		//can load in distributions, item classes, etc.
		this.lootParams = params;
	}
	_getLoot () {//not yet implemented
		this.contents['stuff'] = this.params;
	}

	static getAssetAddress(textureName) {
		return `assets/containers/${textureName}.png`
	}
}