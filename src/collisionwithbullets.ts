import { bullets } from './bullets.ts';
import { enemyCars } from './enemycar.ts';
import { increaseScore } from './game.ts';


function checkCollisionWithBullets(): void {

     //Iterating through the entire array of enemycar and bullets for checking if any collision occured
    for (let i = enemyCars.length - 1; i >= 0; i--) {
        const enemyCar = enemyCars[i];
        for (let j = bullets.length - 1; j >= 0; j--) {
            const bullet = bullets[j];

            //Checking the condition for the collision between the enemycar and the bullets
            if (
                bullet.x < enemyCar.x + enemyCar.width &&
                bullet.x + bullet.width > enemyCar.x &&
                bullet.y < enemyCar.y + enemyCar.height &&
                bullet.y + bullet.height > enemyCar.y
            ) {
                // Collision detected and handling the collision

                bullets.splice(j, 1); // Removing the bullet from bullets array
                enemyCars.splice(i, 1); // Removing the enemy car from the enemycars array
                const audio = new Audio(); //Playing the sound after the bullet hits the enemy car
                audio.src = '../assets/audio/enemyhit.wav';
                audio.play()
                increaseScore(); //Increasing the score
                break; // Exiting  the inner loop since the bullet can only collide with one enemy car
            }
        }
    }
}

export { checkCollisionWithBullets };
