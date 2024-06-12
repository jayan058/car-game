
import {  laneCount,increaseScore} from "./game.ts";

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

//Defining the interface for the enemy car
 export interface EnemyCar {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    image: HTMLImageElement|null;
    
}

//Array to hold all the enemy cars

export const enemyCars: EnemyCar[] = [];
function createEnemyCar(): void {
    const laneWidth = canvas.width / laneCount;
    const lane = Math.floor(Math.random() * laneCount); // Randomly selecting a lane to draw the enemy car
    const x = lane * laneWidth + laneWidth / 2 - 25; // Calculating the  x position for the center of the lane to draw the car
    const y = -70; // Seting the position above the canvas for each enemy car
    const width = 50;
    const height = 90;
    const speed = 8; // Defining the speed of the enemy car
    const image=null;
    const enemyCar: EnemyCar = { x, y, width, height, speed,image};
    enemyCars.push(enemyCar);
  
    
}



//Moving the enemy car

function moveEnemyCars(): void {
    for (const enemyCar of enemyCars) {
        enemyCar.y += enemyCar.speed;
        
        // Remove the enemy car if it goes below the canvas
        if (enemyCar.y > canvas.height) {
            const index = enemyCars.indexOf(enemyCar);
            if (index !== -1) {
                enemyCars.splice(index, 1);
                increaseScore()

            }
        }
    }
}



// Define 10 different image paths for randomly drawing enemy car image
const imagePaths = [
    './assets/images/1.png',
    './assets/images/2.png',
    './assets/images/3.png',
    './assets/images/4.png',
    './assets/images/5.png',
    './assets/images/6.png',
    './assets/images/7.png',
    './assets/images/8.png',
    './assets/images/9.png',
    './assets/images/10.png'
];

//  Getting  a random image path for drawing the enemy car
function getRandomImagePath(): string {
    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    return imagePaths[randomIndex];
}

// Function to draw enemy cars
function drawEnemyCars(): void {


    // Iterate over each enemy car and assign it a path

    for (const enemyCar of enemyCars) {

        // Check if the enemy car already has an image associated with it to avoid drawing on the same car again and gain
        if (!enemyCar.image) {
            const imagePath = getRandomImagePath(); // Get a random image path 
          
           
            const enemyImage = new Image();
            enemyImage.src = imagePath;

            // Waiting  for the image to load
            enemyImage.onload = () => {
                // Drawing  the image once it's loaded
                ctx.fillStyle = 'rgb(150, 150, 150)';
                ctx.drawImage(enemyImage, enemyCar.x, enemyCar.y, enemyCar.width, enemyCar.height);

                // Store the image reference in the enemy car object
                enemyCar.image = enemyImage;
            };
        } else {
            // If the enemy car already has an image, just draw it
            ctx.fillStyle = 'rgb(150, 150, 150)';
            ctx.drawImage(enemyCar.image, enemyCar.x, enemyCar.y, enemyCar.width, enemyCar.height);
        }
    }
}


function resetEnemyCars(): void {
    enemyCars.length = 0; // Clear the enemyCars array to give the game a fresh start after the player dies
}








export { createEnemyCar, moveEnemyCars, drawEnemyCars,resetEnemyCars };
