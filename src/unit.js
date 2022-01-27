import {Entity} from './entity.js'

export class Unit extends Entity{
	constructor(x,y){
		super();
		this.x = x;
		this.y = y;
		this.type = 'unit';
		this.sprite = undefined;
	}
	hasSprite () {
		return (this.sprite !== undefined)
	}
	getSpritePos () {
		if (this.hasSprite()){
			return [this.sprite.x, this.sprite.y];
		} 
	}
	setSpritePos (x,y) {
		if (this.hasSprite()){
			this.sprite.x = x;
			this.sprite.y = y;
		} 
	}
}