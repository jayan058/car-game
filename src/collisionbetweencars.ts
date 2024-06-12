import { Car } from './game';
import { EnemyCar } from './enemycar';

// Checking if the two cars collide using rectangular collision detection logic
function isCollision(car1: { x: number, y: number, width: number, height: number }, car2: { x: number, y: number, width: number, height: number }): boolean {
    return car1.x < car2.x + car2.width &&
           car1.x + car1.width > car2.x &&
           car1.y < car2.y + car2.height &&
           car1.y + car1.height > car2.y;
}



// Calling the isCollision function to check if the cars have collided
function checkCollisions(playerCar: Car, enemyCars: EnemyCar[]): boolean {
    for (const enemyCar of enemyCars) {
        if (isCollision(playerCar, enemyCar)) {
            return true; // Collision detected now the handling is done inside game.ts
        }
    }
    return false; // No collision
}

export { checkCollisions };
