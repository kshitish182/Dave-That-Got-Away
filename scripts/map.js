// let spriteInitialPosX = 0;
// let spriteInitialPosY = 0;

class Map{
	constructor(mapLevel, tileWidth , tileHeight , ctx){
		this.mapLevel = mapLevel;
		this.gameElements = gameElements;
		this.elementSize = 50; //width and height is same
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
		this.elementCounter = 0;
		this.loadComplete = false;
		this.ctx = ctx;

		this.spriteCreater = new SpriteControl(ctx , cup , 50 , 50 , 0 , 0 , 50 ,50 ,5)
		// this.spriteInitialX = 0;
		// this.spriteInitialY = 0;
	}

	// loadLevel1(ctx){
	// 	console.log('here');
	// 	//initializig level-1 game elements
	// 	var redBrick = new Image();
	// 	redBrick.src = this.gameElements.redBrick.src;
	// 	redBrick.onLoad = () => this.elementCounter++;


	// 	var blank = new Image();
	// 	blank.src = this.gameElements.blank.src;
	// 	blank.onLoad = () => this.elementCounter++;

	// 	var mudBrick = new Image();
	// 	mudBrick.src = this.gameElements.mudBrick.src;
	// 	mudBrick.onLoad = () => this.elementCounter++;

	// 	var whiteDiamond = new Image();
	// 	whiteDiamond.src = this.gameElements.whiteDiamond.src;
	// 	whiteDiamond.onLoad = () => this.elementCounter++;

	// 	var redDiamond = new Image();
	// 	redDiamond.src = this.gameElements.redDiamond.src;
	// 	redDiamond.onLoad = () => this.elementCounter++;

	// 	var cup = new Image();
	// 	cup.src = this.gameElements.cup.src;
	// 	cup.onLoad = () => this.elementCounter++;

	// 	var entryTunnel = new Image();
	// 	entryTunnel.src = this.gameElements.entryTunnel.src;
	// 	entryTunnel.onLoad = () => this.elementCounter++;

	// 	var door = new Image();
	// 	door.src = this.gameElements.door.src;
	// 	door.onLoad = () => this.elementCounter++;
	// 	this.drawMap(ctx);
	// }

	drawMap(){
		// if(this.loadComplete === false){
		// this.loadLevel1();
		// }
		// if(this.imageCounter === 200){
		// 	this.loadComplete = true;
		// }
		for(let i = 0 ; i < this.tileHeight ; i++){
			for(let j = 0 ; j< this.tileWidth ; j++){
				switch(this.mapLevel[((i*this.tileWidth) + j)]){
					// console.log((i*this.tileWidth + j));
					case 1:
						this.ctx.drawImage(redBrick , j*this.elementSize , i*this.elementSize , this.elementSize , this.elementSize);
					break;

					case 0:
						this.ctx.drawImage(blank , j*this.elementSize , i*this.elementSize , this.elementSize , this.elementSize);
						break;

					case 2:
						this.ctx.drawImage(mudBrick , j*this.elementSize , i*this.elementSize , this.elementSize , this.elementSize);
						break;

					case 3:
						this.ctx.drawImage(whiteDiamond , j*this.elementSize , i*this.elementSize , this.elementSize , this.elementSize);
						break;

					case 4:
						this.ctx.drawImage(redDiamond, j*this.elementSize , i*this.elementSize , this.elementSize , this.elementSize);
						break;

					case 5:
					// let spriteCreater = new SpriteControl(ctx, cup , 50 ,50 , j*50 , i*50 , 50 ,50 , 5);
					this.spriteCreater.spritePlotX = j*50;
					this.spriteCreater.spritePlotY = i*50;
					this.spriteCreater.drawSpriteStatic();
					// spriteInitialX += 50;
					// countSpriteImage++;
					// if(countSpriteImage > 5){
					// 	spriteInitialX = 0;
					// 	countSpriteImage = 0;
					// }
					break;

					case 6:
						this.ctx.drawImage(entryTunnel , j*this.elementSize , i*this.elementSize , this.elementSize , this.elementSize);
						break;

					case 7:
						this.ctx.drawImage(door , j*this.elementSize , i*this.elementSize , this.elementSize , this.elementSize);
						break;

					case 8:
					this.ctx.drawImage(ironRod , j*this.elementSize , i*this.elementSize  ,this.elementSize , this.elementSize);
					break;

					default:
					console.log('imagecode not found');
				}
			}
		}
	}
}
