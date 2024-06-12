import { createEnemyCar, moveEnemyCars, drawEnemyCars,enemyCars,resetEnemyCars } from './enemycar';
import { shootBullet, moveBullets, drawBullets } from './bullets';
import { checkCollisions } from "./collisionbetweencars";
import { checkCollisionWithBullets } from "./collisionwithbullets";
import { gameOver } from './screens';

const mainAudio = new Audio(); //For playing the sound of the car engine
mainAudio.src = './assets/audio/carenginegoing.wav';
mainAudio.loop=true

//Initializing all the necessary variable
let stripeOffset = 0;
let score:number=0
let bullets:number=10
let isShooting:boolean=false
let bulletTimeOut:number=0
const laneCount = 4;


//Creating an interface for the player car
export interface Car {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    dx: number;
    dy: number;
    targetX: number;
}

//Initializing the main drawing canvas
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const laneWidth = canvas.width / laneCount; //Setting the width of each lane




let car: Car = {
    x: laneWidth * 1 + laneWidth / 2 - 25, // Start  the player car in the second lane by deafulat
    y: canvas.height - 70,
    width: 50,
    height: 90,
    speed: 5,
    dx: 0,
    dy: 0,
    targetX: laneWidth * 1 + laneWidth / 2 - 25 // Initial target position for the player car to move to during the key press
};

//Variables for handling the animation

let lastTimestamp = 0;
export let animationFrameId: number
let playerImage: HTMLImageElement;


//During the first game start setting all the necessary variables to their initial state
function startGame(): void {
    resetGame();
    loadCarImage();
}


//Reseting the game to give a fresh start after the player dies
function resetGame(): void {
    mainAudio.play()
    stripeOffset=0
    score = 0;
    bullets = 10;
    isShooting = false;
    car.x = laneWidth * 1 + laneWidth / 2 - car.width / 2; // Start in the second lane
    car.y = canvas.height - car.height - 10;
    car.targetX = car.x;
    resetEnemyCars()
    clearTimeout(bulletTimeOut)
    createEnemyCar()
    drawEnemyCars()
    moveEnemyCars()
    lastTimestamp=0;
    clear();
    drawCar();
   
   
}


//Drawing the player car image  
function loadCarImage(): void {
    playerImage = new Image();
    playerImage.onload = () => {
        animationFrameId = requestAnimationFrame(gameLoop);
    };
    playerImage.src = './assets/images/cars.webp';
}


//Main game loop where all the animation is handled
function gameLoop(timestamp: number): void {
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    clear();
    drawCar();
    moveCar(deltaTime);
    moveBullets(deltaTime); // Move bullets
    drawBullets(ctx); // Draw bullets
    ctx.font = '35px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Score:${score}`, 2, 50);
    ctx.fillText(`Bullets:${bullets}`, 2, 100);
    if (isShooting) reloadingText();

    if (!checkCollisions(car, enemyCars)) {
        animationFrameId = requestAnimationFrame(gameLoop);
    } else {
        lastTimestamp=0
        cancelAnimationFrame(animationFrameId)
        mainAudio.pause()
        const audio = new Audio();
        audio.src = './assets/audio/collidewithcar.wav';
        audio.play()
        setTimeout(gameOver,2000)
        
    }
    checkCollisionWithBullets()
}


//Clearing the canvas and redrawing on it again
function clear(): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLanes();
    drawLaneStripes();
    drawEnemyCars();
    moveEnemyCars();
    drawBullets(ctx);
}


//Drawing the lanes on the road

function drawLanes(): void {
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 2;
    for (let i = 1; i < laneCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * laneWidth, 0);
        ctx.lineTo(i * laneWidth, canvas.height);
        ctx.stroke();
    }
}

//Drawing the stripes within the lanes on the street
function drawLaneStripes(): void {
    const stripeWidth = 10;
    const stripeHeight = 200; 
    const stripeGap = 30;
    ctx.fillStyle = 'white';

    stripeOffset += car.speed; // Update the offset of the stripe based on car speed to give it the moving feel

    for (let i = 0; i < laneCount; i++) {
        const stripeX = i * laneWidth + laneWidth / 2 - stripeWidth / 2;

        for (let y = -stripeHeight + stripeOffset % (stripeHeight + stripeGap); y < canvas.height; y += stripeHeight + stripeGap) {
            ctx.fillRect(stripeX, y, stripeWidth, stripeHeight);
        }
    }
}

//Drawing the car image after the player image is available to ensure the image is always drawn

function drawCar(): void {
    if (playerImage) {
        ctx.drawImage(playerImage, 215, 120, 122, 258, car.x, car.y, car.width, car.height);
    }
}


//Updating the position of the car based on the keyboard inputs
function moveCar(deltaTime: number): void {
    const distance = car.speed * deltaTime / 10; // Converting speed to pixels per millisecond
    const direction = Math.sign(car.targetX - car.x); // Determining the direction of movement for the player

    // Updating the car's position based on the direction and distance
    car.x += direction * Math.min(distance, Math.abs(car.targetX - car.x));
}


//Setting the direction of the car

function setCarDirection(direction: 'left' | 'right'): void {
    const currentLane = Math.floor(car.x / laneWidth);

    if (direction === 'left' && currentLane > 0) {
        car.targetX = (currentLane - 1) * laneWidth + laneWidth / 2 - car.width / 2;
    } else if (direction === 'right' && currentLane < laneCount - 1) {
        car.targetX = (currentLane + 1) * laneWidth + laneWidth / 2 - car.width / 2;
    }
}


//Handling the event for the space bar for shoooting the bullets
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        bullets>0?shootBullet(car.x, car.y, car.width):undefined; 
        updateBullets()
    }
});

//Increasing the score after the enemy car goes out of the canvas
function increaseScore(){
    score++
}

//Updating the bullet count after each bullet shoot
function updateBullets(){

    if(bullets>0){  
        bullets--
    }
    else{
        isShooting=true
     
        clearTimeout(bulletTimeOut)
         bulletTimeOut=setTimeout(increaseBullets,6000)
       
    }
}
function increaseBullets(){
   bullets=10
   isShooting=false
}

//Displaying the reload text for the bullets
function reloadingText(){
    ctx.font = '35px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Reloading Bullets.....',canvas.width/2-150,50)
}

export { laneCount, startGame, resetGame, setCarDirection,score,increaseScore,bullets };
