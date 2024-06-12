
//Defining the interface with the property for each bullet  

export interface Bullet {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
}

export const bullets: Bullet[] = []; // Array to hold all bullets

//Shooting the bullets

function shootBullet(carX: number, carY: number, carWidth: number): void {
    const bulletWidth = 5;
    const bulletHeight = 15;
    const bulletSpeed = 10;
    
    const bullet: Bullet = {
        x: carX + carWidth / 2 - bulletWidth / 2, // Center the bullet horizontally
        y: carY, // Starting the bullet at the top of the car
        width: bulletWidth,
        height: bulletHeight,
        speed: bulletSpeed
    };
    
    bullets.push(bullet); // Pushing the bullet to the bullets array
}


//Moving the bullets

function moveBullets(deltaTime: number): void {
    bullets.forEach((bullet) => {
        bullet.y -= bullet.speed * deltaTime / 10; // Move the bullet upward
    });
}


//Drawing the bullets

function drawBullets(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'red'; 
    bullets.forEach((bullet) => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

export { shootBullet, moveBullets, drawBullets };
