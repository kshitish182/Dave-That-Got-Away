let animationFrameStart = true;
class Hero{
	constructor(heroPositionX , heroPositionY , ctx, scoreBoardObj , textMessage , canvas){
		this.heroPositionX = heroPositionX;
		this.heroPositionY = heroPositionY;
		this.heroInitialPosX = heroPositionX;
		this.heroInitialPosY = heroPositionY;
		this.oldvalueX = heroPositionX;
		this.oldvalueY = heroPositionY;
		
		//distance in x and y direction moved by the character in a single event
		this.directionX = 5;
		this.directionY = 5;

		this.ctx = ctx;
		this.buttonPress = false;
		this.gravity = 'off';
		this.gameComplete = false;

		this.scoreBoardObj = scoreBoardObj;
		this.textMessage = textMessage;
		//for counting number of frames to hold certain fucntion for certain number of frames
		this.frameCount = 0;
		// this.characterDefaultDisplay = true;
		this.jump = false;
		this.onAir = false;
		this.doorCollison = false;
		this.countCollison = 0;

		//tracking the direction faced by the character
		this.charRightFaced = true;

		this.mapLayouts = mapLayouts;
		this.collisionMap = collisionMap;

		this.currentCollisionLevel = this.collisionMap.level1;

		//creating objects
		this.heroSpriteRight = new SpriteControl(this.ctx , character , 50 ,50 ,this.heroPositionX , this.heroPositionY , 50 ,50 ,3);
		this.heroSpriteLeft = new SpriteControl(this.ctx , character , 50 , 50 , this.heroPositionX , this.heroPositionY , 50 , 50 ,3);
		this.heroSpriteUp = new SpriteControl(this.ctx , character , 50 ,50 , this. heroPositionX, this.heroPositionY,50 ,50 , 9);
		this.heroDeath = new SpriteControl(this.ctx, charDeath , 48 , 50 , this.heroPositionX , this.heroPositionY , 50 ,50 , 1);
		this.lvlTransitionAnimation = new AnimationHandler(this.ctx , this.textMessage, lvltransitionMap);
		this.gameOverAnimation = new AnimationHandler(this.ctx , this.textMessage);
		this.gameCompleteAnimation = new AnimationHandler(this.ctx , this.textMessage);
		this.canvas = canvas;

		//intialising object properties
		this.heroSpriteLeft.spriteInitialPosX = 250;
		this.heroSpriteUp.spriteInitialPosX = 200; 
	}

	renderHero(buttonPress){
		if(!gameOver){
			if(controller[2] && !this.onAir){
				this.heroSpriteRight.drawSpriteRight(this.directionX , this.directionY , this.buttonPress , this.onAir);
			}else if (controller[0] && !this.onAir){
				this.heroSpriteLeft.drawSpriteLeft(this.directionX , this.directionY , this.buttonPress , this.onAir);
			}else if(controller[1] || this.onAir){
				this.heroSpriteUp.drawSpriteUp(this.directionX , this.directionY , this.buttonPress , this.charRightFaced);
			}
			else if(!controller[0] && !controller[2] && !controller[1]){
				if(this.charRightFaced){
					this.heroSpriteRight.drawSpriteRight(this.directionX , this.directionY , this.buttonPress , this.onAir);
				}else{
					this.heroSpriteLeft.drawSpriteLeft(this.directionX , this.directionY , this.buttonPress , this.onAir );
				}
			}
		}
		this.checkGameOver();		
	}

	moveHero(buttonPress, mapCurrentLevel){
				
				if(controller[1]){
					this.resetDirection();
						if(jumpCount <= 150){
							this.onAir = true;
							this.oldvalueX = this.heroPositionX;
							this.oldvalueY = this.heroPositionY;
							this.heroPositionY -= this.directionY;
							this.heroPositionX = this.heroPositionX;
							jumpCount += this.directionY;
						}
						if(jumpCount > 150){
							this.gravity = 'on';
						}
						if(controller[2]){
							if(this.onAir){
								if(sideplacementright <= 50){
									this.oldvalueX = this.heroPositionX;
									this.oldvalueY = this.heroPositionY;
									this.heroPositionX += this.directionX;
									this.heroPositionY = this.heroPositionY;
									sideplacementright += this.directionX;
								}
								if(sideplacementright > 50){
									this.gravity = 'on';
								}
							}
						}
						else if(controller[0]){
							if(this.onAir){
								if(sideplacementleft <= 50){
									this.oldvalueX = this.heroPositionX;
									this.oldvalueY = this.heroPositionY;
									this.heroPositionX -= this.directionX;
									this.heroPositionY = this.heroPositionY
									sideplacementleft += this.directionX;
								}
								if(sideplacementleft > 50){
									this.gravity = 'on';
								}
							}
						}
				}else if(controller[0]){
					this.resetDirection();
					this.oldvalueX = this.heroPositionX;
					this.oldvalueY = this.heroPositionY;
					this.heroPositionX -= this.directionX;
					this.heroPositionY = this.heroPositionY;
				}
				else if(controller[2]){
					this.resetDirection();
					this.oldvalueX = this.heroPositionX;
					this.oldvalueY = this.heroPositionY;
					this.heroPositionX += this.directionX;
					this.heroPositionY = this.heroPositionY;
				 }
			
			this.updatePosition();	
			this.renderHero(buttonPress);
			this.checkBoundaryCollision();
			this.initGravity();
	}

	initGravity(){
		if(this.gravity === 'on'){
			//gravity pulls the hero downward in 1/4 the direction it moves
			this.heroPositionY += this.directionY/2;
		}
	}

	updatePosition(){
		this.heroSpriteRight.spritePlotX = this.heroPositionX;
		this.heroSpriteRight.spritePlotY = this.heroPositionY;
		this.heroSpriteLeft.spritePlotX = this.heroPositionX;
		this.heroSpriteLeft.spritePlotY = this.heroPositionY;
		this.heroSpriteUp.spritePlotX = this.heroPositionX;
		this.heroSpriteUp.spritePlotY = this. heroPositionY;
	}

	getCollisionMap() {
		switch(this.scoreBoardObj.currentLevel){
			case 1:
				this.currentCollisionLevel = this.collisionMap.level1;
				break;
			case 2:
				this.currentCollisionLevel = this.collisionMap.level2;
				break;
		}
	}

	getElementsPosition(mapCurrentLevel){
		this.getCollisionMap();

		//getting character position 
		
		//for its topleft corner((x,y) co-ordinates of its topleft corner)

		let topPos = Math.floor(this.heroPositionY/SPRITE_SIZE);
		let  leftPos= Math.floor(this.heroPositionX/SPRITE_SIZE);

		//the calculated co-ordinates are then converted to the index for the collision map array
		let collisionIndexValue = this.currentCollisionLevel[((mapCurrentLevel.tileWidth*topPos) + leftPos)]; 

		//collision checked for the topleft position of the game elements
		this.checkCollision(leftPos*SPRITE_SIZE , topPos*SPRITE_SIZE , collisionIndexValue , mapCurrentLevel);


		//now for topright position co-ordinates
		topPos = Math.floor(this.heroPositionY/SPRITE_SIZE) // re-defining topPos for new interation of collision check
		let rightPos = Math.floor((this.heroPositionX + SPRITE_SIZE) / SPRITE_SIZE);
		collisionIndexValue = this.currentCollisionLevel[((mapCurrentLevel.tileWidth*topPos) + rightPos)];
		this.checkCollision(rightPos*SPRITE_SIZE , topPos*SPRITE_SIZE , collisionIndexValue , mapCurrentLevel);


		//for bottomleft position co-ordinates
		let bottomPos = Math.floor((this.heroPositionY + SPRITE_SIZE) / SPRITE_SIZE);
		leftPos = Math.floor(this.heroPositionX / SPRITE_SIZE);
		collisionIndexValue = this.currentCollisionLevel[((mapCurrentLevel.tileWidth*bottomPos) + leftPos)];
		this.checkCollision(leftPos*SPRITE_SIZE , bottomPos*SPRITE_SIZE , collisionIndexValue ,mapCurrentLevel);

		//for bottomright position co-ordinates
		bottomPos = Math.floor((this.heroPositionY + SPRITE_SIZE) / SPRITE_SIZE);
		rightPos = Math.floor((this.heroPositionX + SPRITE_SIZE) / SPRITE_SIZE);
		collisionIndexValue = this.currentCollisionLevel[((mapCurrentLevel.tileWidth*bottomPos) + rightPos)];
		this.checkCollision(rightPos*SPRITE_SIZE , bottomPos*SPRITE_SIZE , collisionIndexValue , mapCurrentLevel);
	}

	//checking for collision after obtaining the elements
	checkCollision(xCord , yCord , collisionIndex, mapCurrentLevel){   // x and y co-ordinates of four corners of the character
		// console.log(collisionIndex);
		switch(collisionIndex){
			case 1:
				this.checkCollisionLeft(xCord, yCord);
				break;

			case 2:
				this.checkCollisionBottom(xCord, yCord); //x-cordinates , y-cordinates
				break;

			case 4:
				this.checkCollisionRight(xCord, yCord);
				break;

			case 5:
				this.checkCollisionLeft(xCord , yCord);
				this.checkCollisionRight(xCord , yCord);
				break;

			case 8:
				this.checkCollisionTop(xCord, yCord);
				break;

			case 9:
				this.checkCollisionTop(xCord , yCord);
				this.checkCollisionLeft(xCord , yCord);
				break;

			case 10:
				this.checkCollisionTop(xCord , yCord);
				this.checkCollisionBottom(xCord , yCord);
				break;

			case 11: 
				this.checkCollisionTop(xCord , yCord);
				this.checkCollisionLeft(xCord , yCord);
				this.checkCollisionBottom(xCord , yCord);
				break;

			case 12:
				this.checkCollisionTop(xCord, yCord);
				this.checkCollisionRight(xCord, yCord);
				break;

			case 13:
				this.checkCollisionTop(xCord , yCord);
				this.checkCollisionRight(xCord , yCord);
				this.checkCollisionBottom(xCord , yCord);
				break;

			case 14:
				this.checkCollisionTop(xCord , yCord);
				this.checkCollisionRight(xCord , yCord);
				this.checkCollisionBottom(xCord , yCord);
				break; 

			case 15:
				this.checkCollisionTop(xCord , yCord);
				this.checkCollisionBottom(xCord , yCord);
				this.checkCollisionRight(xCord , yCord);
				this.checkCollisionLeft(xCord , yCord);
				break;

			case 16:
				this.checkConsumableCollision(xCord , yCord , mapCurrentLevel);
				break;

			case 17:
				this.handleDoorCollision(xCord , yCord);
				break;
			}
	} 

	//checking bottom boundary collision
	checkBoundaryCollision(){
		if(this.heroPositionY >= 500){ // 500 is the canvas height
			console.log('collision detected')
			gameOver = true;
		}
	}

	checkCollisionBottom(x , y){
		//for bottom side wall of the elements
		if(this.heroPositionY < (y + SPRITE_SIZE) && this.oldvalueY >= (y + SPRITE_SIZE)){
			this.directionY = 0;
			this.heroPositionY = y + SPRITE_SIZE;
		 }
	 }

 	checkCollisionRight(x , y){
 		if(this.heroPositionX  < (x + SPRITE_SIZE) && this.oldvalueX >=(x + SPRITE_SIZE)){
 			console.log(x + SPRITE_SIZE);
 			this.directionX = 0;
 			this.heroPositionX = x + SPRITE_SIZE;
 			return true;
 		}
 	}

 	checkCollisionTop(x,y){
 		
 		if(this.heroPositionY + SPRITE_SIZE > y  &&  (this.oldvalueY+SPRITE_SIZE) <= y ){
 			console.log('collision-top');
 			console.log(this.heroPositionY , y);
 			this.heroPositionY = y - SPRITE_SIZE;
 			this.directionY = 0;
 			this.jump = false;
 			this.onAir = false;
 			jumpCount = 0;
 			sideplacementleft = 0;
 			sideplacementright = 0;
 			controller[1] = false;
 			return true;
 		}
  }

  checkCollisionLeft(x,y){
  	if(this.heroPositionX + SPRITE_SIZE > x && this.oldvalueX + SPRITE_SIZE <= x){
  		this.directionX = 0;
  		this.heroPositionX = x - SPRITE_SIZE;
  		return true;
  	}
  }

  checkConsumableCollision(x , y , mapCurrentLevel){
  	if(this.heroPositionX + SPRITE_SIZE > x  || this.heroPositionX + SPRITE_SIZE > y || this.heroPositionX < (x + SPRITE_SIZE)){
  		let j = x/SPRITE_SIZE;
  		let i = y/SPRITE_SIZE;

  		let index = ((i*mapCurrentLevel.tileWidth) + j);
  		switch(mapCurrentLevel.mapLevel[index]){
  			case 3:
  				mapCurrentLevel.mapLevel[index] = 0;
  				this.scoreBoardObj.scoreCount += 100;
  				break;

  			case 4:
  				mapCurrentLevel.mapLevel[index] = 0;
  				this.scoreBoardObj.scoreCount += 500;
  				break;

  			case 5:
  				mapCurrentLevel.mapLevel[index] = 0;
  				doorOpen = true;
  				this.textMessage.message = 'GO THRU THE DOOR';
  				this.scoreBoardObj.scoreCount += 900;
  				break;

  			case 9: 
  				mapCurrentLevel.mapLevel[index] = 0;
  				gunObtained = true;
  				console.log('gun');
  				break;
  		}
  	}
  }

 	resetDirection(){
 		this.directionX = 5;
 		this.directionY = 5;
 	}

 	checkGameOver(){
 		if(gameOver){
 			this.frameCount++;
 			if(this.frameCount < 200){
				this.heroDeath.spritePlotX = this.heroPositionX;
				this.heroDeath.spritePlotY = this.heroPositionY;
				this.heroDeath.drawSpriteStatic();
			}else if(this.frameCount >= 200){
				gameOver = false;
				this.frameCount = 0;
				this.scoreBoardObj.daveLives--;
				this.initHeroPosition();
			}
		}
		if(this.scoreBoardObj.daveLives === 0){
			this.scoreBoardObj.daveLives = 0;
			this.textMessage.message = 'GAME OVER!!!'
			animationFrameStart = false;			
		}
 	}

 	handleDoorCollision(x, y){
 		this.doorCollison = true;
 		if(!doorOpen){
			if(this.heroPositionX  < (x + SPRITE_SIZE) && this.oldvalueX >=(x + SPRITE_SIZE)){
				this.directionX = 0;
				this.heroPositionX = x + SPRITE_SIZE;
			}
		}
		else if(doorOpen){
			this.gameComplete = true;
		}
		if(this.scoreBoardObj.currentLevel === FINAL_LEVEL){
 				lastLevel = true;
 		}
 	}
 		
 	
 	checkDoorCondition(){
 		if(this.gameComplete){
 			if(!lastLevel){
 				this.lvlTransitionAnimation.drawTransitionMap();
 				if(this.lvlTransitionAnimation.animationOver){
 					this.textMessage.message = '';
 					this.scoreBoardObj.currentLevel++;
 					this.initLevel();
 				}
 			}
 			if(lastLevel){
 				this.textMessage.message = 'GAME COMPLETE';
 				animationFrameStart = false;
 			}
 		}
 	}

 	initLevel(){	
 			this.initHeroPosition();
 			this.gameComplete = false;
 			this.doorCollison = false;
 			doorOpen = false;
 			gunObtained= false;
 		}

 	initHeroPosition(){
 		this.heroPositionX = this.heroInitialPosX;
 		this.heroPositionY = this.heroInitialPosY;
 	}


 	eventController(){
			document.addEventListener('keydown', event => {
					this.gravity = 'off';
					if(!gameOver){
							if(event.keyCode === 39){    //right-arrow
								controller[2] = true;
								this.buttonPress = true;
								this.charRightFaced = true;
							}
							if(event.keyCode === 37){   //left-arrow
								controller[0] = true;
								this.buttonPress = true;
								this.charRightFaced = false;
							}
							if(event.keyCode === 38 ){   //up-arrow
								// console.log(event);
								controller[1] = true;
								this.buttonPress = true;
							}
							if(event.keyCode === 17){
								specialController[0] = true;
							}
							if(!this.buttonPress){
								this.gravity = 'on';
							}
					}
			});

		document.addEventListener('keyup', event =>{
				this.buttonPress = false;
				this.gravity = 'on';
				controller[0] = false; //left-arrow
				controller[2] = false; //right-arrow
				specialController[0] = false;
		});
	}
}

