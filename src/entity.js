export class Entity {
	constructor () {
		this.uniqueID = Entity.Entities.length;
		Entity.Entities.push(this);
	} 
	static Entities = [];
	static getMapCoordinates (entityID) {
		let entity = Entity.Entities[entityID];
		if (entity.x && entity.y){
			return [entity.x, entity.y]
		} else {
			return undefined;
		}
	}
	static _initSetSpriteCoordinates (entityID, x ,y) {
		let entity = Entity.Entities[entityID];

		if (entity.sprite === undefined){
			return undefined;
		}
	
		let tweakX = (entity.tweakX || 0);
		let tweakY = (entity.tweakY || 0);
	
		entity.sprite.x = x + tweakX;
		entity.sprite.y = y + tweakY;

		return[x,y];
	}
}

export class MapEntity extends Entity {
	constructor (x,y) {
		super()
		this.x = x;
		this.y = y;
	}
}